import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//import {member} from './data/members';

const MemberCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text>Name: Anis shiklagar</Text>
      </View>
    </View>
  );
};

export default MemberCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardHeader: {fontSize: 16, color: 'red', paddingBottom: 5},
  cardLine1: {fontSize: 16, color: 'red', paddingBottom: 5},
  cardLine2: {fontSize: 16, color: 'red', paddingBottom: 5},
});
