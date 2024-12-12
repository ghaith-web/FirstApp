// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home'; // Example screen
import Favorites from '../Screens/Favorites'; // Example screen
import NotificationsPage from '../Screens/Notifications'; // Example screen
import { useTheme } from '../Contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { colors, icons } = useTheme();

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
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
        tabBarStyle: { backgroundColor: colors.tabBackground },
        tabBarActiveTintColor: colors.activeTab,
        tabBarInactiveTintColor: colors.inactiveTab,
      })}
    >
      {/* Bottom Tabs with the same screens */}
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsPage}
        options={{ title: 'Notifications' }}
      />
    </BottomTab.Navigator>
  );
}
