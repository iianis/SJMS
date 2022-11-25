import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Slider from '../components/Slider';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Slider />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>
          Let us stay connected with our community.
        </Text>
        <Text style={styles.title2}>THE SHIKALGAR's</Text>
        <Text style={styles.textSign}>Sign in with your mobile number.</Text>
        <Button
          title="Get started"
          color="#009387"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  textSign: {
    fontSize: 12,
    //fontWeight: 'bold',
    color: 'grey',
    paddingBottom: 10,
  },
  button: {width: 200, borderRadius: 10},
});
