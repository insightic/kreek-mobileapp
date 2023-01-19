import * as React from 'react';
import { Text, Image, Dimensions, StyleSheet, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTheme } from '@react-navigation/native';
import GradientText from './GradientText';
import { LinearGradient } from 'expo-linear-gradient';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEIGHT = 250;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

const NFTCardTemplate= (props) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>

    <LinearGradient
            colors={['white', 'black']}
            style={styles.cardContainer}
            start={{x:0, y:1}}
            end={{x: 0, y: 1}}
    >
    <BlurView intensity={50} tint="light" style={styles.cardContainer}>

      <View style={styles.cardTop}>
        <Text style={styles.cardTopText}>#325</Text>
      </View>
      <View style={styles.cardImgCover}>   
        <Image style={styles.cardImg} source={props.uri} />   
        <LinearGradient
            colors={['#E2E2E210', 'transparent', '#E2E2E210']}
            locations={[0.1, 0.5, 0.9]}
            style={{position: 'absolute', width: '100%', height: '100%'}}
            start={{x:0, y:1.0}}
            end={{x: 0, y: 1}}
          />
      </View>
      <View style={styles.cardBottom}>
        <GradientText style={styles.cardBottomTitle}>-- Kreek Seasonal Plan 1 --</GradientText>
        <GradientText style={styles.cardBottomText}>50 USD/Week -> ETH</GradientText>
      </View>
      <View style={{flex:2}} />

    </BlurView>
    </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 15,
    width: 180,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    
    shadowColor: '#E2E2E2',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 3,
  }, 
  cardTop: {
    height: 20,
    width: 150,
    marginTop:20,
    justifyContent:'flex-start',
  },
  cardTopText: {
    fontWeight: 'bold',
  },
  cardImgCover: {
    height: 160,
    width: 160,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
  },
  cardImg: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
    borderRadius:5,
  },
  cardBottom: {
    textDecorationLine: 'underline'
    
  },
  cardBottomTitle: {
    textAlign:'center',
    textDecorationLine: 'underline'
    
  },
  cardBottomText: {
    textAlign:'center',
  },

  
});

export default NFTCardTemplate;


  
  

  