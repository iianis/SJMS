import { StyleSheet, View, TextInput } from 'react-native';

import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
// in order use fonts add following 2 lines to android/app/build.gradle
//project.ext.vectoricons = [iconFontNames: ['MaterialIcons.ttf', 'EvilIcons.ttf', 'Feather.ttf']]
//apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

const Search = ({ item }) => {
  return (
    <View style={styles.container}>
      <Feather
        name="search"
        size={30}
        color="grey"
        style={styles.imageSearch}
      />
      <TextInput style={styles.input} placeholder={item.placeHolder} />
      <Icon name="cancel" size={30} color="grey" style={styles.imageCancel} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: { width: '85%', flexDirection: 'row' },
  imageSearch: { marginTop: 15, marginRight: 5 },
  imageCancel: { marginTop: 15, marginLeft: 5 },
  input: {
    backgroundColor: 'lightgrey',
    width: '90%',
    borderRadius: 5,
    marginTop: 5,
    fontSize: 18,
    paddingLeft: 10,
  },
});
