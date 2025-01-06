import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground, Alert } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from '../Config/Config';

const LoginScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (name && password) {
      const userRef = ref(db, 'usuarios/' + name);

      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.password === password) {
            Alert.alert('¡Bienvenido al Juego!','Empieza a matar insectos');
            navigation.navigate('Aplicacion', { username: name });
          } else {
            Alert.alert('Error', 'Contraseña incorrecta.');
          }
        } else {
          Alert.alert('Error', 'Usuario no encontrado.');
        }
      }).catch((error) => {
        Alert.alert('Error', 'Error al iniciar sesión: ' + error.message);
      });
    } else {
      Alert.alert('Advertencia', 'Por favor, ingresa tu nombre de usuario y contraseña.');
    }
  };

  return (
    <ImageBackground
      source={require('../Imagenes/Fondo1.jpeg')} // Reemplaza con la ruta a tu imagen
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#ddd"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ddd"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
          ¿No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text>
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
  loginButton: {
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
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  registerLink: {
    color: '#007BFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
