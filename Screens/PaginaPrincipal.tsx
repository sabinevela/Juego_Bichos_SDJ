//rnfs
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

type PaginaPrincipalProps = {
  navigation: any;
};

const insectos = [
  { nombre: 'Luciernaga', imagen: require('../Imagenes/Insecto1.jpeg') },
  { nombre: 'Abeja', imagen: require('../Imagenes/Insecto2.jpeg') },
  { nombre: 'Mariposa', imagen: require('../Imagenes/Insecto3.jpeg') },
  { nombre: 'Mosca', imagen: require('../Imagenes/Insecto4.jpeg') },
  
];

const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Imagenes/FondoEcenario.jpeg')}
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
        <Text style={styles.title}>Bienvenido</Text>
        <TouchableOpacity 
          style={styles.botonEmpezar} 
          onPress={() => navigation.navigate('Welcome')} 
        >
          <Text style={styles.buttonText}>Iniciar Juego</Text>
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
    color: '#9ae084',
    marginBottom: 10,
    textAlign: 'center',
  },
  insectoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  insectoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  insectoName: {
    fontSize: 18,
    color: '#000',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#9ae084',
    marginBottom: 200,
    textAlign: 'center',
    letterSpacing: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
  },
  botonEmpezar: {
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
    color: '#9ae084',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textTransform: 'uppercase',
    textShadowRadius: 15
  },
});

export default PaginaPrincipal;
