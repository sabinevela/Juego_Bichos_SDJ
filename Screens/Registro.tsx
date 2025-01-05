import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../Config/Config';
// Asegúrate de importar tu archivo de configuración

const RegisterScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('');  // Cambié 'name' por 'userName'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Estado para la contraseña

  const handleRegister = () => {
    if (userName && email && password) {  // Verifica que todos los campos estén llenos
      // Crear una referencia a la base de datos en Firebase para el nuevo usuario
      const userRef = ref(db, 'usuarios/' + userName);  // Cambié 'name' por 'userName'

      // Guardar los datos en Firebase
      set(userRef, {
        userName: userName,  // Cambié 'nombre' por 'userName'
        email: email,
        password: password,  // Añadir la contraseña al registro
      }).then(() => {
        alert('Usuario registrado exitosamente');
        navigation.navigate('Log');  // Redirige al login después de registrar
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
        placeholder="User Name"  // Cambié 'Nombre' por 'User Name'
        value={userName}  // Cambié 'name' por 'userName'
        onChangeText={setUserName}  // Cambié 'setName' por 'setUserName'
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
        secureTextEntry // Esto oculta la contraseña
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
