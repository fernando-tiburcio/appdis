import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";

export default function TextAreaComponent({ title, handleData }) {
  const [text, setText] = useState();

  function handleText(data) {
    setText(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        autoCapitalize="sentences"
        multiline
        textAlignVertical="top"
        placeholder="Preencha aqui se desejar..."
        onChangeText={(text) => handleText(text)}
        style={styles.inputContainer}
      />
      <Button title="Finalizar" onPress={() => handleData(text)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    minHeight: 260,
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginBottom: 40,
    textAlign: "center",
    fontSize: 24,
  },
});
