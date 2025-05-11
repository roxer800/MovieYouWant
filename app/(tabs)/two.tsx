import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import CountryFlag from "react-native-country-flag";
import { Text, View } from "@/components/Themed";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

export default function TabTwoScreen() {
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
  const { t } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.header}>{t("Settings")}</Text>
        <View style={styles.languageWrapper}>
          <TouchableOpacity
            style={styles.langBtn}
            onPress={() => changeLanguage("en")}
          >
            <CountryFlag isoCode="US" size={18} />
            <Text style={styles.langText}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.langBtn}
            onPress={() => changeLanguage("ka")}
          >
            <CountryFlag isoCode="GE" size={18} />
            <Text style={styles.langText}>ქართული</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    marginVertical: 15,
    backgroundColor: "#2b3035",
    borderRadius: 8,
  },
  header: {
    color: "white",
    marginHorizontal: "auto",
    marginVertical: 15,
    fontSize: 30,
    fontFamily: "Lobster_400Regular",
  },
  languageWrapper: {
    padding: 10,
    marginTop: 5,
    backgroundColor: "#212529",
    marginBottom: 5,
    width: "90%",
    marginHorizontal: "auto",
    borderRadius: 10,
    elevation: 5,
  },
  langBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },

  langText: {
    marginLeft: 10,
    fontSize: 16,
    color: "white",
  },
});
