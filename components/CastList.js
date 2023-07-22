import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CastList = ({ casts }) => {
  const { navigate } = useNavigation();
  let personName = "Keanu Reevs";
  let characterName = "John Wick";
  const gotoCharacter = (character) => {
    navigate("Character", character);
  };
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {casts &&
          casts.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => gotoCharacter(person)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={{
                      uri: "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
                    }}
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default CastList;
