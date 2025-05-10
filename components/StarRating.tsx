import { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
  movieId,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(movieId: string, rating: number) {
    setRating(rating);
    onSetRating(movieId, rating);
    console.log("movieId", movieId);
    console.log("rating", rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(movieId, i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </View>
    </View>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  return (
    <TouchableOpacity
      onPress={onRate}
      onPressIn={onHoverIn}
      onPressOut={onHoverOut}
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

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR



*/
