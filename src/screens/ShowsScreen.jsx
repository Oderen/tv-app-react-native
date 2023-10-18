import { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchShows } from "../redux/api-operation";

import ShowList from "../components/ShowList";
import Loader from "../components/Loader";
import HelperText from "../components/HelperText";

import _ from "lodash";

const ShowsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const isLoading = useSelector((state) => state.shows.isLoading);

  useEffect(() => {
    dispatch(fetchShows(query));
  }, [dispatch, query]);

  const handleTextChange = _.throttle((text) => {
    setQuery(text);
  }, 2000);

  const [inputFocused, setInputFocused] = useState(false);
  const shouldRenderHelperText = query.trim().length < 2;

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps={"always"}
    >
      <View style={styles.container}>
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

        <View style={styles.main}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {shouldRenderHelperText ? (
                <HelperText text={"Type the show's name"} />
              ) : (
                <ShowList navigation={navigation} />
              )}
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ShowsScreen;

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
  },
  ratingContainer: {
    justifyContent: "center",
    alignItems: "center",

    marginLeft: 6,

    width: 40,
    height: 40,
    borderRadius: 8,

    borderColor: "orange",
    borderWidth: 1,
    borderStyle: "solid",
  },
  imageContainer: {
    width: "100%",
    height: 400,
  },
  card: {
    width: "90%",
    height: 530,
    padding: 5,
    borderRadius: 10,

    borderColor: "orange",
    borderWidth: 1,
    borderStyle: "solid",
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 4,
    alignItems: "center",
    padding: 10,
  },
  helper: {
    fontSize: 30,
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
