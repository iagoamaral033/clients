import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../pages/Home';
import { addClient } from '../pages/addCliente';
import { searchClient } from '../pages/searchClient';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Bem Vindo",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="addClient"
          component={addClient}
          options={{
            headerTitle: 'Cadastrar Cliente'
          }}
        />
        <Stack.Screen
          name="searchClient"
          component={searchClient}
          options={{
            headerTitle: 'Procurar Cliente'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}