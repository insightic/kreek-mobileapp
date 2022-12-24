import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';

const ProfileCardsLine = (props) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {props.userList.map((user) => {
                return (<Image source={user} style= {styles.user} />)
            })}
        <Text style={[styles.desc, {color: colors.text}]}>{props.desc}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
      width:250,
      paddingHorizontal:10
    },
    user: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: -5,
        position: 'relative'
    },
    desc: {
      fontSize: 18,
      textAlign: 'center',
      marginHorizontal: 15
    },
    instructions: {
      width: '75%',
      height: '45%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: 7,
    }
  });

export default ProfileCardsLine;