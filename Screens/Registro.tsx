import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../Config/Config';
import { Video } from 'expo-av'; // Usamos Expo Video para el fondo

type LoginProps = {
  navigation: any;
};

const Inicio: React.FC<LoginProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const registro = () => {
    if (!userName || !correo || !contrasenia) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        const db = getDatabase();
        set(ref(db, `usuarios/${user.uid}`), {
          userName,
          email: correo,
        })
          .then(() => {
            Alert.alert('¡Éxito!', 'Usuario registrado exitosamente.');
            navigation.navigate('Welcome');
          })
          .catch((error) => {
            Alert.alert('Error', `No se pudo guardar el usuario: ${error.message}`);
          });
      })
      .catch((error) => {
        Alert.alert('Error', `No se pudo registrar: ${error.message}`);
      });
  };

  return (
    <View style={styles.background}>
      {/* Fondo de video */}
      <Video
        source={require('../Screens/video/3.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.backgroundVideo}
      />

      <View style={styles.container}>
        <Text style={styles.title}>¡Regístrate!</Text>

        <TextInput
          placeholder="Nombre de usuario"
          style={styles.input}
          onChangeText={(texto) => setUserName(texto)}
          value={userName}
          placeholderTextColor="#fff"
        />
        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          onChangeText={(texto) => setCorreo(texto)}
          value={correo}
          placeholderTextColor="#fff"
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          onChangeText={(texto) => setContrasenia(texto)}
          value={contrasenia}
          placeholderTextColor="#fff"
        />

        <TouchableOpacity style={styles.button} onPress={registro}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCamera} onPress={() => navigation.navigate('Camara')}>
          <Text style={styles.buttonText}>Abrir Cámara</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject, // Asegura que el video ocupe toda la pantalla
  },
  container: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro con transparencia para que el video se vea
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#eddcb7', // Color que mencionaste
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    fontSize: 18,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    backgroundColor: '#eddcb7', // Botones con el color combinado
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginBottom: 10,
    shadowColor: '#000', // Sombra negra
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  buttonCamera: {
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  buttonText: {
    color: '#000', // Texto en color negro
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Inicio;
