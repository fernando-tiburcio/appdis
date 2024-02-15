import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Button, Text } from "@rneui/themed";
import * as SplashScreen from "expo-splash-screen";

import { useNavigation } from "@react-navigation/native";

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
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Avaliação climática das cidades</Text>
          <Text style={styles.disclaimer}>
            Este app faz parte de um projeto de pesquisa de mestrado do aluno
            Lucas de Barros Teixeira, com supervisão da Profª Dra. Marilde
            Teresina Prado Santos da UFSCar - Universidade Federal de São
            Carlos.
            {"\n"}
            {"\n"}
            Solicita-se a participação diária ao menos uma vez durante o período
            de 12/12/2023 a 12/03/2024.{"\n"}
            {"\n"}A participação desta pesquisa é totalmente voluntária e
            anônima.
            {"\n"}
            {"\n"}
            Os dados coletados serão utilizados para a divulgação científica
            através da dissertação de mestrado.{"\n"}
            {"\n"}O objetivo é tratar dados da avaliação climática realizada em
            um algoritmo de inteligência artificial, com foco na previsão e
            mitigação de grandes volumes pluviométricos nas cidades.{"\n"}
            {"\n"}
            Agradecemos a participação na pesquisa, deixamos contato para
            quaisquer dúvidas ou esclarecimentos.{"\n"}
            {"\n"}
            e-mail: lucas.barros@estudante.ufscar.br
          </Text>
          <Button
            title={"Continuar"}
            size="lg"
            color={"primary"}
            radius={"sm"}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  disclaimer: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 32,
  },
});

export default Disclaimer;
