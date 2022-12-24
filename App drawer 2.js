import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from "react";
import { createAppContainer, DrawerItems,SafeAreaView, contentOptions} from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
//import 'react-native-gesture-handler'
import HomeScreen from "./screens/HomeScreen.js";
import UserScreen from "./screens/UserScreen.js";
import SettingScreen from "./screens/SettingScreen.js";

const AppNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    User: UserScreen,
    Setting: SettingScreen,
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: 'white',
    },
  },
  contentOptions: {
    // add your styling here 
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1,
    },
  },
    drawerBackgroundColor: '#262A2C', // sets background color of drawer
  }
);
  
const Navigator = createAppContainer(AppNavigator);

export default function App() {
  return (
    <Navigator>
      <HomeScreen/>
    </Navigator>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
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
