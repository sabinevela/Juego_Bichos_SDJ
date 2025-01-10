import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../Config/Config';

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

        // guarda el userName en Firebase Realtime Database
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
    <ImageBackground
      source={require('../assets/bichosfondos.jpg')}
      style={styles.background}
    >
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#578c40',
    marginBottom: 30,
    textAlign: 'center',
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
    backgroundColor: '#388137',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Inicio;
