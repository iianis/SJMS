import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

const WorkInProgress = ({ route }) => {
  const item = route.params?.item;
  return (
    <View style={[styles.container]}>
      <View>
        <Image
          source={require('../images/appbackground.jpeg')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View style={styles.labelFloatAtBottom}>
        <Text style={styles.textFloatAtBottom}>We are working on this idea.
          Please feel free to contact us in case you have any suggestions.</Text>
      </View>
      <View style={styles.labelFloatAtTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textFloatAtTop}>{item?.title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  labelFloatAtBottom: {
    position: 'absolute',
    bottom: 50,
    paddingHorizontal: 10
  }, textFloatAtBottom: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  labelFloatAtTop: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 10
  },
  textFloatAtTop: {
    color: 'red',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 120
  }
});

export default WorkInProgress;
