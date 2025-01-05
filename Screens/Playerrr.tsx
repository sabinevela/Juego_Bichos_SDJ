import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from '../Config/Config';

const Playerrr = () => {
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    const scoresRef = ref(db, 'scores');
    get(scoresRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const scoresList = Object.values(data); 
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
    <View style={styles.container}>
      <Text style={styles.title}>Puntuaciones de Jugadores</Text>
      <FlatList
        data={scores}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.playerName}>{item.nombre}</Text>
            <Text style={styles.playerScore}>{item.score}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 20,
  },
  scoreItem: {
    marginVertical: 10,
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerScore: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Playerrr;
