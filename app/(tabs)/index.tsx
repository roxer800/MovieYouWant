import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useMovieContext } from "@/context/MovieContext";
import * as Notifications from "expo-notifications";
import { useTranslation } from "react-i18next";

export default function TabOneScreen() {
  const { t } = useTranslation();
  const { getMovies } = useMovieContext();
  const [search, setSearch] = useState("");
  const [isEligible, setIsEligible] = useState(true);

  function searchMovieFunction(query: string) {
    if (search.length > 2) {
      setIsEligible(true);
      getMovies(query);
      router.push("/searchedMovies");
    } else {
      setIsEligible(false);
    }
  }

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Permission for notifications was not granted.");
        return;
      }
    };
    requestNotificationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Movie You Want</Text>
      <TextInput
        placeholder={t("search_movies")}
        placeholderTextColor="#343a40"
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
      {!isEligible && (
        <Text style={styles.eligibility}>{t("search_eligibility")}</Text>
      )}
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
  eligibility: {
    fontFamily: "Lobster_400Regular",
    color: "red",
    marginTop: 20,
    fontSize: 24,
    textAlign: "center",
  },
});
