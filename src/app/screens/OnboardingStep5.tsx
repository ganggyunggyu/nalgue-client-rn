// src/app/screens/OnboardingStep5.tsx

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useOnboardingStore } from '../../store/useOnboardingStore';

export const OnboardingStep5 = () => {
  const [name, setNameInput] = useState('');
  const inputRef = useRef<TextInput>(null);

  const setName = useOnboardingStore((s) => s.setName);
  const nextStep = useOnboardingStore((s) => s.nextStep);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleComplete = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요!');
      return;
    }
    Keyboard.dismiss();
    setName(name.trim());
    nextStep();
  };

  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(600)}
      exiting={FadeOut.duration(400)}
    >
      <Text style={styles.title}>당신을 뭐라고 부를까요?</Text>

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="이름을 입력하세요"
        value={name}
        onChangeText={setNameInput}
        maxLength={10}
      />

      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE8D8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#3B3A36',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#3B3A36',
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3B3A36',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
