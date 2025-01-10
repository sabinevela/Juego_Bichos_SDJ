import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Config/Config';


export default function Restablecer() {
    const [correo, setcorreo] = useState("")

    function restablecer(){
        sendPasswordResetEmail(auth, correo)
  .then(() => {

    Alert.alert("Correo enviado")
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert(errorMessage)
  });
        
    }
  return (
    <View>
      <Text>Restablecer</Text>
      <TextInput
      placeholder='ingresar correo'
      style={styles.input}
      keyboardType='email-address'
      onChangeText={(texto) => setcorreo(texto)}/>
      <Button title='Enviar' onPress={()=>restablecer()}/>
    </View>
  )
}

const styles = StyleSheet.create({

    input: {
        fontSize: 35,
        height: 55,
        backgroundColor: "#6666",
        borderRadius: 20,
        margin: 10,
        paddingHorizontal: 20,
        width: "85%"
    },
})