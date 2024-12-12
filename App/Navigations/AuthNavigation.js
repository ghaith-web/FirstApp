import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../Screens/Auth/Login';
import AppIntro from '../Screens/AppIntro';
const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="AppIntro" component={AppIntro} />
      <AuthStack.Screen name="Login" component={LoginPage} />
    </AuthStack.Navigator>
  );
}
