import React from "react";
import { Text, View } from "react-native";

const HelperText = ({ text }) => {
  return (
    <View style={{ height: "80%", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>{text}</Text>
    </View>
  );
};

export default HelperText;
