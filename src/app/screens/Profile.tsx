import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🙋‍♂️ 내 프로필</Text>
      <Text style={styles.subtitle}>프로필 정보와 설정을 관리하세요.</Text>
    </View>
  );
};

export default Profile;

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
