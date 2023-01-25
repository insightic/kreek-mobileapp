import React, {useState, useRef, useEffect} from 'react';
import { TouchableOpacity, Button, Easing, StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { Ionicons, EvilIcons, MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Carousel from 'react-native-reanimated-carousel';
import CardView from 'react-native-cardview'

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

                        {/*<View style={styles.card_cover1}>*/}
                        <LinearGradient
                            colors={['rgb(182,87,229)', 'rgba(140,52,199,50)', 'rgba(162,70,208,50)']}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 1}}
                            style={styles.card_cover1}
                        >
                            <LinearGradient
                                colors={['#402577', '#b3a4d5', '#20133c']}
                                start={{x: 0.6, y: 0}}
                                end={{x: 0.5, y: 0.8}}
                                style={styles.card_cover2}
                            >
                                {/*<View style={styles.card_cover2}>*/}

                                <View style={styles.top_cover1}>
                                    <View style={styles.top_cover2}>
                                        <Text style={[{color: colors.text},{fontSize:15}]}>&nbsp;&nbsp;#235&nbsp;&nbsp;</Text>
                                    </View>
                                </View>
                                <View style={styles.image_cover1}>
                                    <View style={styles.image_cover2}>
                                        <TouchableOpacity onPress={() => navigation.navigate(item.to)}>
                                            {/*<ImageBackground source='../assets/imgbg.PNG' blurRadius={40}>*/}
                                            {/*<LinearGradient*/}
                                            {/*    colors={['#252698', '#2547c2', '#25246e']}*/}
                                            {/*    start={{x: 0, y: 1}}*/}
                                            {/*    end={{x: 1, y: 0}}*/}
                                            {/*    style={styles.image_cover3}*/}
                                            {/*>*/}
                                            {/*    <LinearGradient*/}
                                            {/*        colors={['rgba(45,53,208,0.5)', 'rgba(47,39,217,0.5)', 'rgba(10,4,224,0.5)']}*/}
                                            {/*        start={{x: 0, y: 1}}*/}
                                            {/*        end={{x: 1, y: 0}}*/}
                                            {/*        style={styles.image_cover3}*/}
                                            {/*    >*/}
                                            {/*        <LinearGradient*/}
                                            {/*            colors={['rgba(96,92,238,0.19)', 'rgba(82,86,175,0.99)', 'rgba(70,58,155,0.99)']}*/}
                                            {/*            start={{x: 0, y: 1}}*/}
                                            {/*            end={{x: 1, y: 0}}*/}
                                            {/*            style={styles.image_cover3}*/}
                                            {/*        >*/}
                                                        <Image blurRadius={1} style={styles.card} source={item.uri} />
                                            {/*        </LinearGradient>*/}
                                            {/*    </LinearGradient>*/}
                                            {/*</LinearGradient>*/}

                                            {/*</ImageBackground>*/}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.text_cover1}>
                                    <View style={styles.text_cover2}>
                                        <Text style={[{color: colors.text},{fontSize:20}]}>--Kreek Seasonal Plan 1--</Text>
                                        <Text style={[{color: colors.text},{fontSize:20}]}>50USD/Week ETH</Text>
                                    </View>
                                </View>

                                {/*</View>*/}
                            </LinearGradient>
                        </LinearGradient>
                        {/*</View>*/}


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
        // backgroundColor:'#245B4F00',
        width:'100%',
        // height: 40,
        opacity:0.8,
        paddingTop:10,
        // paddingBottom:10,
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
        borderColor:'#20133c',
        borderWidth:2,
        transform: [
            {translateX:0},
            {translateY:0},
            {scaleX: 0.98}
        ],
    },
    image_cover1: {
        flex: 1,
        backgroundColor: '#ffffff22',//44b4e5
        alignItems:'center',
        justifyContent: 'center',
        // padding:20,
        marginLeft:20,
        marginTop:10,
        elevation: 10,
        marginBottom:10,
        borderRadius: 10,
        borderColor:'#FFFFFF66',
        borderWidth:2,
    },
    image_cover2: {
        flex: 1,
        backgroundColor: '#FFFFFF22',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor:'#20133c',
        borderWidth:2,
        elevation:5,
        transform: [
            {translateX:0},
            {translateY:0},
            {scale: 0.99},
        ]
    },
    image_cover3: {
        flex: 1,
        // backgroundColor: '#FFFFFF22',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 10,
        // borderColor:'#FFFFFFFF',
        // borderWidth:2,
        // elevation:5,
        transform: [
            {translateX:0},
            {translateY:0},
            {scale: 0.98},
        ]
    },
    top_cover1: {
        // flex: 1,
        width: '83%',
        backgroundColor: '#FFFFFF22',
        alignItems:'center',
        justifyContent: 'center',
        height:30,
        marginLeft:20,
        marginTop:7,
        borderRadius: 10,
        borderColor:'#FFFFFF66',
        borderWidth:2,
    },
    top_cover2: {
        width: '100%',
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#FFFFFF22',
        alignItems:'center',
        justifyContent: 'center',
        borderColor:'#20133c',
        borderWidth:2,
        // shadowColor: 'rgba(255,0,0)',
        // shadowOpacity: 0.5,
        // shadowRadius: 5,
        // elevation: 2,
        // elevation:3,
        transform: [
            {translateX:0},
            {translateY:0},
            {scale: 0.99}
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
        borderRadius: 10,
        borderColor:'#FFFFFF66',
        borderWidth:2,
    },
    text_cover2: {
        flex: 1,
        backgroundColor: '#FFFFFF00',
        alignItems:'center',
        justifyContent: 'center',
        borderColor:'#20133c',
        borderWidth:2,
        borderRadius: 10,
        transform: [
            {translateX:0},
            {translateY:0},
            {scale:0.99}
        ],
    },

    card: {
        flex: 1,
        height: 200,
        width: 240,
        resizeMode: "center",
        borderRadius: 10,
        // margin: 20,
        // elevation:5,
        // borderColor:'#f10fd3',
        // borderWidth:2,
    },
    carousel: {
        justifyContent:'center',
        width: '100%',
        // height: 400,
        // paddingTop:20,
        marginTop:20,
        // opacity:0.8,
        backgroundColor:'#245B4F10',
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
        width:'30%',
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
