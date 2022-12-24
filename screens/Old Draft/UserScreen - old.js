import React, {useRef} from "react";
import { Text, View, Animated, PanResponder, Dimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

const Open = height - 230;
const Peek = 500;
const Closed = 0;

const HorizontalLine = () => {
	return (<View style = {{
  	backgroundColor: 'blue'}}
 	></View>
	)
}

const animateMove = (
	y,
	toValue,
  ) => {
	Animated.spring(y, {
	  toValue: toValue,
	  tension: 20,
	  useNativeDriver: true,
	})
  };
  
const getNextState = (
	currentState,
	val,
	margin,
  ) => {
	switch (currentState) {
	  case Peek:
		// alert(0)
		return val >= currentState + margin
		  ? Open
		  : val <= Peek - margin
		  ? Closed
		  : Peek;
	  case Open:
		// alert(1)
		return val >= currentState
		  ? Open
		  : val <= Peek
		  ? Closed
		  : Peek;
	  case Closed:
		// alert(2)
		return val >= currentState + margin
		  ? val <= Peek + margin
			? Peek
			: Open
		  : Closed;
	  default:
		// alert(3)
		return currentState;
	}
  };


const UserScreen = ( {children,
	onDrawerStateChange,}) => {
	const { height } = Dimensions.get('window');
	/* Declare initial value of y. In this case, we want it to be closed when the component is closed */
	let y = new Animated.Value(Closed);
	/* Declare another variable to keep track of the state. We need a separate variable for this because y will also change whilst the user is in the process of moving the drawer up or down */
	let state = new Animated.Value(Closed);
	const margin = 0.05 * height;
	const movementValue = (moveY) => height - moveY;
	/* This event is triggered when the animated view is moving. We want the user to be able to drag/swipe up or down and the drawer should move simultaneously. */
	const onPanResponderMove = (evt, gestureState) => {
		const val = movementValue(gestureState.dy);
		y.setValue(gestureState.dy)
		//animateMove(y, val);
	};

	/* Here is where we snap the drawer to the desired state - open, peek or closed */
	const onPanResponderRelease = (evt, gestureState) => {
		const valueToMove = movementValue(gestureState.dy);
		const nextState = getNextState(state._value, valueToMove, margin);
		y.setValue(gestureState.dy)
		state.setValue(nextState);
		animateMove(y, nextState);
	  };

	/* This determines if the responder should do something. In this scenario, it is set to true when the distance moved by Y is greater than or equal to 10, or lesser than or equal to -10. */
	const onMoveShouldSetPanResponder = (evt, gestureState) => Math.abs(gestureState.dy) >= 10;

	/* Here we're creating a panResponder object and assigning th event handlers to it. */
	const panResponder = PanResponder.create({
		  onMoveShouldSetPanResponder,
		  onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
		  onPanResponderMove,
		  onPanResponderRelease,
		})

	return (
		<Animated.View
		style={[
		  {
			width: '100%',
			height: height,
			backgroundColor: '#fff',
			borderRadius: 25,
			position: 'absolute',
			bottom: -height + 30,
			transform: [{ translateY: y }],
		  },
		]}
		{...panResponder.panHandlers}>
			
		<HorizontalLine />
		
	  </Animated.View>
	);
};



UserScreen.navigationOptions = (navData) => {
return {
	headerTitle: navData.navigation.getParam("username"),
};
};

export default UserScreen;
