import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

var { width, height } = Dimensions.get("window");
const CharacterScreen = () => {
  const { goBack } = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4">
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => goBack()}
        >
          <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon size={35} color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* character details */}
      {loading ? (
        <Loader />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={{
                  uri: "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              Keanu Reeves
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              London, United Kingdom
            </Text>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">Male</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">1976-09-29</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">Acting</Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">75.34</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                quis deleniti non unde, qui neque error illo fuga quam minus.
              </Text>
            </View>
            {/* Movie lists */}
            <MovieList data={[1, 2, 3]} title="Movies" hideSeeAll={true} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CharacterScreen;
