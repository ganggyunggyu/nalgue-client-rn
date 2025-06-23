import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useOnboardingStore } from '../../store/useOnboardingStore';

export const OnboardingStep2 = () => {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const nextStep = useOnboardingStore((s) => s.nextStep);

  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);

  useEffect(() => {
    if (code1.length === 1) ref2.current?.focus();
  }, [code1]);

  useEffect(() => {
    if (code2.length === 1) ref3.current?.focus();
  }, [code2]);

  useEffect(() => {
    if (code3.length === 1) ref4.current?.focus();
  }, [code3]);

  useEffect(() => {
    if ([code1, code2, code3, code4].every((c) => c.length === 1)) {
      handleVerify();
    }
  }, [code4]);

  const handleVerify = () => {
    const inputCode = `${code1}${code2}${code3}${code4}`;
    if (inputCode === '1111') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setVerified(true);
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => nextStep(), 800);
        });
      }, 1000);
    } else {
      alert('인증번호가 올바르지 않습니다.');
      setCode1('');
      setCode2('');
      setCode3('');
      setCode4('');
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#3B3A36" />}
      {!loading && !verified && (
        <>
          <Text style={styles.title}>인증번호 4자리를 입력하세요</Text>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={code1}
              onChangeText={setCode1}
              autoFocus
            />
            <TextInput
              ref={ref2}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={code2}
              onChangeText={setCode2}
            />
            <TextInput
              ref={ref3}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={code3}
              onChangeText={setCode3}
            />
            <TextInput
              ref={ref4}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              value={code4}
              onChangeText={setCode4}
            />
          </View>
        </>
      )}

      {verified && (
        <Animated.View
          style={[styles.checkCircle, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.checkMark}>✅</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE8D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 20, marginBottom: 24, color: '#3B3A36' },
  inputs: {
    flexDirection: 'row',
    gap: 16,
  },
  input: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#3B3A36',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D9CAB3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    fontSize: 40,
  },
});
