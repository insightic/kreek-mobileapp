import React from "react";
import { Text, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from "@react-native-community/masked-view";

const GradientText = (props) => {
    if (Platform.OS === 'web') {
        return (
              <LinearGradient
                colors={props.colors ? props.colors : ["#4E79C7", "#FFFFFF", "#4E79C7"]}
                start={props.start ? props.start : { x: 0, y: 0 }}
                end={props.end ? props.end : { x: 1, y: 1 }}
                // style={{alignSelf:'flex-start'}}
              >
                <Text {...props} style={[props.style, { opacity: 0 }]} />
              </LinearGradient>
          );
    } else {
        return (
            <MaskedView maskElement={<Text {...props} />}>
              <LinearGradient
                colors={props.colors ? props.colors : ["#4E79C7", "#FFFFFF", "#4E79C7"]}
                start={props.start ? props.start : { x: 0, y: 0 }}
                end={props.end ? props.end : { x: 1, y: 1 }}
                style={{alignSelf:'flex-start'}}
              >
                <Text {...props} style={[props.style, { opacity: 0 }]} />
              </LinearGradient>
            </MaskedView>
          );
    }


};

export default GradientText;