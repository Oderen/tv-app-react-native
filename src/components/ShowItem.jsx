import imageSkeleton from "../../assets/skeleton.jpg";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { changeID } from "../redux/showSlice";
import { useDispatch } from "react-redux";

const ShowItem = ({ id, name, image, rating, navigation }) => {
  const dispatch = useDispatch();

  const goToDetailsScreen = (id) => {
    dispatch(changeID(id));
    navigation.navigate("ShowDetails");
  };

  const showRating = rating.average ? rating.average : "N/A";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        goToDetailsScreen(id);
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={image ? { uri: image.medium } : imageSkeleton}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </View>
      <View style={styles.description}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 23, color: "orange" }}>Name:</Text>
          <Text
            style={{
              width: "75%",
              fontSize: 23,
              color: "black",
              marginLeft: 20,
            }}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 25, color: "orange" }}>Rating: </Text>
          <View style={styles.ratingContainer}>
            <Text style={{ color: "black" }}>{showRating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShowItem;

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    width: "100%",
    height: 100,
    justifyContent: "space-between",
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
    height: 560,
    padding: 5,
    marginTop: 20,
    borderRadius: 10,
    borderColor: "orange",
    borderStyle: "solid",
    borderWidth: 2,
  },
  container: {
    flex: 1,

    borderColor: "red",
    borderWidth: 2,
    borderStyle: "solid",

    backgroundColor: "gray",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderColor: "yellow",
    borderWidth: 2,
    borderStyle: "solid",
  },
  main: {
    flex: 4,
    alignItems: "center",
    padding: 10,

    borderColor: "green",
    borderWidth: 2,
    borderStyle: "solid",
  },
  helper: {
    fontSize: 20,
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
