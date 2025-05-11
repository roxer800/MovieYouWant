import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import StarRating from "@/components/StarRating";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import { useMovieStore } from "@/stores/MovieStore";
import {
  startWatching,
  endWatching,
  setFinished,
  setRating,
} from "../../../redux/movieSlice";
import type { RootState, AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import Alert from "../../../components/Alert";
import { Provider } from "react-native-paper";

const MovieScreen = () => {
  const { movie } = useMovieStore();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const watchStatus = useSelector(
    (state: RootState) => state.movie.watchStatus
  );
  const watchedMovies = useSelector(
    (state: RootState) => state.movie.watchedMovies
  );
  const currentMovie = useSelector((state: RootState) => state.movie.movie);

  const isSameMovie = currentMovie?.imdbID === movie?.imdbID;
  const watchedMovie = watchedMovies.find((m) => m.imdbID === movie?.imdbID);
  const userRating = watchedMovie?.rating ?? 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerBackTitleVisible: false,
      headerTintColor: "white",
      title: "",
    });
  }, [navigation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  const handleEndWatching = () => {
    setAlertMessage(`${t("stopped_watching")}`);
    setAlertVisible(true);
    dispatch(endWatching());
  };

  const handleSetRating = (id: string, rating: number) => {
    dispatch(setRating({ id, rating }));
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Provider>
      <View style={styles.wrapper}>
        <Alert
          visible={alertVisible}
          message={alertMessage}
          onDismiss={() => setAlertVisible(false)}
        />
        <View style={styles.movieContainer}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backArrowWrapper}
          >
            <FontAwesome
              style={styles.backArrow}
              name="arrow-left"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <Image source={{ uri: movie?.Poster }} style={{ flex: 0.8 }} />
          <View style={{ marginTop: 15 }}>
            <Text style={styles.movieName}>{movie?.Title}</Text>
            <Text style={styles.white}>{movie?.Released}</Text>
            <Text style={styles.white}>{movie?.Genre}</Text>
            <Text style={styles.white}>{movie?.Country}</Text>
            <View style={styles.starRating}>
              <AntDesign name="star" size={24} color="yellow" />
              <Text style={styles.white}>{`${movie?.imdbRating} ${t(
                "rating"
              )}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          {watchedMovie && isLoading && (
            <View style={styles.starRatingWrapper}>
              <StarRating
                maxRating={10}
                movieId={movie?.imdbID}
                onSetRating={handleSetRating}
                defaultRating={userRating}
              />
            </View>
          )}
          <Text
            style={{ ...styles.description, marginBottom: 10, marginTop: 15 }}
          >
            {movie?.Plot}
          </Text>
          <Text style={styles.description}>{t("Actors")}</Text>
          <Text style={{ ...styles.description, marginBottom: 10 }}>
            {movie?.Actors}
          </Text>
          <Text style={styles.description}>{t("Awards")}</Text>
          <Text style={{ ...styles.description, marginBottom: 10 }}>
            {movie?.Awards}
          </Text>
          {watchedMovie && (
            <Text style={styles.alreadyWatched}>{t("already_watched")}</Text>
          )}
          {(watchStatus === "idle" && !watchedMovie) ||
          (watchStatus === "cancelled" && !watchedMovie) ? (
            <TouchableOpacity
              style={styles.movieBtn}
              onPress={() => dispatch(startWatching(movie!))}
            >
              <Text style={styles.movieBtnText}>{t("start_watching")}</Text>
            </TouchableOpacity>
          ) : watchStatus === "watching" ? (
            isSameMovie ? (
              <>
                <TouchableOpacity
                  style={styles.movieBtn}
                  onPress={handleEndWatching}
                >
                  <Text style={styles.movieBtnText}>{t("end_watching")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.movieBtn}
                  onPress={() => dispatch(setFinished())}
                >
                  <Text style={styles.movieBtnText}>
                    {t("finish_watching")}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.alreadyWatched}>{`${t("already_watching")} ${
                currentMovie?.Title
              }`}</Text>
            )
          ) : null}
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7950f2",
  },
  movieContainer: {
    width: "90%",
    flex: 0.6,
    marginHorizontal: "auto",
    marginTop: 50,
    backgroundColor: "#343a40",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    gap: 15,
    position: "relative",
  },
  backArrowWrapper: {
    position: "absolute",
    zIndex: 1000,
    left: 15,
    top: 15,
    backgroundColor: "#7950f2",
    borderRadius: 100,
  },
  backArrow: {
    padding: 9,
    alignSelf: "center",
    color: "white",
  },
  container: {
    width: "90%",
    flex: 1,
    marginHorizontal: "auto",
    marginBottom: 15,
    backgroundColor: "#2b3035",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  movieName: {
    color: "white",
    fontSize: 20,
    fontWeight: 900,
    maxWidth: 150,
  },
  movieYear: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  white: {
    color: "white",
    marginTop: 10,
    maxWidth: 150,
  },
  starRating: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  starRatingWrapper: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 30,
    marginBottom: 15,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: "#343a40",
    alignItems: "center",
  },
  description: {
    width: "80%",
    marginHorizontal: "auto",
    color: "white",
  },
  movieBtn: {
    backgroundColor: "#7950f2",
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  movieBtnText: {
    fontFamily: "Lobster_400Regular",
    color: "white",
  },
  alreadyWatched: {
    fontFamily: "Lobster_400Regular",
    color: "red",
    alignSelf: "center",
    marginTop: 25,
    fontSize: 18,
  },
});

export default MovieScreen;
