import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { db } from '../Config/Config'; // Asegúrate de importar correctamente la configuración de Firebase

const Perfil = ({ navigation }: { navigation: any }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Obtener los datos del usuario desde Firebase (base de datos)
        const userRef = ref(db, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log('No se encontró el usuario en la base de datos');
          }
        }).catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
      } else {
        console.log('No hay usuario autenticado');
      }
    });

    // Cleanup al desmontar el componente
    return () => unsubscribe();
  }, []);

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../Imagenes/Fondo4.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userDescription}>{userData.description}</Text>
        
        {/* Información adicional */}
        <Text style={styles.userInfoLabel}>Correo Electrónico:</Text>
        <Text style={styles.userInfoValue}>{userData.email}</Text>

        {/* Botón de edición */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>

        {/* Botón para regresar al inicio */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('PaginaPrincipal')}
        >
          <Text style={styles.backButtonText}>Regresar al Inicio</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro para mejorar legibilidad
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  userDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  userInfoLabel: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  userInfoValue: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Perfil;
