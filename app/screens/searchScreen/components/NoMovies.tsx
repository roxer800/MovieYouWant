import { View } from "@/components/Themed";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
const NoMovies = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.warning}>{t("no_Movies")}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Entypo name="chevron-left" size={24} color="white" />
        <Text style={styles.btnText}>{t("go_back")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    flex: 0.4,
    marginHorizontal: "auto",
    marginVertical: 15,
    backgroundColor: "#2b3035",
    borderRadius: 8,
  },
  warning: {
    fontSize: 23,
    color: "#7950f2",
    textAlign: "center",
    padding: "auto",
    marginHorizontal: "auto",
    marginTop: 70,
    fontFamily: "Lobster_400Regular",
  },
  btn: {
    marginTop: 25,
    backgroundColor: "#7950f2",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
  },
});

export default NoMovies;
