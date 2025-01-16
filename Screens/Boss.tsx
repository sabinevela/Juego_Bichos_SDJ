import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function BossLevel() {
  const [bossHealth, setBossHealth] = useState(300); // vida inicial del jefe
  const bossPosition = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
  const [isBossVisible, setIsBossVisible] = useState(true); // visibilidad del jefe

  useEffect(() => {
    startBossBehavior(); // inicia el movimiento del jefe al montar el componente
  }, []);

  // movimiento continuo del jefe
  const startBossBehavior = () => {
    const moveBossContinuously = () => {
      const randomX = Math.random() * screenWidth * 1.6 - screenWidth * 0.3;
      const randomY = Math.random() * screenHeight * 1.6 - screenHeight * 0.3;

      const shouldDisappear = Math.random() < 0.2;

      setIsBossVisible(!shouldDisappear);

      Animated.timing(bossPosition, {
        toValue: { x: randomX, y: randomY },
        duration: shouldDisappear ? 1000 : 600, // más lento si desaparece
        useNativeDriver: false,
      }).start(() => {
        moveBossContinuously();
      });
    };

    moveBossContinuously();
  };

  // reducción de la salud del jefe al tocarlo
  const handleBossTouch = () => {
    if (bossHealth > 0 && isBossVisible) {
      setBossHealth((prevHealth) => Math.max(prevHealth - 20, 0));
    }
  };

  return (
    <ImageBackground
      source={require('../Imagenes/pixel-art-background-uruemfkn6xb7qph1.jpg')} // imagen de fondo
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.header}>¡Derrota al Jefe Final!</Text>

        {/* jefe */}
        {isBossVisible && (
          <Animated.View style={[bossPosition.getLayout(), styles.bossContainer]}>
            <TouchableOpacity onPress={handleBossTouch}>
              <Image source={require('../Imagenes/boss.png')} style={styles.boss} />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* barra de salud */}
        <View style={styles.healthBarContainer}>
          <View
            style={[
              styles.healthBar,
              { width: `${bossHealth}%`, backgroundColor: bossHealth > 50 ? 'green' : 'red' },
            ]}
          />
        </View>

        {/* mensaje de victoria */}
        {bossHealth <= 0 && (
          <View style={styles.winDialog}>
            <Text style={styles.winText}>¡Ganaste! ¡Derrotaste al jefe!</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  healthBarContainer: {
    position: 'absolute',
    bottom: 40,
    left: '10%',
    width: '80%',
    height: 20,
    backgroundColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
  },
  healthBar: {
    height: '100%',
    borderRadius: 10,
  },
  bossContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boss: {
    width: 150,
    height: 150,
  },
  winDialog: {
    position: 'absolute',
    top: '40%',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  winText: {
    color: 'white',
    fontSize: 18,
  },
});
