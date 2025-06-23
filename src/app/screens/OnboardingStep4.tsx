import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
  FlipInXUp,
  FlipOutXUp,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useOnboardingStore } from '../../store/useOnboardingStore';

const MOODS = [
  '행복해요',
  '설레요',
  '우울해요',
  '평온해요',
  '지쳤어요',
  '화나요',
  '외로워요',
  '기대돼요',
];

export const OnboardingStep4 = () => {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const setPreferences = useOnboardingStore((s) => s.setPreferences);
  const nextStep = useOnboardingStore((s) => s.nextStep);

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood],
    );
  };

  const handleComplete = () => {
    if (selectedMoods.length === 0) {
      alert('기분 하나만이라도 선택해주세요!');
      return;
    }

    // 👉 선택 저장하고 Feedback View 보여줌
    setPreferences(selectedMoods);
    setShowFeedback(true);

    // 2초 후 Home 이동
    setTimeout(() => {
      nextStep();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 기분을 선택하세요</Text>

      <FlatList
        data={MOODS}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <Animated.View
            layout={LinearTransition.springify()}
            entering={ZoomIn.springify()}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.moodCard,
                selectedMoods.includes(item) && styles.moodSelected,
              ]}
              onPress={() => toggleMood(item)}
            >
              <BlurView
                tint="light"
                intensity={50}
                style={StyleSheet.absoluteFill}
              />
              <Text
                style={[
                  styles.moodText,
                  selectedMoods.includes(item) && styles.moodTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      <Animated.View
        style={styles.selectedWrapper}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        >
          {selectedMoods.map((mood) => (
            <Animated.View
              key={mood}
              style={styles.selectedTag}
              entering={FlipInXUp}
              exiting={FlipOutXUp}
            >
              <Text style={styles.selectedTagText}>{mood}</Text>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>

      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.completeText}>기록 시작하기</Text>
      </TouchableOpacity>

      {/* ✅ 선택된 기분 피드백 모달 */}
      {showFeedback && (
        <Animated.View
          style={styles.feedbackOverlay}
          entering={SlideInUp.springify()}
          exiting={SlideOutDown}
        >
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackTitle}>✨ 이런 기분이군요!</Text>
            <View style={styles.feedbackMoods}>
              {selectedMoods.map((m) => (
                <Text key={m} style={styles.feedbackMood}>
                  {m}
                </Text>
              ))}
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE8D8',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#3B3A36',
    textAlign: 'center',
    marginTop: 20,
  },
  moodCard: {
    flex: 1,
    margin: 10,
    paddingVertical: 30,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3B3A36',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  moodSelected: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    transform: [{ rotateX: '5deg' }],
  },
  moodText: {
    fontSize: 18,
    color: '#3B3A36',
  },
  moodTextSelected: {
    fontWeight: 'bold',
  },
  selectedWrapper: {
    marginTop: 30,
    height: 50,
  },
  selectedTag: {
    backgroundColor: '#D9CAB3',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  selectedTagText: {
    color: '#3B3A36',
    fontWeight: '600',
  },
  completeButton: {
    marginTop: 40,
    backgroundColor: '#3B3A36',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  completeText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  // ✅ 피드백 오버레이 스타일
  feedbackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackBox: {
    backgroundColor: '#F4F1EA',
    padding: 30,
    borderRadius: 24,
    alignItems: 'center',
    width: '80%',
  },
  feedbackTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3B3A36',
    marginBottom: 16,
  },
  feedbackMoods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  feedbackMood: {
    backgroundColor: '#D9CAB3',
    color: '#3B3A36',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
    fontWeight: '600',
  },
});
