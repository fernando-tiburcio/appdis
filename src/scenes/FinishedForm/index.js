import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View, AppState } from "react-native";

import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../../firebase";

export default function Finished(props) {
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

  function handleForm() {
    const mockedLocation = geoLocation
      ? geoLocation
      : ([latitude, longitude] = getMockedCity());

    const data = {
      data_hora: new Date(Date.now()).toLocaleString("pt-br", {}),
      cidade: city,
      uf,
      tempo_agora: weather,
      tipo_chuva: rainyCondition,
      local_alagado: floodedPlace || "",
      coordenadas: mockedLocation,
      autoriza_geo: locationPermission,
    };

    try {
      const db = getFirestore(firebaseApp);
      addDoc(collection(db, "geodata"), {
        ...data,
      }).then(() => {
        console.log("Dados gravados com sucesso");
      });
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro",
        "Ocorreu um problema ao enviar os dados, estamos trabalhando para resolver esse problema o mais rápido possível"
      );
    }
  }

  function getMockedCity() {
    return [
      citiesGeolocations[city].latitude,
      citiesGeolocations[city].longitude,
    ];
  }

  useEffect(() => {
    handleForm();
  }, []);

  useEffect(() => {
    const appState = AppState.addEventListener("change", () => {
      if (AppState.currentState.match(/background/)) {
        navigation.navigate("Disclaimer");
      }
    });

    return () => {
      appState.remove();
    };
  });

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
