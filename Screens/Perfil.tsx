import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from '../Config/Config'; // Configuración de Firebase

const Perfil = ({ route, navigation }: { route: any, navigation: any }) => {
  const { username } = route.params; // Recibimos el nombre de usuario desde la navegación
  const [userData, setUserData] = useState<any>(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    const userRef = ref(db, 'usuarios/' + username); // Ruta en Firebase
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Datos del usuario:", data); // Ver los datos del usuario
          setUserData(data); // Guardar los datos en el estado
        } else {
          Alert.alert('Error', 'No se encontraron datos para este usuario.');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Hubo un problema al cargar los datos: ' + error.message);
        console.log("Error en la consulta de Firebase:", error.message); // Ver el error en consola
      });
  }, [username]); // El efecto se ejecuta cada vez que cambia el nombre de usuario

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de {userData.nombre}</Text>
      <Text style={styles.text}>Nombre: {userData.nombre}</Text>
      <Text style={styles.text}>Bio: {userData.bio || 'No tienes una biografía aún.'}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile', { username: userData.nombre })}
      >
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Perfil;
