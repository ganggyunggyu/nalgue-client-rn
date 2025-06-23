import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Log = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 새 기록 작성</Text>
      <Text style={styles.subtitle}>오늘의 감성을 남겨보세요.</Text>
    </View>
  );
};

export default Log;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F4E3',
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { marginTop: 12, fontSize: 16, color: '#555' },
});
