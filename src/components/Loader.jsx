import { View, Text } from "react-native";

const Loader = () => {
  return (
    <View style={{ height: "80%", justifyContent: "center" }}>
      <Text style={{ fontSize: 30, textAlign: "center" }}>Searching...</Text>
    </View>
  );
};

export default Loader;
