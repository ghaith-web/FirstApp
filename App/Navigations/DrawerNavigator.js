import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../Contexts/ThemeContext';
import { useActiveScreen } from './ActiveScreenContext';

import BottomTabNavigator from './BottomTabNavigator';
import { TouchableOpacity } from "react-native";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const { colors, icons,toggleTheme } = useTheme();
    const { activeScreen, setActiveScreen } = useActiveScreen();

    return (
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerIcon: ({ size, color }) => {
            let iconName;
            if (route.name === 'Home') iconName = icons.home;
            else if (route.name === 'Favorites') iconName = icons.favorites;
            else if (route.name === 'Notifications') iconName = icons.notifications;
            return <Icon name={iconName} size={size} color={color} />;
          },
          drawerStyle: {
            backgroundColor: colors.drawerBackground,
          },
          drawerActiveTintColor: colors.activeTab, 
          drawerInactiveTintColor: colors.inactive,
          drawerActiveBackgroundColor: colors.activeItemBackground, 
          drawerItemStyle: {
            backgroundColor: route.name === activeScreen ? colors.activeItemBackground : 'transparent',
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          component={BottomTabNavigator}
          initialParams={{ screen: activeScreen }} 
          listeners={{
            focus: () => setActiveScreen('Home'), 
          }}
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
            drawerInactiveTintColor: colors.inactive,

          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={BottomTabNavigator}
          initialParams={{ screen: 'Favorites' }} 
          listeners={{
            focus: () => setActiveScreen('Favorites'), 
          }}
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
            drawerInactiveTintColor: colors.inactive,

          }}
        />
        <Drawer.Screen
          name="Notifications"
          component={BottomTabNavigator}
          initialParams={{ screen: 'Notifications' }} 
          listeners={{
            focus: () => setActiveScreen('Notifications'), 
          }}
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
            drawerInactiveTintColor: colors.inactive,

          }}
        />
      </Drawer.Navigator>
    );
}