import { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  defaultRating = 0,
  onSetRating,
  movieId,
}: {
  maxRating: number;
  color: string;
  size: number;
  defaultRating: number;
  onSetRating: (movieId: string, rating: number) => void;
  movieId: string;
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(movieId: string, rating: number) {
    setRating(rating);
    onSetRating(movieId, rating);
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(movieId, i + 1)}
            color={color}
            size={size}
          />
        ))}
      </View>
    </View>
  );
}

function Star({
  onRate,
  full,
  color,
  size,
}: {
  onRate: () => void;
  full: boolean;
  color: string;
  size: number;
}) {
  return (
    <TouchableOpacity
      onPress={onRate}
      style={styles.starStyle}
      activeOpacity={1}
    >
      {full ? (
        <FontAwesome
          style={styles.starStyle}
          size={24}
          name="star"
          color="#ffd363"
        />
      ) : (
        <Feather
          style={styles.starStyle}
          size={24}
          name="star"
          color="#ffd363"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0,
  },
  starContainerStyle: {
    flexDirection: "row",
  },
  starStyle: {
    cursor: "pointer",
  },
});
