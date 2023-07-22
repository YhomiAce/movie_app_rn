import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loader from "../components/Loader";
import { debounce } from "lodash";
import { fallbackMoviePoster, image500, searchMovies } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const SearchScreen = () => {
  const navigation = useNavigation();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({ query: search }).then((data) => {
        setLoading(false);
        if (data && data.results.length > 0) {
          setResults(data.results);
        }
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const movieName = "Ant man and the wasp in Quantumania";

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 font-semibold text-white -tracking-wider"
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon color="white" size={23} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loader />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: image500(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
