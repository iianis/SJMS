//rnfes
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import SlideItem from './SlideItem';

const Slider = () => {
  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        data={sliderImages}
        renderItem={({ item }) => <SlideItem item={item} />}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});

const sliderImages = [
  require('../images/logo.jpg'),
  require('../images/index.jpg'),
  require('../images/slider/image2.jpg'),
  require('../images/slider/image4.jpg'),
];
