// BottomTabNavigator.js
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import Home from '../Screens/Home';
import Favorites from '../Screens/Favorites';
import NotificationsPage from '../Screens/Notifications';
import { useTheme } from '../Contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useActiveScreen } from './ActiveScreenContext';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { colors, icons } = useTheme();
  const { activeScreen, setActiveScreen } = useActiveScreen(); 
  const route = useRoute();

  const { screen } = route.params || { screen: activeScreen };

  useEffect(() => {
    if (screen) {
      setActiveScreen(screen);
    }
  }, [screen, setActiveScreen]);

  const handleTabPress = (screenName) => {
    setActiveScreen(screenName);
  };

  return (
    <BottomTab.Navigator
      initialRouteName={activeScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = icons.home;
          else if (route.name === 'Favorites') iconName = icons.favorites;
          else if (route.name === 'Notifications') iconName = icons.notifications;
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: colors.drawerBackground },
        tabBarActiveTintColor: colors.activeItemBackground,
        tabBarInactiveTintColor: colors.inactive,
      })}
      listeners={{
        tabPress: (e) => {
          handleTabPress(e.target.name);
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setActiveScreen('Home'), 
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setActiveScreen('Favorites'),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsPage}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setActiveScreen('Notifications'), 
        }}
      />
    </BottomTab.Navigator>
  );
}