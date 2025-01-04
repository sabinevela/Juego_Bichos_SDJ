import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type WelcomeProps = {
  navigation: any;
};

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/insectos.jpg')}
        style={styles.backgroundImage}
      />
      <Text style={styles.title}>InsectoManía</Text>
      
      <TouchableOpacity 
        style={styles.botonEmpezar} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>¡Empezar!</Text>
      </TouchableOpacity>

      <View style={styles.creditsContainer}>
        <Text style={styles.integrantes}>Sabine Vela</Text>
        <Text style={styles.integrantes}>Dany Fernández</Text>
        <Text style={styles.integrantes}>Joel Romero</Text>
        <Text style={styles.course}>Desarrollo de Software</Text>
        <Text style={styles.course}>Aplicaciones Móviles</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.7,
    zIndex: 0,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#9ae084',
    marginBottom: 50,
    textAlign: 'center',
    zIndex: 1,
    letterSpacing: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
  },
  botonEmpezar: {
    backgroundColor: 'linear-gradient(to right,rgb(23, 73, 16), #00bcd4)',
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginBottom: 40,
    zIndex: 1,
    shadowColor: '#ff4081',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  
  creditsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    padding: 20,
    borderRadius: 15, 
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    width: '80%',
  },
  integrantes: {
    fontSize: 20,
    color: '#a8ffa4', 
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  course: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
});
export default Welcome;
