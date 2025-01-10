import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

type PaginaPrincipalProps = {
  navigation: any;
};

const insectos = [
  { nombre: 'Luciernaga', imagen: require('../Imagenes/Insecto1.jpeg') },
  { nombre: 'Mosca', imagen: require('../Imagenes/Insecto2.jpeg') },
  { nombre: 'Abeja', imagen: require('../Imagenes/Insecto3.jpeg') },
  { nombre: 'Mariposa', imagen: require('../Imagenes/Insecto4.jpeg') },
];

const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Imagenes/paginaprincipal.jpg')}
        style={styles.backgroundImage}
      />

      <View style={styles.insectosContainer}>
        <Text style={styles.insectosTitle}>Lista de Insectos:</Text>
        <FlatList
          data={insectos}
          renderItem={({ item }) => (
            <View style={styles.insectoItemContainer}>
              <Image source={item.imagen} style={styles.insectoImage} />
              <Text style={styles.insectoName}>{item.nombre}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>BIENVENIDO</Text>
        
        <TouchableOpacity
          style={styles.botonEmpezar}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.buttonText}>Iniciar Juego</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonEmpezar}
          onPress={() => navigation.navigate('GitHub')}
        >

          

          
          <Text style={styles.buttonText}>GitHub Integrantes</Text>

          
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonEmpezar}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.7,
    zIndex: 0,
  },
  insectosContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  insectosTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', 
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'black', 
    textShadowOffset: { width: 0, height: 4 }, 
    textShadowRadius: 5,
  },
  
  insectoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e8f5e9', // Verde claro para contraste
    borderRadius: 10,
  },
  insectoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  insectoName: {
    fontSize: 18,
    color: 'black', 
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#66bb6a', // Verde más suave para el título
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
  },
  botonEmpezar: {
    backgroundColor:"#66bb6a", // Verde claro para botones
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: '#ff4081',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default PaginaPrincipal;


