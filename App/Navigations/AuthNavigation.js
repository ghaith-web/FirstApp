import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../Screens/Auth/Login';
import AppIntro from '../Screens/AppIntro';
import RegisterScreen from '../Screens/Auth/Register';
const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="AppIntro" component={AppIntro} />
      <AuthStack.Screen name="Login" component={LoginPage} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />

    </AuthStack.Navigator>
  );
}
