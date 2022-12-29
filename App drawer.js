import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from "react";
import { createAppContainer } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomDrawer from "./components/BottomDrawer.tsx";

// import Screens
import HomeScreen from "./screens/HomeScreen.js";
import UserScreen from "./screens/UserScreen.js";
import SettingScreen from "./screens/SettingScreen.js";

global.__reanimatedWorkletInit = () => {};

const AppNavigator = createDrawerNavigator();


const Drawer = createDrawerNavigator();

function Component(props) {
  return (
    <View>
      <Text mt="12" fontSize="18">
        This is {props.route.name} page.
      </Text>
    </View>
  );
}

const getIcon = (screenName) => {
  switch (screenName) {
    case "Inbox":
      return "email";
    case "Outbox":
      return "send";
    case "Favorites":
      return "heart";
    case "Archive":
      return "archive";
    case "Trash":
      return "trash-can";
    case "Spam":
      return "alert-circle";
    default:
      return undefined;
  }
};

function DrawerNavigation() {
  return (
    <View safeArea flex={1}>
      {/* <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Inbox" component={Component} />
        <Drawer.Screen name="Outbox" component={Component} />
        <Drawer.Screen name="Favorites" component={Component} />
        <Drawer.Screen name="Archive" component={Component} />
        <Drawer.Screen name="Trash" component={Component} />
        <Drawer.Screen name="Spam" component={Component} />
      </Drawer.Navigator> */}
      <Drawer.Navigator initialRouteName="Setting"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
          },
        }}
    >
        <Drawer.Screen name="Home" component={UserScreen}  options={{presentation: 'transparentModal', cardOverlayEnabled: true}}/>
        <Drawer.Screen name="Notifications" component={SettingScreen}  options={{presentation: 'transparentModal', cardOverlayEnabled: true}}/>
      </Drawer.Navigator>
    </View>
  );
}
  

export default function App() {
  return (
    <NavigationContainer>
        {/* <BottomDrawer /> */}
        <DrawerNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
