import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyLogs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 내 기록</Text>
      <Text style={styles.subtitle}>기록한 모든 감성을 모아볼까요?</Text>
    </View>
  );
};

export default MyLogs;

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
