import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

type PaginaPrincipalProps = {
  navigation: any;
};

const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.backgroundImageContainer}>
          <Image
            source={require('../Imagenes/paginaprincipal.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.bottomContainer}>
          <Image
            source={require('../Imagenes/bicho_pagina_principal-removebg-preview.png')}
            style={styles.bichoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>BIENVENIDO</Text>
          <TouchableOpacity
            style={styles.botonEmpezar}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.buttonText}>Iniciar Juego</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonEmpezar}
            onPress={() => navigation.navigate('Perfil')}
          >
            <Text style={styles.buttonText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonEmpezar}
            onPress={() => navigation.navigate('Insectos')}
          >
            <Text style={styles.buttonText}>Insectos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonEmpezar}
            onPress={() => navigation.navigate('GitHub')}
          >
            <Text style={styles.buttonText}>GitHub</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eaf1e2',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  bottomContainer: {
    position: 'relative',
    alignItems: 'center',
    zIndex: 1,
    paddingTop: 50,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  bichoImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
    borderRadius: 30,
    borderWidth: 6,
    borderColor: '#4caf50',
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 3,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
  },
  botonEmpezar: {
    backgroundColor: "#4caf50",
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1.05 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default PaginaPrincipal;

