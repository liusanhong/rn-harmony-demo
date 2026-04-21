// src/screens/mine/MineScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MineScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>我的</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFA',
  },
  text: {
    fontSize: 16,
    color: '#222222',
  },
});

export default MineScreen;
