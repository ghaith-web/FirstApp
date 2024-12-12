import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import Favorites from "../Screens/Favorites";
import NotificationsPage from "../Screens/Notifications";
import BottomTabNavigator from "./BottomTabNavigator";
import DrawerNavigator from "./DrawerNavigator";

const MainStack = createStackNavigator();

export default function AppNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
         <MainStack.Screen name="Home" component={DrawerNavigator} />

         <MainStack.Screen name="Favorites" component={Favorites} />
         <MainStack.Screen name="Notifications" component={NotificationsPage} />

         </MainStack.Navigator>
  );
}
