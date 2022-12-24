import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View, Dimensions, Image, Animated, PanResponder, Pressable, ImageEditor } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Easing, Alert, ScrollView} from 'react-native';
import ProfileCardsLine from '../components/ProfileCardsLine.js'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import { useTheme } from '@react-navigation/native';

const MyNFTsScreen = () => {
    const [noMoreCard, setNoMoreCard] = useState(false);
    const [sampleCardArray, setSampleCardArray] = useState(card_deck);
    const [swipeDirection, setSwipeDirection] = useState('--');
    const position = new Animated.ValueXY()
    const [currIdx, setCurrIdx] = useState(0)
    const navigation = useNavigation();
    const { colors } = useTheme();
    useEffect(() => {animatedValue.setValue(0);
    Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease
    }).start()}, [currIdx])

    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    })

    const rotateAndTranslate = {
        transform: [{
          rotate: rotate
        },
        ...position.getTranslateTransform()
        ]
    }

    const cardOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp'
    })

    const toRightOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
    })

    const toLeftOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
    })

    const nextCardOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'
     })

    const nextCardScale = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
    })

    const touchThreshold = 1;

    let panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => {return false},
    onStartShouldSetPanResponderCapture: () => {return false},
    onMoveShouldSetPanResponder: (e, gestureState) => {
        const {dx, dy} = gestureState;

        return (dx != 0 || dy != 0) //(Math.abs(dx) > touchThreshold) || (Math.abs(dy) > touchThreshold);
    },
    onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
            Animated.spring(position, {
              toValue: { x: SCREEN_WIDTH, y: gestureState.dy },
              speed:100,
              bounciness:5,
              restSpeedThreshold:0.0001,
              restDisplacementThreshold:0.0001,
              useNativeDriver: true
            }).start(() => {
              setCurrIdx(currIdx + 1), 
                position.setValue({ x: 0, y: 0 })
            });
        } else if (gestureState.dx < -100) {
            Animated.spring(position, {
              toValue: { x: -SCREEN_WIDTH, y: gestureState.dy },
              speed: 100,
              bounciness:5,
              restSpeedThreshold:0.0001,
              restDisplacementThreshold:0.0001,
              useNativeDriver: true
            }).start(() => {
              setCurrIdx(currIdx + 1),
                position.setValue({ x: 0, y: 0 })
            });
        } else {
            Animated.spring(position, {
               toValue: { x: 0, y: 0 },
               friction: 4,
               useNativeDriver: true
               }).start()
        }
    }
    })

    let animatedValue = new Animated.Value(1)
    let zoom = 0

    let handleAnimation = () => {
        if (zoom == 1) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 1000,
                easing: Easing.ease
            }).start()
            animatedValue.setValue(0)
            zoom = 0
        } else {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.ease
            }).start()
            animatedValue.setValue(1)
            zoom = 1
        }

    }

    let card_list = card_deck.map((item, i) => {
        // alert(currIdx)
        if (i < currIdx) {
            return null;
        } else if (i == currIdx) {
            return (
                <Animated.View
                {...panResponder.panHandlers}
                key={item.id}
                    style={
                    [rotateAndTranslate,
                    {height: 315,
                    opacity: cardOpacity,
                    padding: 10,
                    position:'absolute',
                    //backgroundColor:"grey",
                    alignItems:'center'
                    }]}
                >
                    <Animated.View
                    style={{
                        transform: [{ rotate: "-30deg" }],
                        position: "absolute",
                        top: 20,
                        left: 20,
                        zIndex: 10,
                        opacity: toRightOpacity
                    }}
                    >
                        <Text
                            style={{
                            borderWidth: 1,
                            borderColor: "green",
                            color: "green",
                            fontSize: 18,
                            fontWeight: "800",
                            padding: 10
                            }}
                        >
                            To Right
                        </Text>
                    </Animated.View>

                    <Animated.View
                    style={{
                        transform: [{ rotate: "30deg" }],
                        position: "absolute",
                        top: 20,
                        right: 20,
                        zIndex: 10,
                        opacity: toLeftOpacity
                    }}
                    >
                        <Text
                            style={{
                            borderWidth: 1,
                            borderColor: "red",
                            color: "red",
                            fontSize: 18,
                            fontWeight: "800",
                            padding: 10
                            }}
                        >
                            To Left
                        </Text>
                    </Animated.View>
                    <TouchableOpacity onPress={() => navigation.navigate(item.to)}>
                    <Image
                    source={item.uri}
                    style={{
                        flex:1,
                        height: null,
                        width: 200,
                        resizeMode: "contain",
                        borderRadius: 20,
                        backgroundColor:"grey",
                    }}
                    />
                    </TouchableOpacity>
                </Animated.View>
                );
        } else {
            return (
                <Animated.View
                key={item.id}
                style={{
                    height: 315,
                    width: 200,
                    padding: 10,
                    position:'absolute',
                    //backgroundColor:"grey",
                    alignItems:'center',
                    opacity: nextCardOpacity,
                    transform: [{scale: nextCardScale}]
                }}
                >
                <Image
                    style={{
                        flex: 1,
                        height: null,
                        width: 200,
                    resizeMode: "contain",
                    borderRadius: 20
                    }}
                    source={item.uri}
                />
                </Animated.View>
            );
        }
    }).reverse()

    return (
    <View style={styles.container}>
        <View style={{flex:1}} />
        <View style={styles.stat}>
            <Text style={{color: colors.text, fontSize:15}}>{card_deck[currIdx]['dayInvested']} Days</Text>
            <Text style={{color: colors.text, fontSize:15}}>+ {card_deck[currIdx]['tokenAdded']} Kreek Tokens</Text>
        </View>
        <View style={{flex: 10, alignItems:'center', zIndex:2}}>
        {card_list}
        {/* <Button title='click' onPress={() => setCurrIdx(currIdx + 1)} /> */}
        </View>
        <View style={{flex:2}} />
        <Animated.View style={[styles.userLine, {opacity:animatedValue}]}>
            {/* <ProfileCardsLine userList={card_deck[currIdx]['user']} desc={card_deck[currIdx]['desc']}/> */}
            <Text style={{color: colors.text, fontSize:15}}>{card_deck[currIdx]['desc']}</Text>
        </Animated.View>
        <View style={{flex:1}} />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>COLLECT NOW</Text>
        </TouchableOpacity>
        <View style={{flex:2 }} />
    </View>
    );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  stat:{
    justifyContent:"space-around",
    flexDirection:"row",
    width:'100%',
  },
  cardStyle: {
    width: '75%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
  },
  cardTitleStyle: {
    color: '#fff',
    fontSize: 24,
  },
  swipeText: {
    fontSize: 18,
    textAlign: 'center',
  },
  userLine: {
    flex:1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor:'#FF6F00',
    width: 280,
    height: 50
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

const sampleUser1 = [require('../assets/user1.png'), require('../assets/user2.png'), require('../assets/user3.png'), require('../assets/user4.png')]
const sampleUser2 = [ require('../assets/user3.png'), require('../assets/user4.png'), require('../assets/user1.png'), require('../assets/user2.png')]
const sampleUser3 = [require('../assets/user1.png'), require('../assets/user4.png'), require('../assets/user2.png'), require('../assets/user3.png')]

const card_deck = [
  { id: "1", uri: require('../assets/card1.png'), to:'NFT1', desc:"321 / 1000 Investors Are Still Holding", user: sampleUser1, dayInvested : 30, tokenAdded : 5},
  { id: "2", uri: require('../assets/card2.png'), to:'NFT2', desc:"211 / 500 Investors Are Still Holding", user: sampleUser2, dayInvested : 20, tokenAdded : 3},
  { id: "3", uri: require('../assets/card3.png'), to:'NFT3', desc:"311 / 800 Investors Are Still Holding", user: sampleUser3, dayInvested : 10, tokenAdded : 2},
  { id: "4", uri: require('../assets/card1.png'), to:'NFT1', desc:"321 / 1000 Investors Are Still Holding", user: sampleUser1, dayInvested : 30, tokenAdded : 5},
  { id: "5", uri: require('../assets/card2.png'), to:'NFT2', desc:"211 / 500 Investors Are Still Holding", user: sampleUser2, dayInvested : 20, tokenAdded : 3},
]


export default MyNFTsScreen;
