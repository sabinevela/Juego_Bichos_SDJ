import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';

type LoginProps = {
  navigation: any;
};

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');

  const handleLogin = () => {
    if (username.trim() === '') {
      Alert.alert('Por favor, ingrese un nombre de usuario.');
      return;
    }
    navigation.navigate('Aplicacion', { username });
  };

  return (
    <ImageBackground
      source={require('../assets/bichosfondos.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>¡Registrate!</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#fff"
          value={username}
          onChangeText={setUsername}
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Jugar</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Desarrollado por:</Text>
          <Text style={styles.footerText}>Sabine Vela | Dany Fernández | Joel Romero</Text>
          <Text style={styles.footerText}>Aplicaciones Móviles | Desarrollo de Software</Text>
        </View>
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
    backgroundColor: '#388137',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginBottom: 30,
    shadowColor: '#ff4081',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LoginScreen;

