import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './App/Screens/Home';
import Favorites from './App/Screens/Favorites';

const Tab = createBottomTabNavigator();

export default function App() {
  const [items, setItems] = useState([]); 

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'star' : 'star-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
  
        <Tab.Screen name="Home">
          {() => <Home items={items} setItems={setItems} />} 
        </Tab.Screen>
        <Tab.Screen name="Favorites">
          {() => <Favorites items={items} setItems={setItems} />} 
        </Tab.Screen>
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
