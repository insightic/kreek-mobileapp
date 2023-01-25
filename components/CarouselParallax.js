import React, {useState, useRef, useEffect} from 'react';
import { TouchableOpacity, Button, Easing, StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons, EvilIcons, MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Carousel from 'react-native-reanimated-carousel';

import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    Keyframe,
} from 'react-native-reanimated';
import { ElementsText, window } from './carousel/constant';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { Audio } from 'expo-av';
import NFTCardTemplate from './NFTCardTemplate';
import {LinearGradient} from "expo-linear-gradient";

const PAGE_WIDTH = window.width;
let dotColors = [
    '#5C6265',
    '#5C6265',
    '#5C6265',
    '#5C6265',
    '#5C6265',
    '#5C6265',
];

function CarouselParallax(props) {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [isVertical, setIsVertical] = React.useState(false);
    const [autoPlay, setAutoPlay] = React.useState(true);
    const [pagingEnabled, setPagingEnabled] = React.useState(false);
    const [snapEnabled, setSnapEnabled] = React.useState(true);
    const progressValue = useSharedValue(0);
    const [currIdx, setCurrIdx] = useState(0);
    const itemList = props.itemList
    const baseOptions = isVertical
        ? ({
              vertical: true,
              width: PAGE_WIDTH,
              height: PAGE_WIDTH * 0.6,
          })
        : ({
              vertical: false,
              width: 300,
              height: 410,
          });

          const enableSound = props.enableSound
          const [sound, setSound] = React.useState();

          async function playSound() {
            if (enableSound) {
                const { sound } = await Audio.Sound.createAsync( require('../assets/card_flip.mp3')
                );
                setSound(sound);

                await sound.playAsync();
            }
          }

          React.useEffect(() => {
            return sound
              ? () => {
                  sound.unloadAsync();
                }
              : undefined;
          }, [sound]);

    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent:'center',
                width:800,
            }}
        >
        {!!progressValue && (

            <View style={styles.spot_bar}>
                <View
                    style={
                        isVertical
                            ? {
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  width: 10,
                                  alignSelf: 'center',
                                  position: 'absolute',
                                  right: 5,
                                  top: 40,
                              }
                            : {
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  width: 100,
                                  alignSelf: 'center',
                              }
                    }
                >
                    {dotColors.map((backgroundColor, index) => {
                        return (
                            <PaginationItem
                                backgroundColor={backgroundColor}
                                animValue={progressValue}
                                index={index}
                                key={index}
                                isRotate={isVertical}
                                length={dotColors.length}
                            />
                        );
                    })}
                </View>

            </View>
            )}
            {/* <Text style={{color:colors.text, fontSize:18}}>{currIdx + 1} / {itemList.length} </Text> */}

            <Carousel
                {...baseOptions}
                style={styles.carousel}
                loop
                pagingEnabled={pagingEnabled}
                snapEnabled={snapEnabled}
                autoPlay={autoPlay}
                autoPlayInterval={1500}
                onProgressChange={(_, absoluteProgress) =>
                    (progressValue.value = absoluteProgress)
                }
                onScrollBegin={() => playSound()}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 1,
                    parallaxScrollingOffset: 100,
                    parallaxAdjacentItemScale: 0.5,
                }}
                onSnapToItem={(index) => {setCurrIdx(index)}}
                data={itemList}
                renderItem={({ item }) => (
                <View style={styles.card_container}>
                    {/* <View style={styles.card_cover}> */}
                    {/* <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.to)}>
                        {/* <Image style={styles.card} source={item.uri} /> */}
                        {/* <NFTCardTemplate uri={item.uri} /> */}
                    {/* </TouchableOpacity> */} 
                    
                     <LinearGradient
                        colors={['#66009900', '#9900ff00', '#9933cc00']}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        style={styles.card_cover1}
                    >
                        <LinearGradient
                            colors={['#402577DD', '#b3a4d5DD', '#20133cDD']}
                            start={{x: 0.6, y: 0}}
                            end={{x: 0.5, y: 0.8}}
                            style={styles.card_cover2}
                        >
                            <View style={styles.top_cover1}>
                                <View style={styles.top_cover2}>
                                    <Text style={[{color: colors.text},{fontSize:15}]}>&nbsp;&nbsp;#235&nbsp;&nbsp;</Text>
                                </View>
                            </View>
                            <View style={styles.image_cover1}>
                                <View style={styles.image_cover2}>
                                    <TouchableOpacity onPress={() => navigation.navigate(item.to)}>
                                        <Image style={styles.card} source={item.uri} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.text_cover1}>
                                <View style={styles.text_cover2}>
                                    <Text style={[{color: colors.text},{fontSize:20}]}>--Kreek Seasonal Plan 1--</Text>
                                    <Text style={[{color: colors.text},{fontSize:20}]}>50USD/Week ETH</Text>
                                </View>
                            </View>

                        </LinearGradient>
                     </LinearGradient>
                </View>
                )}
            />

            <InfoBlock index={currIdx} days={itemList[currIdx]['dayInvested']} totalToken={itemList[currIdx]['totalToken']} tokenSpeed={itemList[currIdx]['tokenSpeed']} numUsers={itemList[currIdx]['numUsers']}/>
        </View>
    );
}

// For dot indicators
const PaginationItem  = (props) => {
    const { animValue, index, length, backgroundColor, isRotate } = props;
    const width = 10;

    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    }, [animValue, index, length]);
    return (
        <View
            style={[indicatorStyle.main, {
                width,
                height: width,
                transform: [
                    {
                        rotateZ: isRotate ? '90deg' : '0deg',
                    },
                ],
            }]}
        >
            <Animated.View style={[{backgroundColor}, indicatorStyle.container, animStyle]}/>
        </View>
    );
};

