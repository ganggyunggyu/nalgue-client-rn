import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Onboarding from './app/screens/Onboarding';
import { AppNavigator } from './app/AppNavigator';

import { useOnboardingStore } from './store/useOnboardingStore';

export default function App() {
  const step = useOnboardingStore((s) => s.step);

  return (
    <NavigationContainer>
      {step <= 6 ? <Onboarding /> : <AppNavigator />}
    </NavigationContainer>
  );
}
