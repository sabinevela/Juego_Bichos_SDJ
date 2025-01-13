import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing } from 'react-native';

type WelcomeProps = {
  navigation: any;
};

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const color = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#388e3c', '#81c784'],
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/imagenwelcome.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Animated.Text
          style={[
            styles.title,
            {
              transform: [{ scale }],
              color,
            },
          ]}
        >
          InsectoX
        </Animated.Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <View style={styles.creditsContainer}>
          <Text style={styles.integrantes}>Sabine Vela</Text>
          <Text style={styles.integrantes}>Dany Fernández</Text>
          <Text style={styles.integrantes}>Joel Romero</Text>
          <Text style={styles.course}>Desarrollo de Software</Text>
          <Text style={styles.course}>Aplicaciones Móviles</Text>
        </View>
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
    backgroundColor: '#e8f5e9',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    letterSpacing: 6,
    textShadowColor: '#004d40',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 15,
    fontFamily: 'Poppins',
  },
  button: {
    backgroundColor: '#66bb6a',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  creditsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  course: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Welcome;
