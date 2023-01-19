import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from '@react-navigation/native';
import ProgressBar from '../components/ProgressBar.js'
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={[styles.container,{backgroundColor: colors.background}]}>
      <Image style={styles.image} source={require("../assets/brand.png")} /> 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={[styles.forgot_button, {color:colors.text}]}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
      <TouchableOpacity>
        <Text style={[styles.forgot_button, {color:colors.text}]}>New here? Register</Text> 
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
        marginLeft: 20,
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
        marginVertical: 20,
        backgroundColor: "#52739A",
      },
  });

export default LoginScreen