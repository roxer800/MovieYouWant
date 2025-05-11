import React, { useEffect, useLayoutEffect, useState } from "react";
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

import { useMovieContext } from "@/context/MovieContext";
import Movies from "./components/Movies";
import NoMovies from "./components/NoMovies";

const SearchScreen = () => {
  const { movies } = useMovieStore();
  const stackNavigation = useNavigation();

  useLayoutEffect(() => {
    stackNavigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerTintColor: "#7950f2",
      title: "",
      headerTitle: () => (
        <View>
          <Text style={styles.logo}>Movie You Want</Text>
        </View>
      ),
    });
  }, [stackNavigation]);

  return (
    <View style={styles.wrapper}>
      {movies.Response === "True" ? <Movies movies={movies} /> : <NoMovies />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6741d9",
  },
  logo: {
    fontSize: 26,
    color: "#7950f2",
    textAlign: "center",
    padding: "auto",
    margin: "auto",
    fontFamily: "Lobster_400Regular",
  },
});

export default SearchScreen;
