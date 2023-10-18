import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import _ from "lodash";

const Searchbar = ({ query, setQuery }) => {
  const handleTextChange = _.throttle((text) => {
    setQuery(text);
  }, 2000);

  const [inputFocused, setInputFocused] = useState(false);
  return (
    <View style={styles.header}>
      <TextInput
        placeholder="Breaking Bed"
        placeholderTextColor="#BDBDBD"
        value={query}
        onChangeText={handleTextChange}
        onFocus={() => {
          setInputFocused(true);
        }}
        onBlur={() => {
          setInputFocused(false);
        }}
        style={[styles.input, inputFocused && styles.inputFocused]}
      />
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 52,
    width: "90%",
    borderWidth: 1,
    padding: 16,

    fontSize: 16,

    backgroundColor: "rgba(246, 246, 246, 1)",
    borderColor: "rgba(232, 232, 232, 1)",
    borderRadius: 10,
  },
  inputFocused: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(255, 108, 0, 1)",
  },
});
