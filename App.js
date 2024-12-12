import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";

import { ThemeProvider, useTheme } from "./App/Contexts/ThemeContext";
import { ActiveScreenProvider } from './App/Navigations/ActiveScreenContext'; // Import ActiveScreenProvider

import store from "./App/Redux/store";
import Navigator from "./App/Navigations/Navigator";


export default () => (
<Provider store={store}>
      <ThemeProvider>
        <ActiveScreenProvider>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </ActiveScreenProvider>
      </ThemeProvider>
</Provider>
);
