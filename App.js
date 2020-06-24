import {View} from 'react-native';
import React from 'react';
import PanGesture from './PanGesture';
import RotateTransition from './Transitions';
import CircularSlider from './CircularSlider/CircularSlider';

const AnimatedStyleUpdateExample = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'lightgrey'}}>
      {/*<PanGesture/>*/}
      <RotateTransition/>
      {/*<CircularSlider/>*/}
    </View>
  );
};

export default AnimatedStyleUpdateExample;
