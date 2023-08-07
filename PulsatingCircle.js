import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const PulsatingCircle = () => {
  const scaleValue = new Animated.Value(0.8);

  const animatePulse = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 1000,
        easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 1250,
        easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
        useNativeDriver: true,
      }),
    ]).start(() => animatePulse());
  };

  React.useEffect(() => {
    animatePulse();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ scale: scaleValue }] }]}>
        <Text style={styles.centerText}>hi</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#454a59',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 70,
    backgroundColor: '#c2e901',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    color: 'hotpink',
    fontSize: 20,
  },
});

export default PulsatingCircle;










