import * as React from "react";
import { View, Text, Animated, PanResponder, Dimensions, GestureResponderEvent, PanResponderGestureState } from "react-native";
// import Animated, { Easing } from "react-native-reanimated";
import styles from "./styles";

export default function BottomDrawer() {
  const { height } = Dimensions.get("window");
  const headerHeight = 28;
  // const [drawerHeight, setDrawerHeight] = React.useState(headerHeight);
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentHeightRef = React.useRef<number>();

  contentHeightRef.current = contentHeight;

  enum DrawerState {
    Open = contentHeightRef.current,
    Closed = 0,
  }

  const y = React.useRef(new Animated.Value(DrawerState.Closed)).current;
  const state = React.useRef(new Animated.Value(DrawerState.Closed)).current;
  const margin = 0.05 * height;
  const movementValue = (moveY: number) => height - moveY;

  const animateMove = (y: Animated.Value, toValue: number | Animated.Value, callback?: any) => {
    Animated.spring(y, {
      toValue: -toValue,
      tension: 20,
      useNativeDriver: true,
    }).start(finished => {
      finished && callback && callback();
    });
  };

  const getNextState = (currentState: DrawerState, val: number): DrawerState => {
    console.log('currentState', currentState);
    console.log('val', val);
    console.log('DrawerState.Open', DrawerState.Open);

    let ret: DrawerState;

    if(currentState == DrawerState.Open) {
      ret = val >= currentState ? DrawerState.Open : DrawerState.Closed;
    } else if(currentState == DrawerState.Closed) {
      ret = val >= currentState + margin ? DrawerState.Open : DrawerState.Closed;
    }

    console.log('nextState', ret);

    return ret;
  }

  const onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    { dy }: PanResponderGestureState,
  ) => Math.abs(dy) >= 10;

  const onPanResponderMove = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState,
  ) => {
    const val = movementValue(moveY);
    animateMove(y, val);
  };

  const onPanResponderRelease = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState,
  ) => {
    const valueToMove = movementValue(moveY);
    // @ts-ignore
    const nextState = getNextState(state._value, valueToMove);
    state.setValue(nextState);
    animateMove(y, nextState);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: 0 - contentHeight,
          // translateY: pan,
          transform: [{ translateY: y }],
        },
      ]}
      onLayout={event => {
        const { height } = event.nativeEvent.layout;

        // setDrawerHeight(height);
        setContentHeight(height - headerHeight);
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.horizontalLine} />
      <View style={styles.content}>
        <Text>Hello 1!</Text>
        <Text>Hello 2!</Text>
        <Text>Hello 3!</Text>
        <Text>Hello 4!</Text>
        <Text>Hello 5!</Text>
        <Text>Hello 6!</Text>
        <Text>Hello 6!</Text>
        <Text>Hello 6!</Text>
        <Text>Hello 6!</Text>
        <Text>Hello 6!</Text>
        <Text>Hello 6!</Text>
        <Text>Hello 6!</Text>
        <Text>Hello 6!</Text>
      </View>
    </Animated.View>
  );
}