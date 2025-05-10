import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import { useMovieContext } from "@/components/context/MovieContext";
import { useMovieStore } from "@/stores/MovieStore";

export default function TabOneScreen() {
  const { getMovies, getMovie } = useMovieContext();
  const [search, setSearch] = useState("");

  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  function searchMovieFunction(query: string) {
    getMovies(query);
    router.push("/searchedMoviesStack");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Movie You Want</Text>
      <TextInput
        placeholder="Search movies..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />
      <TouchableOpacity
        onPress={() => {
          searchMovieFunction(search);
        }}
        style={styles.searchBtn}
      >
        <Text style={styles.searchBtnText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7950f2",
  },
  search: {
    height: 50,
    width: 300,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "white",
  },
  searchBtn: {
    backgroundColor: "#a084f7",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchBtnText: {
    color: "white",
  },
  logo: {
    fontFamily: "Lobster_400Regular",
    fontSize: 40,
    color: "white",
    position: "absolute",
    top: 180,
  },
});
