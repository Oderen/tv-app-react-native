import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowByID } from "../redux/api-operation";
import imageSkeleton from "../../assets/skeleton.jpg";
import Loader from "../components/Loader";
import { Linking } from "react-native";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

const ShowDetails = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const showID = useSelector((state) => state.shows.showID);
  const show = useSelector((state) => state.shows.show);
  const isLoading = useSelector((state) => state.shows.isLoading);

  const goBack = () => {
    navigation.goBack();
  };

  const linkToSite = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    dispatch(fetchShowByID(showID));
  }, [showID]);

  if (JSON.stringify(show) === "{}") {
    return;
  }

  const {
    image,
    name,
    genres,
    rating,
    officialSite,
    status,
    schedule: { time, days },
    summary,
  } = show;

  const showSite = officialSite ? officialSite : "not available";
  const showRating = rating.average ? rating.average : "N/A";
  const showTime = time ? time : "not available";

  const showDay = days.length > 0 ? days.join(", ") : "unknown";
  const showGenres = genres.length > 0 ? genres.join(", ") : "no info";
  const showStatus = status ? status : "unknown";
  const showSummary = summary ? summary : "no info";

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.goBackNav}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>

      <ScrollView style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={image ? { uri: image.medium } : imageSkeleton}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
        </View>
        <View style={styles.description}>
          <View style={styles.info__container}>
            <Text style={styles.info__key}>Name:</Text>
            <Text style={styles.info__value}>{name}</Text>
          </View>

          <View style={styles.info__container}>
            <Text style={styles.info__key}>Genres: </Text>
            <Text style={[styles.info__value, { fontSize: 20 }]}>
              {showGenres}
            </Text>
          </View>

          <View style={styles.info__container}>
            <Text style={styles.info__key}>WebSite: </Text>

            {showSite === "not available" ? (
              <Text style={[styles.info__value, { fontSize: 20 }]}>
                {showSite}
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  linkToSite(showSite);
                }}
              >
                <Text
                  style={[
                    styles.info__value,
                    {
                      fontSize: 15,
                      width: "70%",
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  {showSite}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.info__container}>
            <Text style={styles.info__key}>Status: </Text>
            <Text style={styles.info__value}>{showStatus}</Text>
          </View>

          <View style={styles.info__container}>
            <Text style={styles.info__key}>Time: </Text>
            <Text style={styles.info__value}>{showTime}</Text>
          </View>

          <View style={styles.info__container}>
            <Text style={styles.info__key}>Day(s): </Text>
            <Text style={[styles.info__value, { fontSize: 19 }]}>
              {showDay}
            </Text>
          </View>

          <View
            style={[
              styles.info__container,
              { marginTop: 10, marginBottom: 10 },
            ]}
          >
            <Text style={styles.info__key}>Rating: </Text>
            <View style={styles.ratingContainer}>
              <Text style={{ color: "orange" }}>{showRating}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.info__key}>Description: </Text>
            <RenderHtml
              contentWidth={width}
              source={{ html: `${showSummary}` }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowDetails;

const styles = StyleSheet.create({
  info__container: {
    flexDirection: "row",
    alignItems: "center",
  },
  info__value: {
    fontSize: 20,
    marginLeft: 10,
    color: "black",
  },
  info__key: {
    fontSize: 25,
    color: "orange",
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
  description: {
    justifyContent: "space-between",
    marginTop: 10,
    width: "90%",
    height: "55%",
  },

  imageContainer: {
    width: "100%",
    height: 400,
    borderRadius: 15,
    borderColor: "orange",
    borderWidth: 3,
    borderStyle: "solid",
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "red",
    borderStyle: 1,
  },
  card: {
    width: "90%",
    height: "90%",

    padding: 20,
    marginTop: 40,

    borderRadius: 20,
    borderColor: "orange",
    borderStyle: "solid",
    borderWidth: 2,
  },
  goBackNav: {
    position: "absolute",
    top: 60,
    left: 15,
  },
});
