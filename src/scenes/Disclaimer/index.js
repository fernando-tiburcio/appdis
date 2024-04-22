import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
} from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";

import { Button, Text } from "@rneui/themed";

const statusBarHeight = StatusBar.currentHeight;

const Disclaimer = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function hideSplash() {
      await SplashScreen.hideAsync();
    }
    hideSplash();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Avaliação climática das cidades</Text>
          <Text style={styles.disclaimer}>
            Este app faz parte de um projeto de pesquisa de mestrado do aluno
            Lucas de Barros Teixeira, com supervisão da Profª Dra. Marilde
            Teresinha Prado Santos da UFSCar - Universidade Federal de São
            Carlos.
            {"\n"}
            Solicita-se a participação diária ao menos uma vez durante o período
            de 18/02/2023 a 18/06/2024.{"\n"}A participação desta pesquisa é
            totalmente voluntária e anônima.{"\n"}
            Os dados serão coletados para serem utilizados em uma proposta
            inovadora que combina tecnologia e participação voluntária para
            prever grandes volumes pluviométricos em tempo real. {"\n"} Os
            resultados serão divulgados em eventos cientificos e consolidados na
            dissertação de mestrado.{"\n"}O objetivo é tratar os dados de data,
            horário, localização e informação climáticas em um algoritmo de
            inteligência artificial, com foco na previsão e mitigação de grandes
            volumes pluviométricos nas cidades.
            {"\n"}
            Agradecemos a participação na pesquisa, deixamos contato para
            quaisquer dúvidas ou esclarecimentos.{"\n"}
            e-mail: lucas.barros@estudante.ufscar.br
          </Text>
          <Button
            title={"Continuar"}
            size="lg"
            color={"primary"}
            radius={"lg"}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: statusBarHeight | 0,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 16,
    textAlign: "justify",
  },
});

export default Disclaimer;
