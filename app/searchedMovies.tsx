import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./screens/searchScreen/SearchScreen";
import MovieScreen from "./screens/movieScreen/MovieScreen";
import { useNavigation } from "expo-router";

const Stack = createStackNavigator();

const SearchedMovies = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerBackTitleVisible: false,
      headerTintColor: "white",
      title: "",
    });
  }, [navigation]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="searchScreen" component={SearchScreen} />
      <Stack.Screen name="MovieScreen" component={MovieScreen} />
    </Stack.Navigator>
  );
};

export default SearchedMovies;
