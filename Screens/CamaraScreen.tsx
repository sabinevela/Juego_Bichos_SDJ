import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { token } from '../Config/Secrets';
import { Buffer } from 'buffer';

export default function CamaraScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [ImageUrl, setImageUrl] = useState("");

  // Subir imagen a Dropbox y obtener el enlace de la foto
  const subirImagen = async () => {
    if (!image) {
      Alert.alert('Error', 'Primero selecciona una imagen');
      return;
    }

    const ACCESS_TOKEN = token; // Token válido de Dropbox

    try {
      // Generar un nombre único usando timestamp y un identificador aleatorio
      const uniqueName = `imagen_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;

      // Leer el archivo local como Base64
      const fileData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convertir Base64 a binario
      const fileBuffer = Buffer.from(fileData, 'base64');

      // Configuración para la subida a Dropbox
      const dropboxArg = {
        path: `/carpetaimg/${uniqueName}`, // Nombre único
        mode: 'add',
        autorename: true,
        mute: false,
      };

      // Subir el archivo binario a Dropbox
      const result = await axios.post(
        'https://content.dropboxapi.com/2/files/upload',
        fileBuffer,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Dropbox-API-Arg': JSON.stringify(dropboxArg),
            'Content-Type': 'application/octet-stream',
          },
        }
      );

      console.log('Dropbox response:', result.data);

      // Después de la subida, obtener la URL de la imagen
      const filePath = result.data.path_display;

      // Solicitar el enlace de descarga del archivo
      const sharedLinkResult = await axios.post(
        'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
        {
          path: filePath, // Ruta del archivo
          settings: {
            requested_visibility: 'public', // Hacer el enlace público
          },
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      // Obtener la URL del enlace compartido
      const downloadUrl = sharedLinkResult.data.url.replace('?dl=0', '?raw=1'); // Hacer que la URL sea de descarga directa

      console.log('URL de descarga:', downloadUrl);
      setImageUrl(downloadUrl); // Guardar la URL de la imagen subida

      Alert.alert('Éxito', 'Imagen subida correctamente a Dropbox');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al subir la imagen');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>¿Deseas conceder los permisos para activar la cámara?</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📸 Tomar Foto</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {image && (
        <TouchableOpacity style={styles.button} onPress={subirImagen}>
          <Text style={styles.buttonText}>📤 Subir Imagen</Text>
        </TouchableOpacity>
      )}

      {ImageUrl !== "" && (
        <Text style={styles.urlText}>📌 {ImageUrl}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  header: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#FF6347',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  urlText: {
    marginTop: 15,
    color: '#FF6347',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

