import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function BossLevel() {
  const [bossHealth, setBossHealth] = useState(200); // Incrementa la vida del jefe
  const bossPosition = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0]; // Posición inicial del jefe
  const [isBossVisible, setIsBossVisible] = useState(true); // Visibilidad del jefe

  useEffect(() => {
    startBossBehavior(); // Inicia el comportamiento del jefe al montar el componente
  }, []);

  const startBossBehavior = () => {
    const moveBossContinuously = () => {
      // Generar coordenadas aleatorias, permitiendo que a veces salga de la pantalla
      const randomX = Math.random() * screenWidth * 1.5 - screenWidth * 0.25; // Puede salir por la izquierda/derecha
      const randomY = Math.random() * screenHeight * 1.5 - screenHeight * 0.25; // Puede salir por arriba/abajo

      // Determinar si el jefe será visible o invisible
      const shouldDisappear = Math.random() < 0.3; // 30% de probabilidad de desaparecer

      setIsBossVisible(!shouldDisappear); // Cambia la visibilidad del jefe

      Animated.timing(bossPosition, {
        toValue: { x: randomX, y: randomY },
        duration: shouldDisappear ? 1200 : 600, // Más lento si desaparece
        useNativeDriver: false,
      }).start(() => {
        moveBossContinuously(); // Continua el movimiento indefinidamente
      });
    };

    moveBossContinuously();
  };

  const handleBossTouch = () => {
    if (bossHealth > 0 && isBossVisible) {
      setBossHealth((prevHealth) => Math.max(prevHealth - 10, 0)); // Reducir la salud

      // Si la vida llega a 0, detener el movimiento
      if (bossHealth - 10 <= 0) {
        bossPosition.stopAnimation(); // Detener la animación cuando el jefe muere
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>¡Nivel Brutal: Derrota al Jefe Final!</Text>

      {/* Jefe */}
      {isBossVisible && (
        <Animated.View style={[bossPosition.getLayout(), styles.bossContainer]}>
          <TouchableOpacity onPress={handleBossTouch}>
            <Image source={require('../Imagenes/Insecto2.jpeg')} style={styles.boss} />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Barra de salud en la parte inferior */}
      <View style={styles.healthBarContainer}>
        <View
          style={[
            styles.healthBar,
            { width: `${bossHealth}%`, backgroundColor: bossHealth > 50 ? 'green' : 'red' },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0b16',
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
    bottom: 20,
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
  },
  boss: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
