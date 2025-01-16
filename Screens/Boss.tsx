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
  const [bossHealth, setBossHealth] = useState(300); // Vida inicial del jefe
  const bossPosition = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
  const [isBossVisible, setIsBossVisible] = useState(true);
  const [bossStage, setBossStage] = useState(1); // Etapa inicial
  const [dialogVisible, setDialogVisible] = useState(false); // Mostrar diálogo
  const [randomImage, setRandomImage] = useState(null); // Imagen aleatoria
  const [imageChangeInterval, setImageChangeInterval] = useState(null); // Controlar el cambio de imagen
  const [incorrectImageTouched, setIncorrectImageTouched] = useState(false); // Verifica si se tocó la imagen incorrecta
  const [touchCount, setTouchCount] = useState(0); // Contador de toques
  const [timeLeft, setTimeLeft] = useState(10); // Temporizador de 10 segundos
  const [gameOver, setGameOver] = useState(false); // Si el juego ha terminado

  useEffect(() => {
    startBossBehavior(); // Inicia el comportamiento del jefe al montar el componente
  }, []);

  useEffect(() => {
    if (bossStage === 3) {
      // Iniciar el temporizador solo cuando el jefe esté en la fase 3
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            setGameOver(true); // Fin del juego si el tiempo se acaba
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Limpiar el temporizador
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
        duration: shouldDisappear ? 1000 : 600, // Más lento
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
          setDialogVisible(true); // Mostrar diálogo
          return newHealth; // Mantener la vida para el cambio de etapa
        }

        return newHealth;
      });

      if (bossHealth - 20 <= 0 && bossStage < 3) {
        moveToNextStage(); // Cambiar a la siguiente etapa
      }
    }
  };

  const moveToNextStage = () => {
    setDialogVisible(false); // Ocultar cualquier diálogo
    setBossStage((prevStage) => prevStage + 1);

    if (bossStage === 1) {
      setBossHealth(300); // Regenerar vida para la etapa 2
      startImageChangePhase2();
    } else if (bossStage === 2) {
      setBossHealth(300); // Regenerar vida para la fase 3
      startImageChangePhase3();
    } else if (bossStage === 3) {
      setBossHealth(300); // Regenerar vida para la fase 4
      startStaticPhase4();
    }
  };

  // Fase 2 - Cambio de imágenes lento
  const startImageChangePhase2 = () => {
    setImageChangeInterval(
      setInterval(() => {
        const random = Math.random();
        if (random < 0.5) {
          setRandomImage(require('../Imagenes/InsectoEspecial.png'));
        } else {
          setRandomImage(require('../Imagenes/InsectoDios.webp'));
        }
      }, 1000) // Cambia de imagen cada 1 segundo
    );
  };

  // Fase 3 - Cambio de imágenes lento, pero más lento que la fase 2
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
      }, 1500) // Cambia de imagen cada 1.5 segundos
    );
  };

  // Fase 4 - Imagen estática
  const startStaticPhase4 = () => {
    setRandomImage(require('../Imagenes/InsectoDios.webp')); // Imagen estática para la fase 4
    setTouchCount(0); // Reiniciar contador de toques
    setTimeLeft(10); // Restablecer el temporizador
  };

  const handleImageTouch = () => {
    if (randomImage === require('../Imagenes/bicho_pagina_principal-removebg-preview.png')) {
      setIncorrectImageTouched(true); // Se tocó la imagen incorrecta
      setTimeout(() => setIncorrectImageTouched(false), 2000); // Mostrar advertencia por 2 segundos
    } else {
      setTouchCount((prevCount) => prevCount + 1); // Aumentar el contador de toques
    }

    if (touchCount >= 50) {
      setGameOver(true); // El jugador ganó si toca 50 veces
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>¡Nivel Brutal: Derrota al Jefe Final!</Text>

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
          style={[
            styles.healthBar,
            { width: `${bossHealth}%`, backgroundColor: bossHealth > 50 ? 'green' : 'red' },
          ]}
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
      {bossStage === 4 && !gameOver && (
        <Text style={styles.timer}>Tiempo restante: {timeLeft} segundos</Text>
      )}

      {/* Diálogo */}
      {dialogVisible && (
        <View style={styles.dialog}>
          <Text style={styles.dialogText}>¡No es tan fácil derrotarme!</Text>
          <TouchableOpacity
            style={styles.dialogButton}
            onPress={() => {
              setDialogVisible(false);
              setBossHealth(300); // Regenerar vida después del diálogo
            }}
          >
            <Text style={styles.dialogButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
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
  },
  healthBar: {
    height: '100%',
    borderRadius: 10,
  },
  warningDialog: {
    position: 'absolute',
    top: '40%',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  warningText: {
    color: 'white',
    fontSize: 18,
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
  timer: {
    position: 'absolute',
    top: 20,
    color: 'white',
    fontSize: 20,
  },
  dialog: {
    position: 'absolute',
    top: '40%',
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  dialogText: {
    fontSize: 18,
    color: 'black',
  },
  dialogButton: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  dialogButtonText: {
    color: 'white',
    fontSize: 16,
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
});
