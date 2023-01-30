import React, { useState, useEffect} from "react";
import { StyleSheet, StatusBar, TouchableOpacity, Animated, Text, View, TextInput, Button, Dimensions, Image } from "react-native";
import { Ionicons, EvilIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MyNFTsScreen from "./MyNFTsScreen.js";
import NewsScreen from "./NewsScreen.js";
import ExploreScreen from "./ExploreScreen.js";
import UserScreen from "./UserScreen.js";
import LoginScreen from "./LoginScreen.js";
import RegisterScreen from "./RegisterScreen.js";

import { useTheme } from '@react-navigation/native';

import NFT1Screen from './NFTsScreen/NFT1Screen.js'

import { createStackNavigator } from '@react-navigation/stack';
import { color, ColorSpace } from "react-native-reanimated";

const Stack = createStackNavigator();

const HomeScreen = (props) => {

    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
      { key: 'explore', title: 'Explore' },
      { key: 'myNFTs', title: 'My NFTs' },
      { key: 'news', title: 'News' },
      { key: 'user', title: 'User' },
      // { key: 'login', title: 'Login' },
      // { key: 'register', title: 'Register' },
    ]);
    const [sounds, setSounds] = React.useState(Array(routes.length).fill(0))
    // const renderScene = SceneMap({
    //     explore: ExploreScreen,
    //     myNFTs: MyNFTsScreen,
    //     news: NewsScreen,
    //     user: UserScreen
    //   });

      const renderScene = ({ route }) => {
        switch (route.key) {
          case 'explore':
            return <ExploreScreen enableSound={sounds[0]} />;
          case 'myNFTs':
            return <MyNFTsScreen enableSound={sounds[1]}/>;
          case 'news':
            return <NewsScreen enableSound={sounds[2]}/>;
          case 'user':
            return <UserScreen enableSound={sounds[3]}/>;
          // case 'login':
          //   return <LoginScreen enableSound={sounds[3]}/>;
          // case 'register':
          //   return <RegisterScreen enableSound={sounds[3]}/>;
          default:
            return null;
        }
      };
    const { colors } = useTheme();
    const IconList = ['coins', 'award', 'elementor','user-alt']

    const renderTabBar = (props) => {
      const inputRange = props.navigationState.routes.map((x, i) => i);

      return (
        <View style={[styles.tabBar2, {backgroundColor: colors.background_contrast}]}>
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex) =>
                inputIndex === i ? 1 : 0.5
              ),
            });

            const color = i === index ? colors.text_contrast : colors.textFade_contrast

            return (
              <TouchableOpacity
                style={styles.tabItem}
                // onPress={() => {setIndex(i); setSounds(Array(routes.length).fill(0).map((elem, index)=> index==i));}}>
                onPress={() => {setIndex(i)}}>
                <FontAwesome5 name={IconList[i]} size={24} color={color}/>
                <Animated.Text style={[styles.tabBarText,{ opacity, color:colors.text_contrast }]}>{route.title}</Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };

    const LazyPlaceholder = ({ route }) => (
      <View style={styles.scene}>
        <Text>Loading {route.title}…</Text>
      </View>
    );

    const renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;


    return (
          <TabView
              lazy={true}
              renderLazyPlaceholder={renderLazyPlaceholder}
             navigationState={{ index, routes }}
             renderScene={renderScene}
             onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            style={[styles.container, {color: colors.text}]}
            tabBarPosition='bottom'
            swipeEnabled={false}
            // renderTabBar={props => <TabBar {...props}
            //   style={[styles.tabBar, {backgroundColor: colors.background_contrast}]}
            //   activeColor={colors.text_contrast}
            //   inactiveColor={colors.textFade_contrast}
            //   indicatorStyle={{backgroundColor: 'transparent'}}//{{backgroundColor: colors.underline}}
            //   ><Text> HI</Text></TabBar>}
            renderTabBar={renderTabBar}
          />

    );
};



const styles = StyleSheet.create({
    tabBar: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    container: {
      flex: 1,
    },
    tabBar2: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      flexDirection: 'row',
      position:'absolute',
      bottom:0,
      width: '100%'
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 5,
    },
    tabBarText: {
      fontSize:10,
    },
});

export default HomeScreen;
