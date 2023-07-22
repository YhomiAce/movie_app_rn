import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";

var { width, height } = Dimensions.get("window");
const MovieCard = ({ item, pressHandler }) => {
  return (
    <TouchableWithoutFeedback onPress={pressHandler}>
      <Image
        source={{
          uri: "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
        }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
