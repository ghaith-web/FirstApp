import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { Button, Text } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { useTheme } from "../../Contexts/ThemeContext";
import {Platform } from "react-native";

import styles from "./style";


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


const NotificationsPage = () => {
  const { colors } = useTheme();

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    };
    requestPermissions();
    setupNotifications();
  }, []);

  const sendImmediateNotification = async () => {
    Alert.alert(
      "Notification Sent",
      "A local notification has been triggered.",
      [{ text: "OK" }]
    );

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Immediate Notification",
        body: "This notification was sent immediately.",
        sound: true,
      },
      trigger: null, // Send immediately
    });
  };

  const sendDelayedNotification = async () => {
    Alert.alert(
      "Notification Scheduled",
      "A notification will be sent after 10 seconds.",
      [{ text: "OK" }]
    );

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Delayed Notification",
        body: "This notification was sent after a 10-second delay.",
        sound: true,
      },
      trigger: { seconds: 10 },
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.headerBackground }]}
    >
      <Button
        mode="contained"
        onPress={sendImmediateNotification}
        style={[
            styles.button,
            colors.primary
        ]}
      >
        Send Immediate Notification
      </Button>
    </View>
  );
};

export default NotificationsPage;
