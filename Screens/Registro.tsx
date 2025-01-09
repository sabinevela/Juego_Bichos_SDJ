import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet,ImageBackground,TouchableOpacity,Alert,} from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../Config/Config';

const RegisterScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {   if (userName && email && password) {
      const userRef = ref(db, 'usuarios/' + userName);

      set(userRef, {
        userName: userName,
        email: email,
        password: password,
      })
        .then(() => {
          Alert.alert('¡Éxito!', 'Usuario registrado exitosamente');
          navigation.navigate('Log');
        })
        .catch((error) => {
          Alert.alert('Error', 'Error al registrar usuario: ' + error.message);
        });
    } else {
      Alert.alert('Error', 'Por favor, ingresa todos los campos.');
    }
  };

  return (
    <ImageBackground
      source={require('../Imagenes/Fondo1.jpeg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#ddd"
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#ddd"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ddd"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Log')}>
          ¿Ya tienes una cuenta?{' '}
          <Text style={styles.loginLinkText}>Inicia sesión</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: 16,
    color: '#fff',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#007BFF', 
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginLink: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  loginLinkText: {
    color: '#007BFF', 
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
