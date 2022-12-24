import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, ImageEditor } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Easing, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const NewsScreen = () => {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [sampleCardArray, setSampleCardArray] = useState(card_deck);
  const [swipeDirection, setSwipeDirection] = useState('--');
  const position = new Animated.ValueXY()
  const [currIdx, setCurrIdx] = useState(0)
  const navigation = useNavigation();

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

  const secondCardScale = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.9, 1],
      extrapolate: 'clamp'
  })

  const thirdCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0.9, 0.8, 0.9],
    extrapolate: 'clamp'
})

const nextCardScale = position.x.interpolate({
  inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  outputRange: [1, 0.9, 1],
  extrapolate: 'clamp'
})

const cardPos1 = 10
const cardPos2 = 5.5
const cardPos3 = 4

const secondCardTrans = position.x.interpolate({
  inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  outputRange: [SCREEN_WIDTH / cardPos1 - SCREEN_WIDTH / cardPos2 , 0, SCREEN_WIDTH / cardPos1 - SCREEN_WIDTH / cardPos2 ],
  extrapolate: 'clamp'
})

const thirdCardTrans = position.x.interpolate({
  inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  outputRange: [SCREEN_WIDTH / cardPos2 - SCREEN_WIDTH / cardPos3 , 0, SCREEN_WIDTH / cardPos2 - SCREEN_WIDTH / cardPos3 ],
  extrapolate: 'clamp'
})

  let panResponder = PanResponder.create({
  onStartShouldSetPanResponder: (evt, gestureState) => false,
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
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(() => {
            setCurrIdx(currIdx + 1), () => {
              position.setValue({ x: 0, y: 0 })
            }
          })
      } else if (gestureState.dx < -100) {
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(() => {
            setCurrIdx(currIdx + 1), () => {
              position.setValue({ x: 0, y: 0 })
            }
          })
      } else {
          Animated.spring(position, {
             toValue: { x: 0, y: 0 },
             friction: 4,
             useNativeDriver: true
             }).start()
      }
      
  }
  })

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
                  {height: 400,
                  opacity: cardOpacity,
                  width: 250,
                  padding: 10,
                  flex:2,
                  position:'absolute',
                  left: SCREEN_WIDTH / cardPos1,
                  // /backgroundColor:"grey",
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
                  <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate(item.to)}>
                  <Image
                  style={{
                      flex: 1,
                      height: null,
                      width: 250,
                      resizeMode: "contain",
                      borderRadius: 20,
                      backgroundColor:"grey",
                  }}
                  source={item.uri}
                  />
                </TouchableOpacity>
              </Animated.View>
              );
      } else if (i == currIdx + 1) {
          return (
              <Animated.View
              {...panResponder.panHandlers}
              key={item.id}
                  style={
                  [rotateAndTranslate,
                  {height: 400,
                  //opacity: nextCardOpacity,
                  width: 250,
                  padding: 10,
                  flex:2,
                  position:'absolute',
                  left: SCREEN_WIDTH / cardPos2,
                  transform: [{ translateX: secondCardTrans}, {scale:secondCardScale} ],
                  // /backgroundColor:"grey",
                  alignItems:'center'
                  }]}
              >
                  <Image
                  style={{
                      flex: 1,
                      height: null,
                      width: 250,
                      resizeMode: "contain",
                      borderRadius: 20
                  }}
                  source={item.uri}
                  />
              </Animated.View>
              );
      } else if (i == currIdx + 2) {
        return (
            <Animated.View
            {...panResponder.panHandlers}
            key={item.id}
                style={
                [rotateAndTranslate,
                {height: 400,
                //opacity: nextCardOpacity,
                width: 250,
                padding: 10,
                flex:2,
                left: SCREEN_WIDTH / cardPos3,
                transform: [{translateX: thirdCardTrans}, {scale:thirdCardScale}],
                position:'absolute',
                // /backgroundColor:"grey",
                alignItems:'center'
                }]}
            >
              
                <Image
                style={{
                    flex: 1,
                    height: null,
                    width: 250,
                    resizeMode: "contain",
                    borderRadius: 20
                }}
                source={item.uri}
                />
            </Animated.View>
            );
      } else {
          return (
              <Animated.View
              key={item.id}
              style={{
                  height: 400,
                  width: 250,
                  padding: 10,
                  position:'absolute',
                  left: SCREEN_WIDTH / cardPos3,
                  transform: [ {scale:0.8}],
                  //backgroundColor:"grey",
                  alignItems:'center',
                  //opacity: nextCardOpacity,
                  //transform: [{scale: nextCardScale}]
              }}
              >
              <Image
                  style={{
                      flex: 1,
                      height: null,
                      width: 250,
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
  <View style={{ flex: 1 }}>
  <View style={{ height: 10 }} />
  <View style={{ flex: 1, alignItems:'center' }}>
  {card_list}

  </View>
  <View style={{ height: 60 }} />

  </View>
  );
};


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
titleText: {
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  paddingVertical: 20,
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
});

const card_deck = [
    { id: "1", uri: require('../assets/card1.png'), to:'NFT1' },
    { id: "2", uri: require('../assets/card2.png'), to:'NFT2' },
    { id: "3", uri: require('../assets/card3.png'), to:'NFT3' },
    { id: "4", uri: require('../assets/card1.png'), to:'NFT1' },
    { id: "5", uri: require('../assets/card2.png'), to:'NFT2' },
  ]

export default NewsScreen;
