import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../Screens/Welcome';
import LoginScreen from '../Screens/InicioSesion';
import RegisterScreen from '../Screens/Registro';
import Aplicacion from '../Screens/Aplicacion';
import Playerrr from '../Screens/Playerrr'; 

const Stack = createStackNavigator();

export default function AppNavegador() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Log" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Aplicacion" component={Aplicacion} />
        <Stack.Screen name="Playerrr" component={Playerrr} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
