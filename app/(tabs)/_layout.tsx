import React from "react";
import { Link, Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `${t("Movies")}`,
          tabBarIcon: () => (
            <MaterialIcons name="local-movies" size={24} color="#6741d9" />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: `${t("Library")}`,
          tabBarIcon: () => (
            <MaterialIcons name="library-books" size={24} color="#6741d9" />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: `${t("Profile")}`,
          tabBarIcon: () => <AntDesign name="user" size={24} color="#6741d9" />,
        }}
      />
    </Tabs>
  );
}
