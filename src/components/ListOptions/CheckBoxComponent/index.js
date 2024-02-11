import { View } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "@rneui/themed";

const CheckBoxComponent = ({ text, handleCity }) => {
  const [checked, setChecked] = useState(false);
  function handleCityComponent(text) {
    setChecked(!checked);
    setTimeout(() => {
      handleCity(text);
    }, 400);
  }

  return (
    <View>
      <CheckBox
        title={text}
        key={text}
        onIconPress={() => handleCityComponent(text)}
        checked={checked}
        size={36}
        uncheckedColor="#333"
      />
    </View>
  );
};

export default CheckBoxComponent;
