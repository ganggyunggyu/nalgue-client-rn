import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput, // 💡 타입용으로 import
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useOnboardingStore } from '../../store/useOnboardingStore';

export const OnboardingStep1 = () => {
  const setPhone = useOnboardingStore((s) => s.setPhone);
  const nextStep = useOnboardingStore((s) => s.nextStep);

  const [part1, setPart1] = useState('');
  const [part2, setPart2] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  const input1Ref = useRef<RNTextInput>(null);
  const input2Ref = useRef<RNTextInput>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    input1Ref.current?.focus();
  }, []);

  useEffect(() => {
    if (part1.length === 4) input2Ref.current?.focus();
  }, [part1]);

  useEffect(() => {
    if (part1.length === 4 && part2.length === 4) handleComplete();
  }, [part1, part2]);

  const handleComplete = () => {
    const fullNumber = `010${part1}${part2}`;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowBadge(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        // 애니 끝나면 nextStep
        setPhone(fullNumber);
        setTimeout(() => {
          nextStep();
        }, 1000);
      });
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>휴대폰 번호를 입력해주세요</Text>

      {!showBadge ? (
        <View style={styles.inputRow}>
          <View style={styles.inputFixed}>
            <Text style={styles.inputFixedText}>010</Text>
          </View>

          <TextInput
            ref={input1Ref}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={4}
            value={part1}
            onChangeText={(t) => setPart1(t.replace(/[^0-9]/g, ''))}
          />

          <TextInput
            ref={input2Ref}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={4}
            value={part2}
            onChangeText={(t) => setPart2(t.replace(/[^0-9]/g, ''))}
          />
        </View>
      ) : (
        <Animated.View
          style={[
            styles.badge,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.badgeText}>
            ✅ 010-{part1}-{part2}
          </Text>
        </Animated.View>
      )}

      {loading && (
        <ActivityIndicator
          size="large"
          color="#3B3A36"
          style={{ marginTop: 30 }}
        />
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
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 22,
    marginBottom: 40,
    color: '#3B3A36',
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFixed: {
    backgroundColor: '#D9CAB3',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    marginRight: 8,
  },
  inputFixedText: {
    color: '#3B3A36',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 80,
    backgroundColor: '#fff',
    borderColor: '#3B3A36',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 18,
  },
  badge: {
    backgroundColor: '#D9CAB3',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  badgeText: {
    color: '#3B3A36',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
