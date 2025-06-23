// src/app/screens/Home.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useOnboardingStore } from '../../store/useOnboardingStore';

const Home = () => {
  const { name, phone, preferences } = useOnboardingStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome Home 🏠</Text>
      <Text style={styles.subtitle}>온보딩 정보를 불러왔어요 🎉</Text>

      <ScrollView contentContainerStyle={styles.infoBox}>
        <Text style={styles.label}>이름</Text>
        <Text style={styles.value}>{name || '-'}</Text>

        <Text style={styles.label}>휴대폰 번호</Text>
        <Text style={styles.value}>{phone || '-'}</Text>

        <Text style={styles.label}>선택한 태그 / 기분</Text>
        <View style={styles.tagsWrap}>
          {preferences.length > 0 ? (
            preferences.map((pref) => (
              <View key={pref} style={styles.tag}>
                <Text style={styles.tagText}>{pref}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.value}>-</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30,
  },
  infoBox: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  label: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#D9CAB3',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  tagText: {
    color: '#3B3A36',
    fontWeight: '600',
  },
});
