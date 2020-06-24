import React, {useState, useEffect} from 'react';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import AnimatedCard from '../components/AnimatedCard/AnimatedCard';
import Card, {cards} from '../components/Card/Card';
import {View, StyleSheet, Button} from 'react-native';

const RotateTransition: React.FC<{}> = () => {
  const [toggled, setToggle] = useState(false);
  const isToggled = useSharedValue(false);
  const transition = useDerivedValue(() => {
    return withSpring(isToggled.value);
  });

  useEffect(() => {
    isToggled.value = toggled;
  }, [toggled, isToggled]);

  return (
    <>
      <View style={styles.container}>
        {cards.map((card, index) => {
          return (
            <AnimatedCard
              key={index}
              index={index}
              card={card}
              transition={transition}
            />
          );
        })}
      </View>
      <View style={styles.button}>
        <Button
          title={toggled ? 'Reset' : 'Start'}
          onPress={() => setToggle(!toggled)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  button: {
    marginBottom: 50,
  },
});

export default RotateTransition;
