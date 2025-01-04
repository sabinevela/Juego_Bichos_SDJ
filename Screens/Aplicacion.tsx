import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { Animated, TouchableOpacity } from 'react-native';

const insectImages = [
  require('../assets/mariquita.jpg'),
  require('../assets/mosca.jpg'),
  require('../assets/abeja.jpg'),
];

type AplicacionProps = {
  route: any;
  navigation: any;
};

const Aplicacion: React.FC<AplicacionProps> = ({ route, navigation }) => {
  const { username } = route.params;
  const [score, setScore] = useState(0);
  const [insects, setInsects] = useState<Array<any>>([]);

  useEffect(() => {
    generateInsects();
  }, []);

  const generateInsects = () => {
    const numInsects = Math.floor(Math.random() * 5) + 3;
    const newInsects = [];

    for (let i = 0; i < numInsects; i++) {
      newInsects.push({
        id: i,
        left: new Animated.Value(Math.random() * 300),  
        top: new Animated.Value(Math.random() * 600),  
        image: insectImages[Math.floor(Math.random() * insectImages.length)],
      });
    }

    setInsects(newInsects);
    moveInsects(newInsects); 
  };

  const moveInsects = (insects: Array<any>) => {
    insects.forEach(insect => {
      moveInsect(insect);
    });
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
    setScore(prevScore => prevScore + 1);
    setInsects(insects.filter(insect => insect.id !== id));
  };

  const handleEndGame = () => {
    Alert.alert(
      "Juego terminado",
      `¡${username}, tu puntaje final es: ${score}!`,
      [{ text: "OK", onPress: () => navigation.navigate("Welcome") }]
    );
  };

  return (
    <ImageBackground
      source={require('../assets/fondojueguito.jpg')}
      style={styles.container}
    >
      <Text style={styles.title}>¡Aplasta los insectos!</Text>
      <Text style={styles.score}>Puntaje: {score}</Text>
      <Text style={styles.username}>Jugador: {username}</Text>

      <TouchableOpacity style={styles.generateButton} onPress={generateInsects}>
        <Text style={styles.generateButtonText}>Aumentar Insectos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.endButton} onPress={handleEndGame}>
        <Text style={styles.endButtonText}>Terminar Intento</Text>
      </TouchableOpacity>

      {insects.map(insect => (
        <Animated.View
          key={insect.id}
          style={[
            styles.insect,
            { 
              transform: [
                { translateX: insect.left },
                { translateY: insect.top }
              ]
            }
          ]}
        >
          <TouchableOpacity onPress={() => aplastarInsecto(insect.id)}>
            <Image source={insect.image} style={styles.insectImage} />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: '#4afc48',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#4afc48',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#86e485',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    shadowColor: '#00bcd4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  endButton: {
    backgroundColor: '#ff6347',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 30,
    shadowColor: '#ff0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  endButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  insect: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  insectImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default Aplicacion;
