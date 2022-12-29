import React from "react";
import { StyleSheet,Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ImageDetailsScreen = () => {
return (
    <View style={styles.container}>
        <Image
        style={styles.poster}
        source={require('../assets/card1.png')}
        />
        <Text style={styles.title}>This is where the Topic will Go</Text>

        <View style={styles.menu}>
            <Text style={styles.subtitleActive}>
                Section 1
            </Text>
            <Text style={styles.subtitle}>
                Section 2
            </Text>
			<Text style={styles.subtitle}>
                Section 3
            </Text>
        </View>

        <View style={styles.content}>
			<View style={styles.listItem}>
				<Text style={styles.left}>Title 1</Text>
				<Text style={styles.right}>Content 1</Text>
			</View>
			<View style={styles.listItem}>
				<Text style={styles.left}>Title 2</Text>
				<Text style={styles.right}>Content 2</Text>
			</View>
			<View style={styles.listItem}>
				<Text style={styles.left}>Title 3</Text>
				<Text style={styles.right}>Content 3</Text>
			</View>

            <Text style = {styles.paragraph}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
			Maecenas ornare lacus sit amet est finibus, ut eleifend tellus ultrices. 
			Praesent pretium gravida sapien, vel lobortis enim lacinia eu. 
			Duis sodales ex at leo semper, euismod commodo tellus feugiat. 
			Maecenas luctus mattis egestas. 
            </Text>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#222222",
	},
	poster: {
		height: 250,
		width: 400,
		resizeMode: 'contain'
	},
	title: {
		color: '#fff',
		fontSize: 20,
		margin:10
	},
	menu: {
		color: '#fff',
		borderBottomColor: '#FFFFFF25',
		borderBottomWidth: 1,
		flex:1,
		flexDirection:'row',
		height:10,
		lineHeight:20,
	},
	subtitleActive: {
		color: '#fff',
		borderBottomColor: '#FF6F00',
		marginHorizontal: 10,
		lineHeight:20,
		height: 20,
	},
	subtitle:{
		color: '#ffffff60',
		marginHorizontal: 10,
		lineHeight:20,
		height: 20,
	},
	content: {
		flex:6,
		
	},
	listItem: {
		flexDirection:'row',
		alignContent:'space-between',
		width: '100%'
	},
	left: {
		color: '#fff',
		flex:1,
		marginHorizontal:20,
		marginVertical: 5,
	}, 
	right: {
		color:'#fff',
		flex:1,
		textAlign:'right',
		marginHorizontal:20,
		marginVertical: 5,
	},
	paragraph: {
		color:'#fff',
		marginHorizontal:20,
		marginVertical: 15,
	}
})

ImageDetailsScreen.navigationOptions = (navData) => {
	headerShown:false
}



export default ImageDetailsScreen;
