import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

const Perfil = ({ navigation }: { navigation: any }) => {
  // Datos estáticos del usuario
  const userData = {
    name: "Juan Pérez",
    description: "Desarrollador de software apasionado por la tecnología y el diseño.",
    profileImage: "https://example.com/your-profile-image.jpg", // Cambia la URL a la imagen del perfil
  
  };

  return (
    <ImageBackground
      source={require('../Imagenes/Fondo4.jpeg')} // Fondo del perfil
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Foto de perfil */}
        <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
        
        {/* Nombre del usuario */}
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userDescription}>{userData.description}</Text>

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
});

export default Perfil;
