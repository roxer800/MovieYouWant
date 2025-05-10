import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useTranslation } from "react-i18next";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `${t("Movies")}`,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-movies" size={24} color="black" />
          ),
          headerRight: () => <Link href="/modal" asChild></Link>,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: `${t("Library")}`,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="library-books" size={24} color="black" />
          ),
          headerRight: () => <Link href="/modal" asChild></Link>,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: `${t("Profile")}`,
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
