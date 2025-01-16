import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Alert, TouchableOpacity, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { token } from '../Components/Secrets';
import { Buffer } from 'buffer';

export default function CamaraScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const subirImagen = async (nombre: any) => {
    if (!image) {
      Alert.alert('error', 'primero selecciona una imagen');
      return;
    }

    const accessToken = token;

    try {
      const fileData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileBuffer = Buffer.from(fileData, 'base64');

      const dropboxArg = {
        path: `/avatars/${nombre}`,
        mode: 'add',
        autorename: true,
        mute: false,
      };

      const result = await axios.post(
        'https://content.dropboxapi.com/2/files/upload',
        fileBuffer,
        {
          headers: {
            authorization: `bearer ${accessToken}`,
            'dropbox-api-arg': JSON.stringify(dropboxArg),
            'content-type': 'application/octet-stream',
          },
        }
      );

      const filePath = result.data.path_display;

      const sharedLinkResult = await axios.post(
        'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
        { path: filePath },
        {
          headers: {
            authorization: `bearer ${accessToken}`,
          },
        }
      );

      const downloadUrl = sharedLinkResult.data.url.replace('?dl=0', '?raw=1');

      setImageUrl(downloadUrl);
      Alert.alert('éxito', 'imagen subida correctamente a dropbox');
    } catch (error) {
      console.error('error al subir la imagen:', error.response?.data || error.message);
      Alert.alert('error', 'hubo un problema al subir la imagen');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const descargarImagen = () => {
    if (imageUrl) {
      Linking.openURL(imageUrl);
    } else {
      Alert.alert('error', 'no hay enlace disponible');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>¿deseas conceder los permisos para activar la cámara?</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📸 tomar foto</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {image && (
        <TouchableOpacity style={styles.button} onPress={() => subirImagen('imagen.jpg')}>
          <Text style={styles.buttonText}>📤 subir imagen</Text>
        </TouchableOpacity>
      )}

      {imageUrl !== "" && (
        <View>
          <Text style={styles.urlText}>enlace generado:</Text>
          <TouchableOpacity style={styles.button} onPress={descargarImagen}>
            <Text style={styles.buttonText}>🔗 descargar imagen</Text>
          </TouchableOpacity>
        </View>
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
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff6347',
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
    borderColor: '#ff6347',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  urlText: {
    marginTop: 15,
    color: '#ff6347',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
