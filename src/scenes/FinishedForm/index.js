import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { format } from "date-fns";
import { api } from "../../api/api";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";

export default function Finished(props) {
  const sheetId = "1YtdPEQMc4z3LNSe0Lxw1Hsk0XauobVmzfuFuSSG1QdU";
  const navigation = useNavigation();

  const {
    citiesGeolocations,
    city,
    uf,
    floodedPlace,
    geoLocation,
    locationPermission,
    rainyCondition,
    weather,
  } = props.route.params;

  async function signIn() {
    GoogleSignin.configure({
      webClientId:
        "1073573733542-4vq6hq9j5ukiqqgsceoqhan0v8r582e4.apps.googleusercontent.com",
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
    });

    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      return accessToken;
    } catch (error) {
      console.log("=== DEBUG error === ", error);
    }
  }

  function getMockedCity() {
    return `${citiesGeolocations[city].latitude}, ${citiesGeolocations[city].longitude}`;
  }

  async function sendDataToGSheets() {
    const mockedLocation = geoLocation
      ? geoLocation
      : ({ latitude, longitude } = getMockedCity());

    const data = [
      format(new Date(Date.now()), "dd/MM/yyyy HH:mm:ss"),
      city,
      uf,
      weather,
      rainyCondition,
      floodedPlace,
      mockedLocation,
      locationPermission,
    ];

    const token = await signIn();

    const url = `${sheetId}/values/Sheet1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS&alt=json&access_token=${token}`;

    try {
      await api.post(url, {
        majorDimension: "ROWS",
        range: "Sheet1",
        values: [[...data]],
      });
    } catch (error) {
      console.log("=== DEBUG axios post error === ", error);
    }

    setTimeout(() => {
      navigation.navigate("Disclaimer");
    }, 2000);
  }

  useEffect(() => {
    sendDataToGSheets();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Obrigado pelo registro.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
