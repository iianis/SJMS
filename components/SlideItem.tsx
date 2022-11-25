import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';

const SlideItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Image source={item} resizeMode="contain" style={styles.img} />
    </View>
  );
};

export default SlideItem;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
//const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  img: {
    width: WIDTH,
    height: HEIGHT * 0.6,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
});
