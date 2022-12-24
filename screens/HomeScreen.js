import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Button, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { Item, HeaderButton, HeaderButtons } from "react-navigation-header-buttons";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MyNFTsScreen from "./MyNFTsScreen.js";
import NewsScreen from "./NewsScreen.js";
import ExploreScreen from "./ExploreScreen.js";
import UserScreen from "./UserScreen.js";

import { useTheme } from '@react-navigation/native';

import NFT1Screen from './NFTsScreen/NFT1Screen.js'

import { createStackNavigator } from '@react-navigation/stack';
import { color, ColorSpace } from "react-native-reanimated";

const Stack = createStackNavigator();

const HomeScreen = (props) => {
    
    const [index, setIndex] = React.useState(2);
    const [routes] = React.useState([
      { key: 'explore', title: 'Explore' },
      { key: 'myNFTs', title: 'My NFTs' },
      { key: 'news', title: 'News' },
    ]);

    const renderScene = SceneMap({
        explore: ExploreScreen,
        myNFTs: MyNFTsScreen,
        news: NewsScreen
      });

    const { colors } = useTheme();

    return (
          <TabView
             navigationState={{ index, routes }}
             renderScene={renderScene}
             onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            style={[styles.container, {color: colors.text}]}
            
            renderTabBar={props => <TabBar {...props} 
              style={{backgroundColor: colors.background}}
              activeColor={colors.text}
              inactiveColor={colors.textFade}
              indicatorStyle={{backgroundColor: colors.underline}} 
              />}
          />

    );
};

const styles = StyleSheet.create({
   tinyLogo: {
      width: 50,
      height: 50,
    },
   logo: {
      width: 100,
      height: 80,
      marginLeft: 20,
      resizeMode: 'contain',
    },
    container: {
        width: '100%',
        flex:1,
    }
});

export default HomeScreen;
