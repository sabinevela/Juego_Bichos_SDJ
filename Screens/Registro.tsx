import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../Config/Config';

const RegisterScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (userName && email && password) {
      const userRef = ref(db, 'usuarios/' + userName); 
      set(userRef, {
        userName: userName,
        email: email,
        password: password,
      }).then(() => {
        alert('Usuario registrado exitosamente');
        navigation.navigate('Log');
      }).catch((error) => {
        alert('Error al registrar usuario: ' + error.message);
      });
    } else {
      alert('Por favor, ingresa un nombre de usuario, correo electrónico y contraseña.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrar" onPress={handleRegister} />
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
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

export default RegisterScreen;
