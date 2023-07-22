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
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const MovieScreen = () => {
  const { params: item } = useRoute();
  const { goBack } = useNavigation();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [movieCasts, setMovieCasts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };
  const getMovieCasts = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) {
      setMovieCasts(data.cast);
    }
    setLoading(false);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (item) {
      setLoading(true);
      getMovieDetails(item.id);
      getMovieCasts(item.id);
      getSimilarMovies(item.id);
    }
  }, [item]);

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
              uri: image500(movie?.poster_path) || fallbackMoviePoster,
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
              {movie?.title}
            </Text>
            {/* status, release, runtime */}
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} * {movie?.release_date?.split("-")[0]} *{" "}
              {movie?.runtime} min
            </Text>
            {/* genres */}
            <View className="flex-row justify-center mx-4 space-x-2">
              {movie?.genres?.map((genre, index) => (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text-base text-clip"
                >
                  {genre.name} {index + 1 !== movie.genres.length ? "*" : null}
                </Text>
              ))}
            </View>
            {/* description */}
            <Text className="text-neutral-400 mx-4 tracking-wide">
              {movie?.overview}
            </Text>
          </View>
          {/* casts */}
          {movieCasts.length > 0 && <CastList casts={movieCasts} />}

          {/* similar movies */}
          {similarMovies.length > 0 && (
            <MovieList
              title="Similar Movies"
              data={similarMovies}
              hideSeeAll={true}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default MovieScreen;
