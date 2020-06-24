import React from 'react';
import Card, {CARD_WIDTH, ICard} from '../Card/Card';
import {StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

interface Props {
  card: ICard;
  index: number;
  transition: any;
}

const AnimatedCard: React.FC<Props> = ({card, transition, index}) => {
  const style = useAnimatedStyle(() => {
    const rotate = interpolate(
      transition.value,
      [0, 1],
      [0, ((index - 1) * Math.PI) / 6],
    );
    return {
      transform: [
        {translateX: -CARD_WIDTH / 2},
        {rotate},
        {translateX: CARD_WIDTH / 2},
      ],
    };
  });
  return (
    <Animated.View style={[styles.overlay, style]}>
      <Card card={card} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedCard;
