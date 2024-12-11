import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Import bottom tab navigator

import { Provider } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, Platform } from "react-native";
import * as Notifications from "expo-notifications";

import Home from "./App/Screens/Home";
import Favorites from "./App/Screens/Favorites";
import NotificationsPage from "./App/Screens/Notifications"; // New Page
import { ThemeProvider, useTheme } from "./App/Contexts/ThemeContext";
import store from "./App/Redux/store";
import AppIntro from "./App/Screens/AppIntro";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Create Bottom Tab Navigator

const setupNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // Request permissions for notifications
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to show notifications is required!");
    }
  };

  if (Platform.OS === "ios" || Platform.OS === "android") {
    requestPermissions();
  }
};

const HomeStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      >
        {() => <Home />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        options={{
          headerShown: false,
        }}
      >
        {() => <Favorites />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const NotificationsStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        options={{
          headerShown: false,
        }}
      >
        {() => <NotificationsPage />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  const { colors, icons } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HomeTab") {
            iconName = icons.home;
          } else if (route.name === "FavoritesTab") {
            iconName = icons.favorites;
          } else if (route.name === "NotificationsTab") {
            iconName = icons.notifications;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: colors.tabBackground },
        tabBarActiveTintColor: colors.activeTab,
        tabBarInactiveTintColor: colors.inactiveTab,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home", headerShown: false }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStack}
        options={{ title: "Favorites", headerShown: false }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsStack}
        options={{ title: "Notifications", headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const { colors, icons, toggleTheme } = useTheme();

  useEffect(() => {
    setupNotifications(); // Initialize notifications setup
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerIcon: ({ size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = icons.home;
            } else if (route.name === "Favorites") {
              iconName = icons.favorites;
            } else if (route.name === "Notifications") {
              iconName = icons.notifications;
            }
            return (
              <Icon name={iconName} size={size} color={colors.iconColor} />
            );
          },
          drawerStyle: {
            backgroundColor: colors.drawerBackground,
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          component={BottomTabs}
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
            drawerInactiveTintColor: colors.inactive, // Color when inactive (red in this case)
          }}
        />
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
          {() => <FavoritesStack />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Notifications"
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
          {() => <NotificationsStack />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <Provider store={store}>
    <ThemeProvider>
      <AppIntro />
    </ThemeProvider>
  </Provider>
);
