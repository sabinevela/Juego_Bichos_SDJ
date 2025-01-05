import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from '../Config/Config';

const LoginScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');  // Cambié 'email' por 'password'

  const handleLogin = () => {
    if (name && password) {  // Verifica que el nombre de usuario y la contraseña estén completos
      const userRef = ref(db, 'usuarios/' + name);  // Accede al nodo de usuario en Firebase

      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.password === password) {  // Verifica que la contraseña coincida
            alert('Login exitoso');
            // Navega a la pantalla "Aplicacion" y pasa el username
            navigation.navigate('Aplicacion', { username: name });
          } else {
            alert('Contraseña incorrecta');
          }
        } else {
          alert('Usuario no encontrado');
        }
      }).catch((error) => {
        alert('Error al iniciar sesión: ' + error.message);
      });
    } else {
      alert('Por favor, ingresa tu nombre de usuario y contraseña.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry  // Esto oculta la contraseña
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
        ¿No tienes una cuenta? Regístrate
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  registerText: {
    marginTop: 15,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