// for information to be shown
const enteringAnimation = new Keyframe({
    0: {
		opacity: 0,
    },
    100: {
		opacity: 1,
    },
}).duration(500)

const InfoBlock = (props) => {
    const { colors } = useTheme();
    const {index, days, totalToken,  tokenSpeed, numUsers} = props
    const animValue = new Animated.Value(1)
    const opac = animValue.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp'
    })

    return (
        <Animated.View style={[infoStyles.stat, {opacity:animValue}]}>
            {days &&
                <View style={infoStyles.row}>
                    <MaterialIcons style={infoStyles.icon} name="date-range" size={30} color={colors.text} />
                    <Text style={{color: colors.text, fontSize:15}}>Days Holding: </Text>
                    <Text style={{color: colors.text, fontSize:15}}>{days}</Text>
                </View>
            }
            {totalToken &&
                <View style={infoStyles.row}>
                    <FontAwesome style={infoStyles.icon} name="money" size={30} color={colors.text} />
                    <Text style={{color: colors.text, fontSize:15}}>Token: </Text>
                    <Text style={{color: colors.text, fontSize:15}}> {totalToken} Drip Tokens (+ {tokenSpeed}/day)</Text>
                </View>
            }
            {numUsers &&
                <View style={infoStyles.row}>
                    <FontAwesome style={infoStyles.icon} name="users" size={30} color={colors.text} />
                    <Text style={{color: colors.text, fontSize:15}}>Pool: </Text>
                    <Text style={{color: colors.text, fontSize:15}}> {numUsers} are holding</Text>
                </View>
            }


        </Animated.View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        borderRadius: 50,
        overflow: 'hidden',
    },
    container: {
        borderRadius: 50,
        flex: 1,
    },
    spot_bar: {
        width:'100%',
        // height: 40,
        opacity:0.8,
        paddingTop:10,
    },
    card_container : {
        flex: 1,
        justifyContent: 'center',
    },
    card_cover1: {
        flex: 1,
        backgroundColor: '#66666666',
        alignItems:'center',
        justifyContent: 'center',
        padding:2,
        borderRadius: 20,
        borderColor:'#FFFFFF66',
        borderWidth:2,
        transform:[
            {rotateX:'5deg'},
            {rotateY:'15deg'},
            {scale:0.9}
        ]
    },
    card_cover2: {
        flex: 1,
        backgroundColor: '#66666644',
        alignItems:'flex-start',
        justifyContent: 'center',
        // padding:35,
        width:300,
        borderRadius: 20,
        borderColor:'#FFD700FF',
        borderWidth:2,
        transform: [
            {translateX:8},
            {translateY:-5},
        ],
},
    image_cover1: {
        flex: 1,
        backgroundColor: '#FFFFFF22',
        alignItems:'center',
        justifyContent: 'center',
        // padding:20,
        marginLeft:20,
        marginTop:10,
        marginBottom:10,
        borderRadius: 20,
        borderColor:'#FFFFFF66',
        borderWidth:2,
    },
    image_cover2: {
        flex: 1,
        backgroundColor: '#FFFFFF22',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor:'#FFD700FF',
        borderWidth:2,
        elevation:5,
        transform: [
            {translateX:6},
            {translateY:-5}
        ]
    },
    top_cover1: {
        // flex: 1,
        backgroundColor: '#FFFFFF22',
        alignItems:'center',
        justifyContent: 'center',
        height:30,
        marginLeft:20,
        marginTop:5,
        borderColor:'#FFFFFF66',
        borderWidth:2,
        borderRadius: 10,
    },
    top_cover2: {
        flex: 1,
        backgroundColor: '#FFFFFF22',
        alignItems:'center',
        justifyContent: 'center',
        borderColor:'#FFD700FF',
        borderWidth:2,
        borderRadius: 10,
        transform: [
            {translateX:5},
            {translateY:-3}
        ],
    },
    text_cover1: {
        // flex: 1,
        backgroundColor: '#FFFFFF00',
        alignItems:'stretch',
        justifyContent: 'center',
        height:130,
        width:250,
        marginLeft:20,
        marginBottom:10,
        borderColor:'#FFFFFF66',
        borderWidth:2,
        borderRadius: 10,
    },
    text_cover2: {
        flex: 1,
        backgroundColor: '#FFFFFF00',
        alignItems:'center',
        justifyContent: 'center',
        borderColor:'#FFD700FF',
        borderWidth:2,
        borderRadius: 10,
        transform: [
            {translateX:5},
            {translateY:-3},
        ],
    },

    card: {
        flex: 1,
        height: 200,
        width: 240,
        resizeMode: "center",
        borderRadius: 20,
    },
    carousel: {
        justifyContent:'center',
        width: '100%',
        marginTop:20,
        padding:10,
        opacity:0.8,
        backgroundColor:'#245B4F05',
    },
    info: {
        justifyContent:'center',
    }
})

const indicatorStyle = StyleSheet.create({
    main: {
        marginVertical:10,
        backgroundColor: 'white',
        borderRadius: 50,
        overflow: 'hidden',
    },
    container: {
        borderRadius: 50,
        flex: 1,
    },
})

const infoStyles = StyleSheet.create({
    stat: {
        justifyContent:"center",
        flexDirection:"column",
        marginVertical: 20,
    },
    row: {
        justifyContent:"flex-start",
        flexDirection:"row",
        marginVertical:5,
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 10
    }
})

export default CarouselParallax;
