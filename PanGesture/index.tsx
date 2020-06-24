import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Card, {CARD_HEIGHT, CARD_WIDTH, cards} from '../components/Card/Card';
import {withDecay} from '../components/AnimatedHelpers';
import {clamp} from '../components/Math';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - 100;

const PanGesture = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX;
      translateY.value = ctx.offsetY + event.translationY;
      // translateX.value = clamp(
      //   ctx.offsetX + event.translationX,
      //   0,
      //   width - CARD_WIDTH,
      // );
      // translateY.value = clamp(
      //   ctx.offsetY + event.translationY,
      //   50,
      //   height - CARD_HEIGHT,
      // );
    },
    onEnd: (event, ctx) => {
      // translateX.value =
      //   translateX.value < 0
      //     ? 0
      //     : translateX.value > width - CARD_WIDTH
      //     ? width - CARD_WIDTH
      //     : translateX.value;
      // translateY.value =
      //   translateY.value < 0
      //     ? 0
      //     : translateY.value > height - CARD_HEIGHT
      //     ? height - CARD_HEIGHT
      //     : translateY.value;
      translateX.value = withDecay(
        event.velocityX < 0 ? 0 : width - CARD_WIDTH,
        {
          velocity: event.velocityX,
        },
      );
      translateY.value = withDecay(
        event.velocityY < 0 ? 0 : height - CARD_HEIGHT,
        {
          velocity: event.velocityY,
        },
      );
    },
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler {...{onGestureEvent}}>
        <Animated.View {...{style}}>
          <Card card={cards[0]} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
  },
});

export default PanGesture;
