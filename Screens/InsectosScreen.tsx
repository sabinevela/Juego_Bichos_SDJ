import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

type InsectosScreenProps = {
  navigation: any;
};

const insectos = [
  { nombre: 'Luciernaga', imagen: require('../Imagenes/Insecto1.jpeg') },
  { nombre: 'Mosca', imagen: require('../Imagenes/Insecto2.jpeg') },
  { nombre: 'Abeja', imagen: require('../Imagenes/Insecto3.jpeg') },
  { nombre: 'Mariposa', imagen: require('../Imagenes/Insecto4.jpeg') },
];

const InsectosScreen: React.FC<InsectosScreenProps> = ({ navigation }) => {
  const renderItem = ({ item }: any) => (
    <View style={styles.insectoItemContainer}>
      <View style={styles.insectoImageWrapper}>
        <Image source={item.imagen} style={styles.insectoImage} />
      </View>
      <Text style={styles.insectoName}>{item.nombre}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../Imagenes/paginaprincipal.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <FlatList
        data={insectos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Lista de Insectos</Text>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.botonEmpezar}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
    zIndex: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 30,
  },
  headerContainer: {
    paddingTop: 30,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 3,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
  },
  insectoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#c8e6c9',
    borderRadius: 15,
    shadowColor: '#388e3c',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: '90%',
    height: 100,
  },
  insectoImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#388e3c',
  },
  insectoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  insectoName: {
    fontSize: 22,
    color: '#1b5e20',
    fontWeight: 'bold',
    flex: 1,
  },
  botonEmpezar: {
    backgroundColor: "#388e3c",
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: '#2e7d32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#e8f5e9',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default InsectosScreen;



















