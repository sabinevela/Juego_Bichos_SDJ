import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CamaraScreen() {
  const [image, setImage] = useState<string | null>(null);
  // Subir imagen a Dropbox y obtener el enlace de la imagen
  const subirImagen = async (nombre) => {
    if (!image) {
      Alert.alert('Error', 'Primero selecciona una imagen');
      return;
    }

    const ACCESS_TOKEN = token; // Token válido de Dropbox

    try {
      // Leer el archivo local como Base64
      const fileData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convertir Base64 a binario
      const fileBuffer = Buffer.from(fileData, 'base64'); // Utiliza Buffer importado

      // Detectar el tipo MIME del archivo
      const mimeType = mime.getType(image); // Detectar el tipo MIME basado en la extensión del archivo

      // Crear los argumentos para la API de Dropbox
      const dropboxArg = {
        path: `/${nombre}`, // Ruta donde se guardará el archivo
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
      console.error('Error al subir la imagen:', error.response?.data || error.message);
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
      <Button title="Aceptar" onPress={pickImage} color="#FF6347" />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Subir Imagen"/>
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
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:"center"
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
});
