import { StyleSheet, Platform, StatusBar, Text, View, Switch, Image, Dimensions, SafeAreaView} from 'react-native';
//import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, TransitionPresets } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Item, HeaderButton, HeaderButtons } from "react-navigation-header-buttons";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './theme/ThemeProvider.js'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {lightColor, darkColor, lightTheme, darkTheme} from './theme/colors.js';
import {useColorScheme} from 'react-native'
  
import HomeScreen from "./screens/HomeScreen.js";
import UserScreen from "./screens/UserScreen.js";
import SettingScreen from "./screens/SettingScreen.js";
import ImageDetailsScreen from "./screens/ImageDetailsScreen.js";
import NewsScreen from "./screens/NewsScreen.js";

import NFT1Screen from "./screens/NFTsScreen/NFT1Screen.js";
import NFT2Screen from "./screens/NFTsScreen/NFT2Screen.js";
import NFT3Screen from "./screens/NFTsScreen/NFT3Screen.js";
import { ZoomIn } from 'react-native-reanimated';

const Stack = createStackNavigator();

const HeaderButtonComponent = (props) => {
    
  return (
  <HeaderButton
      IconComponent={Ionicons}
      iconSize={23}
      {...props}
  />
)};

export default function App() {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    onlyLarge: true,
    showCloseButton: false,
    closeOnTouchOutside: true,
    barStyle: {backgroundColor: isDark ? darkColor.background : lightColor.background},
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const [isDark, setIsDark] = useState(true);

  const animationConfig = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: animationConfig,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            // {
            //   translateX: current.progress.interpolate({
            //     inputRange: [0, 1],
            //     outputRange: [layouts.screen.width, 0],
            //   }),
            // },
            {
              scale: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
          };
        },
      }

  return (
    <NavigationContainer theme = {isDark ? darkTheme: lightTheme}>

      <Stack.Navigator screenOptions={{
      animationEnabled:true,
      headerStyle: {
        backgroundColor: isDark ? darkColor.background : lightColor.background,
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FFF",
      },
      headerTintColor: "#FFF",
    }}>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={(props) => ({
          headerTitle: null,
          headerLeft: () => (
            <View style={{flexDirection:'row'}} >
            <Image
             style={{width: 100, height: 50 , marginLeft:15}}
             //source={{uri:"https://source.unsplash.com/user/c_v_r/100x100"}}
             source={require('./assets/brand.png')}
            />
            </View>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                <Switch value = {isDark} onValueChange = {val => setIsDark(val)} />
                  <Item
                  title="Setting"
                  iconName="reorder-three-sharp"
                  onPress={openPanel}
                  color = {isDark ? darkColor.text : lightColor.text}
                  //onPress={() => props.navigation.navigate("Image")}
                  />
              </HeaderButtons>
              ),
          })}/>
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Image" component={ImageDetailsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="NFT1" component={NFT1Screen} options={{headerShown:false,  ...TransitionPresets.SlideFromRightIOS}}/>
        <Stack.Screen name="NFT2" component={NFT2Screen} options={{headerShown:false, ...MyTransition}}/>
        <Stack.Screen name="NFT3" component={NFT3Screen} options={{headerShown:false, ...TransitionPresets.ModalSlideFromBottomIOS}}/>

      </Stack.Navigator>

      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <UserScreen />

      </SwipeablePanel>
      
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const SwipeUp = () => {
  return (
  <SwipeablePanel {...panelProps} isActive={isPanelActive}>
    <UserScreen />
  </SwipeablePanel>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
