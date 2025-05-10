import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "@/screens/searchScreen/SearchScreen";
import MovieScreen from "@/screens/movieScreen/MovieScreen";

const Stack = createStackNavigator();

const SearchedMoviesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="searchScreen" component={SearchScreen} />
      <Stack.Screen name="MovieScreen" component={MovieScreen} />
    </Stack.Navigator>
  );
};

export default SearchedMoviesStack;
