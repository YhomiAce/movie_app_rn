import { View, Text, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";

var { width } = Dimensions.get("window");
const TrendingMovies = ({ data }) => {
  const { navigate } = useNavigation();
  const handleClick = (item) => {
    navigate("Movie", item);
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">TrendingMovies</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} pressHandler={() => handleClick(item)} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

export default TrendingMovies;
