import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const WorkInProgress = () => {
  return (
    <View style={[styles.container, { flexDirection: 'column' }]}>
      <View style={{ flex: 2, backgroundColor: '#0A5689' }}>
        <Image
          source={require('../images/workInProgress.jpg')}
          style={{ width: '100%', height: '50%' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
  },
});

export default WorkInProgress;
