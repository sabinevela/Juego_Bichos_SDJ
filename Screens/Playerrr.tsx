import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from '../Config/Config';

const Puntaje = ({ navigation }: { navigation: any }) => {
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    const scoresRef = ref(db, 'scores');
    get(scoresRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const scoresList = Object.entries(data).map(([key, value]) => {
            return typeof value === 'object' && value !== null
              ? { id: key, ...value }
              : { id: key, value };
          });
          setScores(scoresList);
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <ImageBackground
      source={require('../Imagenes/Fondo4.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Puntuaciones de Jugadores:</Text>

        <View style={styles.header}>
          <Text style={[styles.headerText, styles.headerRank]}>Número</Text>
          <Text style={[styles.headerText, styles.headerName]}>Nombre</Text>
          <Text style={[styles.headerText, styles.headerScore]}>Score</Text>
        </View>

        <FlatList
          data={scores}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.scoreItem}>
              <Text style={styles.rank}>{index + 1}</Text>
              <Text style={styles.playerName}>{item.nombre}</Text>
              <Text style={styles.playerScore}>{item.score}</Text>
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('PaginaPrincipal')}
        >
          <Text style={styles.backButtonText}>Regresar al Inicio</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 18,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerRank: {
    width: 100,
  },
  headerName: {
    width: '50%',
  },
  headerScore: {
    width: 80,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4caf50',
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    width: 40,
    textAlign: 'center',
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    width: '50%',
    textAlign: 'center',
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    width: 80,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Puntaje;
