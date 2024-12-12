// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../Contexts/ThemeContext';
import BottomTabNavigator from './BottomTabNavigator'; // Import BottomTabNavigator for reuse
import Home from '../Screens/Home'; // Example screen
import Favorites from '../Screens/Favorites'; // Example screen
import NotificationsPage from '../Screens/Notifications'; // Example screen

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { colors, icons } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ size, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = icons.home;
          } else if (route.name === 'Favorites') {
            iconName = icons.favorites;
          } else if (route.name === 'Notifications') {
            iconName = icons.notifications;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        drawerStyle: {
          backgroundColor: colors.drawerBackground,
        },
      })}
    >
      {/* Drawer has the same screens as BottomTabs */}
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsPage}
        options={{ title: 'Notifications' }}
      />

   
    </Drawer.Navigator>
  );
}
