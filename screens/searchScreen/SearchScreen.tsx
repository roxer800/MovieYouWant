import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
import { useMovieStore } from "@/stores/MovieStore";
import { useMovieContext } from "../../components/context/MovieContext";
const SearchScreen = () => {
  const { movies } = useMovieStore();
  const { getMovie } = useMovieContext();
  const stackNavigation = useNavigation();

  function navigateToMovie(movieId: string) {
    getMovie(movieId);
    stackNavigation.navigate("MovieScreen");
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {movies?.Search?.map((movie) => {
          return (
            <View key={movie.imdbID}>
              <TouchableOpacity
                onPress={() => navigateToMovie(movie.imdbID)}
                style={styles.movieContainer}
              >
                <Image
                  source={{ uri: movie.Poster }}
                  style={styles.movieIcon}
                />
                <View style={styles.movieDetails}>
                  <Text style={styles.movieName}>{movie.Title}</Text>
                  <View style={styles.movieYear}>
                    <AntDesign name="calendar" size={24} color="white" />
                    <Text style={styles.year}>{movie.Year}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.hr}></View>
            </View>
          );
        })}
      </ScrollView>
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
    flex: 1,
    marginHorizontal: "auto",
    marginVertical: 15,
    backgroundColor: "#2b3035",
    borderRadius: 8,
  },
  movieContainer: {
    width: "90%",
    marginHorizontal: "auto",
    height: 100,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  movieIcon: {
    width: 58,
    backgroundColor: "white",
    height: 68,
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
});

export default SearchScreen;
