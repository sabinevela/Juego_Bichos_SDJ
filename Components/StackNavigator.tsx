import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../Screens/Welcome';
import LoginScreen from '../Screens/InicioSesion';
import RegisterScreen from '../Screens/Registro';
import Aplicacion from '../Screens/Aplicacion';
import Puntaje from '../Screens/Playerrr';
import PaginaPrincipal from '../Screens/PaginaPrincipal';
import GitHub from '../Screens/GitHub';
import Restablecer from '../Screens/Recuperacion';

const Stack = createStackNavigator();

export default function AppNavegador() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PaginaPrincipal">
      <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Log" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Aplicacion" component={Aplicacion} />
        <Stack.Screen name="Playerrr" component={Puntaje} /> 
        <Stack.Screen name="GitHub" component={GitHub}/>
        <Stack.Screen name="Restablecer" component={Restablecer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
