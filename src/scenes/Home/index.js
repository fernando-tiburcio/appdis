import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";

import * as Location from "expo-location";

import ListOptions from "../../components/ListOptions";
import TextAreaComponent from "../../components/TextAreaComponent";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const [city, setCity] = useState(false);
  const [uf, setUf] = useState("São Paulo");
  const [weather, setWeather] = useState("");
  const [itsRainy, setItsRainy] = useState(false);
  const [rainyCondition, setRainyCondition] = useState("");
  const [floodedPlace, setFloodedPlace] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);
  const [geoLocation, setGeoLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  const cities = ["São Carlos", "São Paulo"];

  const weatherOptions = ["Céu Claro", "Nevoeiro", "Céu Nublado", "Chuvoso"];

  const rainyOptions = ["Chuva Fraca", "Chuva Moderada", "Chuva Forte"];

  const citiesGeolocations = {
    "São Carlos": { latitude: "-22.015345", longitude: "-47.891080" },
    "São Paulo": { latitude: "-23.541764", longitude: "-46.631195" },
  };

  function mountServiceData() {
    return {
      city,
      uf,
      weather,
      itsRainy,
      rainyCondition,
      floodedPlace,
      locationPermission,
      geoLocation,
      citiesGeolocations,
    };
  }

  function handleFormFinished() {
    const data = mountServiceData();
    navigation.navigate("Finish", { ...data });
  }

  function handleCity(data) {
    setCity(data);
  }

  function handleWeather(data) {
    setWeather(data);
    if (data === "Chuvoso") {
      setItsRainy(true);
    } else {
      setFinished(true);
    }
  }

  function handleRainyConditions(data) {
    setRainyCondition(data);
  }

  function handleFloodedPlace(data) {
    setFloodedPlace(data);
    setFinished(true);
  }

  async function getCityName(coords) {
    const results = await Location.reverseGeocodeAsync(coords);
    setCity(results[0].city || results[0].district);
    setUf(results[0].region);
  }

  async function getGeolocation() {
    setLocationPermission(true);
    const location = await Location.getCurrentPositionAsync();
    if (location) {
      const { latitude, longitude } = location.coords;
      getCityName(location.coords);
      setGeoLocation(`${latitude}, ${longitude}`);
      setLoading(false);
    }
  }

  async function getLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationPermission(false);
      setLoading(false);
    } else if (status === "granted") {
      getGeolocation();
    }
  }

  useEffect(() => {
    async function fetchGeoPermission() {
      await getLocationPermission();
    }
    fetchGeoPermission();
  }, []);

  useEffect(() => {
    if (finished) {
      handleFormFinished();
    }
  }, [finished]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      {!city && !loading && !geoLocation && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ListOptions
            title="Em qual cidade você encontra-se agora?"
            options={cities}
            handleData={handleCity}
          />
          <Image
            source={require("../../../assets/smart-city.png")}
            style={{ width: 180, height: 180, marginTop: 40 }}
          />
        </View>
      )}
      {!weather && city && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ListOptions
            title="Como você classificaria o tempo agora?"
            options={weatherOptions}
            handleData={handleWeather}
          />
          <Image
            source={require("../../../assets/climate-change.png")}
            style={{ width: 180, height: 180, marginTop: 40 }}
          />
        </View>
      )}
      {itsRainy && weather && !rainyCondition && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ListOptions
            title="Condições de chuva"
            options={rainyOptions}
            handleData={handleRainyConditions}
          />
          <Image
            source={require("../../../assets/rain.png")}
            style={{ width: 180, height: 180, marginTop: 40 }}
          />
        </View>
      )}
      {rainyCondition && !floodedPlace && (
        <TextAreaComponent
          title="Você passou por algum local alagado? Se sim, comente a localização (preenchimento opcional)."
          handleData={handleFloodedPlace}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
