import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import store from "./src/redux/store";

import ShowsScreen from "./src/screens/ShowsScreen";
import ShowDetails from "./src/screens/ShowDetails";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName={"ShowsScreen"}>
          <MainStack.Screen
            name="ShowsScreen"
            component={ShowsScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="ShowDetails"
            component={ShowDetails}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
