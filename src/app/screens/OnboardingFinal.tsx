// src/app/screens/OnboardingFinal.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { useOnboardingStore } from '../../store/useOnboardingStore';

export const OnboardingFinal = () => {
  const nextStep = useOnboardingStore((s) => s.nextStep);

  useEffect(() => {
    // 3초 뒤 자동 Home 이동
    const timer = setTimeout(() => {
      nextStep(); // step > 6 -> Home 이동
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(800)}
      exiting={FadeOut.duration(500)}
    >
      <Animated.Text
        entering={ZoomIn.springify()}
        exiting={ZoomOut}
        style={styles.title}
      >
        🎉 날그에 오신 걸 환영해요 🎉
      </Animated.Text>
      <Text style={styles.subtitle}>당신의 하루를 기록해보세요</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#3B3A36',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    color: '#6E6658',
  },
});
