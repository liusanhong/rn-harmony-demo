import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>首页</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TestDetail')}>
        <Text style={styles.buttonText}>跳转测试详情页</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  text: {
    fontSize: 16,
    color: 'red',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#00CB8A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
