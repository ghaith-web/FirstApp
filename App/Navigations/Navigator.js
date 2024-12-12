// Navigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigation'; // Contains both Drawer and Bottom Tabs
import AuthNavigator from './AuthNavigation';
import { useSelector } from 'react-redux';

const RootStack = createStackNavigator();

export default function Navigator() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Show AppNavigator if logged in, otherwise show AuthNavigator */}
        <RootStack.Screen
          name="App"
          component={isLoggedIn ? AppNavigator : AuthNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
