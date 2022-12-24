import React from 'react';
import {Animated, Pressable, StyleSheet, View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {useCardAnimation} from '@react-navigation/stack';
import Settings from "../screens/SettingScreen.js";
export interface IBottomDrawer {}

const BottomDrawer: React.FC<IBottomDrawer> = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {current} = useCardAnimation();

  const styles = StyleSheet.create({
    bottomView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalView: {
      padding: 16,
      paddingTop: 0,
      width: '100%',
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      backgroundColor: colors.card,
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
          }),
        },
      ],
    },
  });

  return (
    <View style={styles.bottomView}>
      <Pressable style={StyleSheet.absoluteFill} onPress={navigation.goBack} />
      <Animated.View style={styles.modalView}>
        <Text>Home Screen <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Settings')}
        /></Text>
        
      </Animated.View>
    </View>
  );
};

export default BottomDrawer;