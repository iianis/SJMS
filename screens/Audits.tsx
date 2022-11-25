import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

const Audits = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/audit202122.jpg')}
        style={styles.image}
      />
    </View>
  );
};

export default Audits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: '100%',
    height: '90%',
  },
});
