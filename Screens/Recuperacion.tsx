import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Config/Config';

export default function Restablecer() {
  const [correo, setCorreo] = useState("");

  const restablecer = () => {
    if (correo.trim() === "") {
      Alert.alert("Error", "Por favor, ingrese un correo válido.");
      return;
    }

    sendPasswordResetEmail(auth, correo)
      .then(() => {
        Alert.alert("Correo enviado", "Revisa tu bandeja de entrada.");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/fondoregisttro.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Restablecer contraseña</Text>
        
        <TextInput
          placeholder="Ingresa tu correo"
          placeholderTextColor="#fff"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={setCorreo}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={restablecer}
        >
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
    backgroundColor: '#A8E6CF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#2F4F4F',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

