import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  //   HeartIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import CastList from "../components/CastList";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

var { width, height } = Dimensions.get("window");
const MovieScreen = () => {
  const { params: item } = useRoute();
  const { goBack } = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [item]);

  const movieName = "Ant man and the wasp in Quantumania";

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* Back button and movie poster */}
      <View className="w-full -mt-5">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => goBack()}
          >
            <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon
              size={35}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={{
              uri: "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
            }}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {/* Movie Details */}
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            {/* title */}
            <Text className="text-white text-center text-3xl font-bold -tracking-wider">
              {movieName}
            </Text>
            {/* status, release, runtime */}
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Released * 2020 * 170 min
            </Text>
            {/* genres */}
            <View className="flex-row justify-center mx-4 space-x-2">
              <Text className="text-neutral-400 font-semibold text-base text-clip">
                Action *
              </Text>
              <Text className="text-neutral-400 font-semibold text-base text-clip">
                Thrill *
              </Text>
              <Text className="text-neutral-400 font-semibold text-base text-clip">
                Comedy
              </Text>
            </View>
            {/* descriptio */}
            <Text className="text-neutral-400 mx-4 tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              perferendis asperiores ratione impedit quia fugiat, non voluptatum
              repudiandae ab beatae!
            </Text>
          </View>
          {/* casts */}
          <CastList casts={[1, 2, 3, 4, 5]} />

          {/* similar movies */}
          <MovieList
            title="Similar Movies"
            data={[1, 2, 3]}
            hideSeeAll={true}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default MovieScreen;
