import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useOnboardingStore } from '../../store/useOnboardingStore';

const OnboardingStart = () => {
  const setStep = useOnboardingStore((s) => s.setStep);
  const complete = useOnboardingStore((s) => s.completeOnboarding);

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.title}>📼 오늘, 날그</Text>
        <Text style={styles.subtitle}>감성을 기록해보세요</Text>

        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/992/992700.png',
          }}
          style={styles.image}
        />

        <TouchableOpacity
          style={[styles.button, styles.phone]}
          onPress={() => setStep(1)}
        >
          <Text style={styles.buttonText}>📱 휴대폰 번호로 시작하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.kakao]}
          onPress={complete}
        >
          <Text style={styles.buttonText}>카카오로 시작하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.apple]}
          onPress={complete}
        >
          <Text style={styles.buttonText}>Apple로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingStart;

// 기존 styles 그대로 사용.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7DED0', // 톤 다운된 레트로 배경
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  screen: {
    backgroundColor: '#F4F1EA', // 아이팟 스크린같은 밝은 베이스
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#5E5E5E',
    marginBottom: 24,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 14,
  },
  phone: {
    backgroundColor: '#D9CAB3', // 레트로 베이지
  },
  kakao: {
    backgroundColor: '#FEE500',
  },
  apple: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
});
