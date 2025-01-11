import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Alert } from "react-native";

const { width, height } = Dimensions.get("window");
const COLORS = ["red", "blue", "green", "yellow"];

const App = () => {
  const [ballColor, setBallColor] = useState(COLORS[0]);
  const [circleColor, setCircleColor] = useState(COLORS[1]);
  const [position] = useState(new Animated.Value(height - 150));
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircleColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const jump = () => {
    if (isJumping) return;

    setIsJumping(true);
    Animated.sequence([
      Animated.timing(position, {
        toValue: height - 300,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(position, {
        toValue: height - 150,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsJumping(false);
      checkCollision();
    });
  };

  const checkCollision = () => {
    if (ballColor !== circleColor) {
      Alert.alert("¡Perdiste!", "El color no coincide", [
        { text: "Reiniciar", onPress: resetGame },
      ]);
    }
  };

  const resetGame = () => {
    setBallColor(COLORS[0]);
    setCircleColor(COLORS[1]);
  };

  const changeBallColor = () => {
    const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setBallColor(nextColor);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: circleColor }]} />
      <Animated.View
        style={[
          styles.ball,
          { backgroundColor: ballColor, transform: [{ translateY: position }] },
        ]}
      />
      <TouchableOpacity style={styles.button} onPress={jump}>
        <Text style={styles.buttonText}>Saltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSecond} onPress={changeBallColor}>
        <Text style={styles.buttonText}>Cambiar color</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonThird} onPress={resetGame}>
        <Text style={styles.buttonText}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  circle: {
    position: "absolute",
    top: height / 4,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  ball: {
    position: "absolute",
    bottom: 150,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#A8E6A3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonSecond: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "#C1E6A1", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonThird: {
    position: "absolute",
    bottom: 150,
    backgroundColor: "#B9E5A3", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default App;
