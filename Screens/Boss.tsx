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
  const [bossHealth, setBossHealth] = useState(300);
  const bossPosition = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
  const [isBossVisible, setIsBossVisible] = useState(true);
  const [bossStage, setBossStage] = useState(1);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [randomImage, setRandomImage] = useState(null);
  const [imageChangeInterval, setImageChangeInterval] = useState(null);
  const [incorrectImageTouched, setIncorrectImageTouched] = useState(false);
  const [touchCount, setTouchCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [phase4Timer, setPhase4Timer] = useState(10);

  useEffect(() => {
    startBossBehavior();
  }, []);

  useEffect(() => {
    if (bossStage === 3) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            setGameOver(true);
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
    if (bossStage === 4) {
      const phase4Interval = setInterval(() => {
        setPhase4Timer((prevTime) => {
          if (prevTime === 0) {
            clearInterval(phase4Interval);
            if (touchCount < 50) {
              setGameOver(true);
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  }, [bossStage]);

  const startBossBehavior = () => {
    const moveBossContinuously = () => {
      const randomX = Math.random() * screenWidth * 1.6 - screenWidth * 0.3;
      const randomY = Math.random() * screenHeight * 1.6 - screenHeight * 0.3;

      const shouldDisappear = Math.random() < 0.2;
      setIsBossVisible(!shouldDisappear);

      Animated.timing(bossPosition, {
        toValue: { x: randomX, y: randomY },
        duration: shouldDisappear ? 1000 : 600,
        useNativeDriver: false,
      }).start(() => {
        moveBossContinuously();
      });
    };

    moveBossContinuously();
  };

  const handleBossTouch = () => {
    if (bossHealth > 0 && isBossVisible && !gameOver) {
      setBossHealth((prevHealth) => {
        const newHealth = Math.max(prevHealth - 20, 0);

        if (newHealth === 150 && bossStage === 1) {
          setDialogVisible(true);
          return newHealth;
        }

        return newHealth;
      });

      if (bossHealth - 20 <= 0 && bossStage < 3) {
        moveToNextStage();
      }
    }
  };

  const moveToNextStage = () => {
    setDialogVisible(false);
    setBossStage((prevStage) => prevStage + 1);

    if (bossStage === 1) {
      setBossHealth(300);
      startImageChangePhase2();
      setWarningMessage("Fase 2: ¡Imágenes especiales! Toca las correctas para cambiar la vida del jefe.");
    } else if (bossStage === 2) {
      setBossHealth(300);
      startImageChangePhase3();
      setWarningMessage("Fase 3: ¡Más imágenes! Cuidado, una imagen puede hacerte perder vida.");
    } else if (bossStage === 3) {
      setWarningMessage("Fase 4: ¡Última fase! Toca la imagen 50 veces en 10 segundos para ganar.");
      setRandomImage(require('../Imagenes/Insecto1.jpeg'));
    }
  };

  const startImageChangePhase2 = () => {
    setImageChangeInterval(
      setInterval(() => {
        const random = Math.random();
        if (random < 0.5) {
          setRandomImage(require('../Imagenes/InsectoEspecial.png'));
        } else {
          setRandomImage(require('../Imagenes/InsectoDios.webp'));
        }
      }, 500)
    );
  };

  const startImageChangePhase3 = () => {
    setImageChangeInterval(
      setInterval(() => {
        const random = Math.random();
        if (random < 0.05) {
          setRandomImage(require('../Imagenes/InsectoDios.webp'));
        } else if (random < 0.5) {
          setRandomImage(require('../Imagenes/InsectoEspecial.png'));
        } else {
          setRandomImage(require('../Imagenes/bicho_pagina_principal-removebg-preview.png'));
        }
      }, 700)
    );
  };

  const handleImageTouch = () => {
    if (randomImage === require('../Imagenes/bicho_pagina_principal-removebg-preview.png')) {
      setIncorrectImageTouched(true);
      setTimeout(() => setIncorrectImageTouched(false), 2000);
    } else {
      setTouchCount((prevCount) => prevCount + 1);
    }

    if (touchCount >= 50) {
      setGameOver(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>¡Nivel Brutal: Derrota al Jefe Final!</Text>

      {/* Mensaje de advertencia */}
      {warningMessage && (
        <View style={styles.warningDialog}>
          <Text style={styles.warningText}>{warningMessage}</Text>
        </View>
      )}

      {/* Jefe */}
      {isBossVisible && (
        <Animated.View style={[bossPosition.getLayout(), styles.bossContainer]}>
          <TouchableOpacity onPress={handleBossTouch}>
            {bossStage === 1 && (
              <Image source={require('../Imagenes/Insecto2.jpeg')} style={styles.boss} />
            )}
            {bossStage === 2 && randomImage && (
              <Image source={randomImage} style={styles.boss} />
            )}
            {bossStage === 3 && randomImage && (
              <Image source={randomImage} style={styles.boss} />
            )}
            {bossStage === 4 && randomImage && (
              <Image source={randomImage} style={styles.boss} />
            )}
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Barra de salud */}
      <View style={styles.healthBarContainer}>
        <View
          style={[styles.healthBar, { width: `${bossHealth}%`, backgroundColor: bossHealth > 50 ? 'green' : 'red' }]}
        />
      </View>

      {/* Mensaje de advertencia */}
      {incorrectImageTouched && (
        <View style={styles.warningDialog}>
          <Text style={styles.warningText}>¡Cuidado! ¡Eso te hará perder vida!</Text>
        </View>
      )}

      {/* Mensaje de victoria */}
      {gameOver && touchCount >= 50 && (
        <View style={styles.winDialog}>
          <Text style={styles.winText}>¡Ganaste! ¡Derrotaste al jefe!</Text>
        </View>
      )}

      {/* Temporizador */}
      {bossStage === 3 && !gameOver && (
        <Text style={styles.timer}>Tiempo restante: {timeLeft} segundos</Text>
      )}
      {bossStage === 4 && !gameOver && (
        <Text style={styles.timer}>Tiempo restante: {phase4Timer} segundos</Text>
      )}
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
  warningDialog: {
    position: 'absolute',
    top: screenHeight / 3,
    left: screenWidth / 4,
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 18,
    color: 'white',
  },
  winDialog: {
    position: 'absolute',
    top: screenHeight / 3,
    left: screenWidth / 4,
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  winText: {
    fontSize: 18,
    color: 'white',
  },
  timer: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    top: 10,
  },
});
