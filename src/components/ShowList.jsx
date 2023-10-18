import React from "react";
import ShowItem from "../components/ShowItem";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import HelperText from "./HelperText";

const ShowList = ({ navigation }) => {
  const shows = useSelector((state) => state.shows.shows);

  return shows.length === 0 ? (
    <HelperText text={"Sorry, nothing found with this search"} />
  ) : (
    <FlatList
      style={{
        width: "90%",
        marginBottom: 15,
      }}
      data={shows}
      renderItem={({
        item: {
          show: { id, name, image, rating },
        },
      }) => (
        <ShowItem
          id={id}
          name={name}
          image={image}
          rating={rating}
          navigation={navigation}
        />
      )}
    />
  );
};

export default ShowList;
