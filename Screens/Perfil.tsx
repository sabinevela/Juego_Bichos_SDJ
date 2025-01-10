import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

export default function Perfil() {
  const [userData, setUserData] = useState<any>(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      // Obtener datos del usuario desde Firebase Realtime Database
      const db = getDatabase();
      const userRef = ref(db, `usuarios/${user.uid}`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData(data); // Setear datos en el estado
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [user]);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/bichosfondos.jpg')} // Fondo del perfil
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={{ uri: 'https://example.com/default-profile-pic.png' }} style={styles.profileImage} />
        <Text style={styles.userName}>{userData.userName}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
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
  userEmail: {
    fontSize: 18,
    color: '#fff',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
});
