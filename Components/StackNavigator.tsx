import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../Screens/Welcome';
import Aplicacion from '../Screens/Aplicacion';
import LoginScreen from '../Screens/LoginScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Aplicacion" component={Aplicacion} />
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
