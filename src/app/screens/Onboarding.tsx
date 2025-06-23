import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useOnboardingStore } from '../../store/useOnboardingStore';

import OnboardingStart from './OnboardingStart'; // 기존 Onboarding → 이름 바꿔줌
import { OnboardingStep1 } from './OnboardingStep1';
import { OnboardingStep2 } from './OnboardingStep2';
import { OnboardingStep3 } from './OnboardingStep3';
import { OnboardingStep4 } from './OnboardingStep4';
import { OnboardingStep5 } from './OnboardingStep5';
import { OnboardingFinal } from './OnboardingFinal';

const Stack = createNativeStackNavigator();

export default function Onboarding() {
  const step = useOnboardingStore((s) => s.step);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {step === 0 && (
        <Stack.Screen name="OnboardingStart" component={OnboardingStart} />
      )}
      {step === 1 && (
        <Stack.Screen name="OnboardingStep1" component={OnboardingStep1} />
      )}
      {step === 2 && (
        <Stack.Screen name="OnboardingStep2" component={OnboardingStep2} />
      )}
      {step === 3 && (
        <Stack.Screen name="OnboardingStep3" component={OnboardingStep3} />
      )}
      {step === 4 && (
        <Stack.Screen name="OnboardingStep4" component={OnboardingStep4} />
      )}
      {step === 5 && (
        <Stack.Screen name="OnboardingStep5" component={OnboardingStep5} />
      )}
      {step === 6 && (
        <Stack.Screen name="OnboardingFinal" component={OnboardingFinal} />
      )}
    </Stack.Navigator>
  );
}
