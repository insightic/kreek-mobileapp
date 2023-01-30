import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from '@react-navigation/native';
import ProgressBar from '../components/ProgressBar.js'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  return (
    <View style={[styles.container,{backgroundColor: colors.background}]}>
      <Image style={styles.image} source={require("../assets/brand.png")} /> 
      <StatusBar style="auto" />
      <Text style = {[styles.label,{color:colors.text}]}>Name</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <Text style = {[styles.label,{color:colors.text}]}>Email</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <Text style = {[styles.label,{color:colors.text}]}>Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={[styles.forgot_button, {color:colors.text}]}>Got an account? log In</Text> 
      </TouchableOpacity> 


      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Register</Text> 
      </TouchableOpacity> 

    </View> 
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      image: {
        marginBottom: 10,
        width:250,
        height:100,
        resizeMode: 'contain'
      },
      label: {
        marginVertical:10,
      },
      inputView: {
        backgroundColor: "#E2E2E2",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 5,
      },
      forgot_button: {
        height: 30,
        marginBottom: 30,
      },
      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#52739A",
      },
  });

export default RegisterScreen