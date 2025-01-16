import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native';
import { Video } from 'expo-av'; 


type PaginaPrincipalProps = {
  navigation: any;
};

const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({ navigation }) => {
  
  const [fadeAnim] = useState(new Animated.Value(0));  
  const [scaleAnim] = useState(new Animated.Value(0)); 

  useEffect(() => {
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.backgroundVideoContainer}>
          <Video
            source={require('../Screens/video/689955545a3fc679e8a8721c2fbbdb62.mp4')} 
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.backgroundVideo}
          />
        </View>
        <View style={styles.bottomContainer}>
          {/* Animación de opacidad para el título */}
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            BIENVENIDO
          </Animated.Text>

          {/* Botones con animación de escala */}
          <Animated.View style={[styles.botonEmpezar, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Welcome')}
            >
              <Text style={styles.buttonText}>Iniciar Juego</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.botonEmpezar, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Insectos')}
            >
              <Text style={styles.buttonText}>Insectos</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.botonEmpezar, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('GitHub')}
            >
              <Text style={styles.buttonText}>GitHub</Text>
            </TouchableOpacity>
          </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  backgroundVideoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
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
    backgroundColor: 'rgba(237, 220, 183, 0.7)', 
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1.05 }],
  },
  buttonText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default PaginaPrincipal;
