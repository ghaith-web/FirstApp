import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';

import Home from './App/Screens/Home';
import Favorites from './App/Screens/Favorites';
import { ThemeProvider, useTheme } from './App/Contexts/ThemeContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = ({ items, setItems }) => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        options={{
          headerShown: false,
        }}
      >
        {() => <Home items={items} setItems={setItems} />} 
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const FavoritesStack = ({ items, setItems }) => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Favorites" 
        options={{
          headerShown: false,
        }}
      >
        {() => <Favorites items={items} setItems={setItems} />} 
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const App = () => {
  const [items, setItems] = useState([]);
  const { colors, icons, toggleTheme } = useTheme();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerIcon: ({ size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = icons.home;
            } else if (route.name === 'Favorites') {
              iconName = icons.favorites;
            }

            return <Icon name={iconName} size={size} color={colors.iconColor} />;
          },
          drawerStyle: {
            backgroundColor: colors.drawerBackground,
          },
        })}
      >
        <Drawer.Screen 
          name="Home" 
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={toggleTheme}>
                <Icon 
                  name={icons.themeToggle} 
                  size={24} 
                  color={colors.iconColor}
                  style={{ marginLeft: 15, marginRight: 15 }} 
                />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: colors.headerBackground,
            },
            headerTintColor: colors.text,
          }}
        >
          {() => <HomeStack items={items} setItems={setItems} />} 
        </Drawer.Screen>
        <Drawer.Screen 
          name="Favorites" 
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={toggleTheme}>
                <Icon 
                  name={icons.themeToggle} 
                  size={24} 
                  color={colors.iconColor}
                  style={{ marginLeft: 15, marginRight: 15 }} 
                />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: colors.headerBackground,
            },
            headerTintColor: colors.text,
          }}
        >
          {() => <FavoritesStack items={items} setItems={setItems} />} 
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
