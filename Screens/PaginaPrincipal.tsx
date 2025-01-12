import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Video } from 'expo-av'; // Si usas Expo
// import Video from 'react-native-video'; // Si no usas Expo

type PaginaPrincipalProps = {
  navigation: any;
};

const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.backgroundVideoContainer}>
          <Video
            source={require('../Screens/video/689955545a3fc679e8a8721c2fbbdb62.mp4')} // Ruta de tu video
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
          <Text style={styles.title}>BIENVENIDO</Text>
          <TouchableOpacity
            style={styles.botonEmpezar}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.buttonText}>Iniciar Juego</Text>
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
    backgroundColor: 'rgba(237, 220, 183, 0.7)', // Fondo de botón color #eddcb7 con transparencia
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: '#000', // Sombra en negro
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1.05 }],
  },
  buttonText: {
    color: '#000', // Texto en color negro
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default PaginaPrincipal;
