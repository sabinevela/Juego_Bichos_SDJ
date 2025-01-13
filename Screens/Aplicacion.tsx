import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { Animated, TouchableOpacity } from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../Config/Config';

const insectImages = [
  require('../Imagenes/Insecto1.jpeg'),
  require('../Imagenes/Insecto2.jpeg'),
  require('../Imagenes/Insecto3.jpeg'),
  require('../Imagenes/Insecto4.jpeg'),
];

type AplicacionProps = {
  route: any;
  navigation: any;
};

const Aplicacion: React.FC<AplicacionProps> = ({ route, navigation }) => {
  const { username } = route.params;
  const [score, setScore] = useState(0);
  const [insects, setInsects] = useState<Array<any>>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const insectInterval = setInterval(() => generateInsects(), 3000);
    return () => clearInterval(insectInterval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleEndGame();
    } else {
      const timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const generateInsects = () => {
    if (gameOver) return;

    const numInsects = Math.floor(Math.random() * 5) + 3;
    const newInsects = [];

    for (let i = 0; i < numInsects; i++) {
      newInsects.push({
        id: Math.random(),
        left: new Animated.Value(Math.random() * 300),
        top: new Animated.Value(Math.random() * 600),
        image: insectImages[Math.floor(Math.random() * insectImages.length)],
      });
    }

    setInsects(prevInsects => [...prevInsects, ...newInsects]);
    moveInsects(newInsects);
  };

  const moveInsects = (insects: Array<any>) => {
    insects.forEach(insect => moveInsect(insect));
  };

  const moveInsect = (insect: any) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(insect.left, {
          toValue: Math.random() * 300,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(insect.top, {
          toValue: Math.random() * 600,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const aplastarInsecto = (id: number) => {
    if (!gameOver) {
      setScore(prevScore => prevScore + 1);
      setInsects(insects.filter(insect => insect.id !== id));
    }
  };

  const handleEndGame = () => {
    setGameOver(true);
    const scoreRef = ref(db, 'scores/' + username);
    set(scoreRef, { nombre: username, score })
      .then(() => {
        Alert.alert("Juego terminado", `¡${username}, tu puntaje final es: ${score}!`, [
          { text: "OK", onPress: () => navigation.navigate("Playerrr") },
        ]);
      })
      .catch(error => Alert.alert('Error al guardar el score: ' + error.message));
  };

  return (
    <ImageBackground
      source={require('../Imagenes/imagenaplicacion.jpg')}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>¡Aplasta los insectos!</Text>
        <Text style={styles.score}>Puntaje: {score}</Text>
        <Text style={styles.time}>Tiempo Restante: {timeLeft} segundos</Text>
        <Text style={styles.username}>Jugador: {username}</Text>
      </View>

      {insects.map(insect => (
        <Animated.View
          key={insect.id}
          style={[
            styles.insect,
            {
              transform: [{ translateX: insect.left }, { translateY: insect.top }],
            },
          ]}
        >
          <TouchableOpacity onPress={() => aplastarInsecto(insect.id)}>
            <Image source={insect.image} style={styles.insectImage} />
          </TouchableOpacity>
        </Animated.View>
      ))}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.endButton} onPress={handleEndGame}>
          <Text style={styles.endButtonText}>Terminar Intento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.endButton} onPress={() => navigation.navigate('Score')}>
          <Text style={styles.endButtonText}>Ver Puntuación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.endButton} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.endButtonText}>Ver Perfil</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  score: {
    fontSize: 24,
    color: '#fff',
  },
  time: {
    fontSize: 20,
    color: '#FFD700',
  },
  username: {
    fontSize: 20,
    color: '#FFD700',
  },
  insect: {
    position: 'absolute',
    width: 70,
    height: 70,
  },
  insectImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  endButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 20,
  },
  endButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Aplicacion;
