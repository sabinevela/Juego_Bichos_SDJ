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
import Perfil from '../Screens/Perfil';

import InsectosScreen from '../Screens/InsectosScreen';
import Playerrr from '../Screens/Playerrr';
import CamaraScreen from '../Screens/CamaraScreen';

const Stack = createStackNavigator();

export default function AppNavegador() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PaginaPrincipal" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Aplicacion" component={Aplicacion} />
        <Stack.Screen name="Puntaje" component={Puntaje} />
        <Stack.Screen name="GitHub" component={GitHub} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Restaurar" component={Restablecer} />
        <Stack.Screen name="Camara" component={CamaraScreen} />
        <Stack.Screen name="Insectos" component={InsectosScreen} />
        <Stack.Screen name="Score" component={Playerrr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
