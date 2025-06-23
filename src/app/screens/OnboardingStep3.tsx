import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { Ionicons } from '@expo/vector-icons'; // ✅ 아이콘 사용

// ✅ 장르 리스트 (이미지는 임시, 로컬 가능)
const GENRES = [
  { name: 'Chill', icon: '🌿' },
  { name: 'Jazz', icon: '🎷' },
  { name: 'Indie', icon: '🎸' },
  { name: 'Rock', icon: '🤘' },
  { name: 'City Pop', icon: '🏙️' },
  { name: 'Hip-hop', icon: '🎤' },
  { name: 'Ballad', icon: '💧' },
];

export const OnboardingStep3 = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const setPreferences = useOnboardingStore((s) => s.setPreferences);
  const nextStep = useOnboardingStore((s) => s.nextStep);

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const handleComplete = () => {
    if (selected.length === 0) {
      alert('최소 하나 선택해주세요!');
      return;
    }
    setPreferences(selected);
    nextStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 당신의 음악 취향은?</Text>

      <FlatList
        data={GENRES}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 30 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.name);
          return (
            <TouchableOpacity
              onPress={() => toggle(item.name)}
              activeOpacity={0.9}
              style={[styles.card, isSelected && styles.cardSelected]}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.genreText}>{item.name}</Text>

              {isSelected && (
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={18} color="#3B3A36" />
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const CARD_SIZE = 140;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE8D8',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#3B3A36',
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 24,
    textAlign: 'center',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 20,
    backgroundColor: '#F4F1EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    position: 'relative',
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#3B3A36',
    backgroundColor: '#D9CAB3',
  },
  icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  genreText: {
    fontSize: 16,
    color: '#3B3A36',
    fontWeight: '600',
  },
  checkCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#EFE8D8',
    borderRadius: 12,
    padding: 2,
  },
  button: {
    backgroundColor: '#3B3A36',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#EFE8D8',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
