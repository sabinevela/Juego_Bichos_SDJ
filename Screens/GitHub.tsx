import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const GitHub = () => {
  return (
    <ImageBackground
      source={require('../Imagenes/fondogit.jpg')}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Equipo de Desarrolladores</Text>
      </View>

      <TouchableOpacity style={styles.nameContainer}>
        <Text style={styles.name}>Sabine Vela</Text>
        <Text style={styles.username}>@sabinevela</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nameContainer}>
        <Text style={styles.name}>Dany Fernández</Text>
        <Text style={styles.username}>@DanyFjj</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nameContainer}>
        <Text style={styles.name}>Joel Romero</Text>
        <Text style={styles.username}>@Joel-Romero</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    backgroundColor: '#9da962',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 5,
    textAlign:'center'
  },
  nameContainer: {
    marginVertical: 15,
    backgroundColor: '#648e5a',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  name: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
    color: '#c6e0f2',
    marginTop: 5,
  },
});

export default GitHub;



