import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ProgressBar from '../components/ProgressBar.js'

export default UserScreen = () => {

  const { colors } = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.userTop}>
            <View style={styles.userTopLeft}>
                <Image
                style={styles.profilePic}
                source={require('../assets/profilepic.png')}
                />
            </View>
            <View style={styles.userTopRight}>
                <Text style={[styles.title, {color:colors.text}]}>Ape@NFT</Text>
                <Text style={[styles.title, {color:colors.text}]}>Level 6    My Kreek Token: 50</Text>
                <ProgressBar bgcolor = '#F2AF2A' completed = {60} /> 
            </View>
        </View>

        <View style={styles.subContainer}>
            <Text style={[styles.subtitle, {color:colors.text}]}>
                Preference
            </Text>
            <View style = {styles.subContainerList}>
                <TouchableOpacity>
                    <Text style={[styles.subContainerListItem, {color:colors.text}]}>Display</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.subContainerListItem, {color:colors.text}]}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.subContainerListItem, {color:colors.text}]}>App Feedback</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.subContainer}>
            <Text style={[styles.subtitle, {color:colors.text}]}>
                User Profile
            </Text>
            <View style = {styles.subContainerList}>
                <TouchableOpacity>
                    <Text style={[styles.subContainerListItem, {color:colors.text}]}>View Achievements</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.subContainerListItem, {color:colors.text}]}>Invite Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.subContainerListItem, {color:colors.text}]}>Task Center</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.subContainer}>
            <Text style={[styles.subtitle, {color:colors.text}]}>
                Notification
            </Text>
            <View style = {styles.subContainerList}>
                <TouchableOpacity>
                    <Text style={[styles.subContainerListItem, {color:colors.text}]}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.subContainerListItem, {color:colors.text}]}>Investment Plans</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.subContainerListItem, {color:colors.text}]}>Promotions</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
    },
    profilePic: {
        borderRadius: 30,
        width: 60,
        height:60,
        marginHorizontal: 5,
        marginVertical:10,
        resizeMode: 'contain',
        overflow: 'hidden',
    },
    userTop: {
        width: 280,
        justifyContent: 'flex-start',
        flexDirection:'row',
    },
    userTopLeft: {
        flex:1,
        marginRight:10
    },
    userTopRight: {
        flex: 3,
        marginHorizontal: 10
    },
    title: {
        margin: 2
    },
    subContainer: {
        margin: 10,
        width: 280,
        flexDirection: 'column',
        justifyContent:'flex-start',
    },
    subtitle: {
        fontSize: 18,
        marginTop: 8,
        marginBottom: 6,
    },
    subtitlelist: {
        fontSize: 16
    },
    subContainerList: {
        backgroundColor: '#D9D9D940',
        borderRadius: 8,
    },
    subContainerListItem: {
        margin: 6,
    },

  });