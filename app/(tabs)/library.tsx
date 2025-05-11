import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useMovieContext } from "../../context/MovieContext";
import { router, useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTranslation } from "react-i18next";

const library = () => {
  const { getMovie } = useMovieContext();
  const { t, i18n } = useTranslation();
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
  const watchedMovies = useSelector(
    (state: RootState) => state.movie.watchedMovies
  );
  const totalImdbRating = watchedMovies.reduce(
    (sum, movie) => sum + parseFloat(movie.imdbRating),
    0
  );
  const totalRating = watchedMovies
    .filter((movie) => movie.rating !== undefined)
    .reduce((sum, movie) => sum + (movie.rating ?? 0), 0);

  const totalWatchTime = watchedMovies.reduce(
    (sum, movie) => sum + parseFloat(movie.Runtime),
    0
  );
  const averageImdbRating = parseFloat(
    (totalImdbRating / watchedMovies.length).toFixed(1)
  );
  const averageRating = parseFloat(
    (totalRating / watchedMovies.length).toFixed(1)
  );
  const averageWatchTime = parseFloat(
    (totalWatchTime / watchedMovies.length).toFixed(1)
  );

  function navigateToMovie(movieId: string) {
    getMovie(movieId);
    router.push("/screens/movieScreen/MovieScreen");
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.movieCounter}>
          <Text style={styles.header}>{t("watched_movies")}</Text>
          {watchedMovies.length > 0 && (
            <View style={styles.statisticsWrapper}>
              <View style={styles.statistics}>
                <Image
                  source={require("../../assets/images/hashtag.png")}
                  style={styles.movieIcon}
                />
                <Text style={styles.text}>
                  {watchedMovies.length}{" "}
                  {watchedMovies.length > 1 &&
                    i18n.language === "en" &&
                    t("Movies")}
                  {watchedMovies.length === 1 &&
                    i18n.language === "en" &&
                    t("Movie")}
                  {i18n.language === "ka" && t("Movie")}
                </Text>
              </View>
              {averageRating && (
                <View style={styles.statistics}>
                  <Image
                    source={require("../../assets/images/star.png")}
                    style={styles.movieIcon}
                  />
                  <Text style={styles.text}>{averageRating}</Text>
                </View>
              )}
              {averageImdbRating && (
                <View style={styles.statistics}>
                  <Image
                    source={require("../../assets/images/stars.png")}
                    style={styles.movieIcon}
                  />
                  <Text style={styles.text}>{averageImdbRating}</Text>
                </View>
              )}
              {averageWatchTime && (
                <View style={styles.statistics}>
                  <Image
                    source={require("../../assets/images/hourglass.png")}
                    style={styles.movieIcon}
                  />
                  <Text style={styles.text}>
                    {averageWatchTime} {t("min")}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        {watchedMovies.length > 0 ? (
          <ScrollView style={styles.container}>
            {watchedMovies?.map((movie) => {
              return (
                <View key={movie.imdbID}>
                  <TouchableOpacity
                    onPress={() => navigateToMovie(movie.imdbID)}
                    style={styles.movieContainer}
                  >
                    <Image
                      source={{ uri: movie.Poster }}
                      style={styles.moviePoster}
                    />
                    <View style={styles.movieDetails}>
                      <Text style={styles.movieName}>{movie.Title}</Text>
                      <View style={styles.movieYear}>
                        <View style={styles.movieYear}>
                          <AntDesign name="calendar" size={24} color="white" />
                          <Text style={styles.year}>{movie.Year}</Text>
                        </View>
                        {movie.rating && (
                          <View style={styles.movieYear}>
                            <Image
                              source={require("../../assets/images/star.png")}
                              style={styles.movieIcon}
                            />
                            <Text style={styles.text}>{movie.rating}</Text>
                          </View>
                        )}
                        {averageWatchTime && (
                          <View style={styles.statistics}>
                            <Image
                              source={require("../../assets/images/star.png")}
                              style={styles.movieIcon}
                            />
                            <Text style={styles.text}>{movie.Runtime}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.hr}></View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <Text style={styles.emptyLibrary}>{t("library_empty")}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7950f2",
  },
  container: {
    width: "90%",
    flex: 0.9,
    marginHorizontal: "auto",
    marginTop: 15,
    backgroundColor: "#343a40",
    borderRadius: 8,
    gap: 15,
  },
  header: {
    color: "white",
    marginHorizontal: "auto",
    marginTop: 20,
    fontSize: 20,
    fontFamily: "Lobster_400Regular",
  },
  movieCounter: {
    backgroundColor: "#343a40",
    height: 115,
    width: "100%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  statisticsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
  },
  statistics: {
    flexDirection: "row",
    gap: 5,
  },
  text: {
    color: "white",
  },
  movieContainer: {
    width: "90%",
    marginHorizontal: "auto",
    height: 100,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  moviePoster: {
    width: 48,
    height: 48,
  },
  movieIcon: {
    width: 20,
    height: 20,
  },
  movieDetails: {
    marginLeft: 15,
  },
  movieName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  movieYear: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  year: {
    color: "white",
  },
  hr: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
    width: "90%",
    marginHorizontal: "auto",
  },
  emptyLibrary: {
    color: "white",
    marginHorizontal: "auto",
    marginTop: 20,
    fontSize: 20,
    fontFamily: "Lobster_400Regular",
  },
});

export default library;
