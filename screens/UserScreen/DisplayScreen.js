import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default UserScreen = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    <View style={styles.container}>
        <Image
        style={styles.profilePic}
        source={require('../assets/profilepic.png')}
        />
        <Text style={styles.title}>Ape@NFT</Text>
        <Text style={styles.title}>Gold Member</Text>

        <View style={styles.subContainer}>
            <Text style={styles.subtitle}>
                Preference
            </Text>
            <View style = {styles.subContainerList}>
                <TouchableOpacity>
                    <Text style={styles.subContainerListItem}>Display</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.subContainerListItem}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.subContainerListItem}>App Feedback</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.subContainer}>
            <Text style={styles.subtitle}>
                User Profile
            </Text>
            <View style = {styles.subContainerList}>
                <TouchableOpacity>
                    <Text style={styles.subContainerListItem}>View Achievements</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.subContainerListItem}>Invite Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.subContainerListItem}>Task Center</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.subContainer}>
            <Text style={styles.subtitle}>
                Notification
            </Text>
            <View style = {styles.subContainerList}>
                <TouchableOpacity>
                    <Text style={styles.subContainerListItem}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.subContainerListItem}>Investment Plans</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.subContainerListItem}>Promotions</Text>
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
      backgroundColor: "#222222"
    },
    profilePic: {
        borderRadius: 30,
        width: 60,
        height:60,
        margin: 10,
        resizeMode: 'contain',
        overflow: 'hidden'
    },
    title: {
        color: "#fff"
    },
    subContainer: {
        margin: 10,
        width: 250,
        flexDirection: 'column',
        justifyContent:'flex-start',
    },
    subtitle: {
        color: '#fff',
        fontSize: 18,
        marginTop: 8,
        marginBottom: 6,
    },
    subtitlelist: {
        fontSize: 16
    },
    subContainerList: {
        backgroundColor: '#D9D9D930',
        borderRadius: 8,
    },
    subContainerListItem: {
        margin: 6,
        color: '#fff'
    },

  });