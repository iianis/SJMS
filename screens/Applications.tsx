import React, {useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import Search from '../components/Search';

const Applications = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <View style={styles.cardRow2}>
        <Text style={[styles.title2, textColor]}>Description: {item.desc}</Text>
        <Text style={[styles.title2, textColor]}>, {item.active}</Text>
      </View>
      <View style={styles.cardRow3}>
        <Text style={[styles.title2, textColor]}>Dates: {item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#F9D162' : '#009387';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          //navigation.navigate('MemberDetails', {item: item});
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Search item={{placeHolder: 'Search by any detail'}} />
      </View>
      <View>
        <FlatList
          data={applications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

export default Applications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  tile1: {
    backgroundColor: 'red',
    height: 150,
    width: '50%',
    padding: 5,
  },
  item: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 30,
  },
  title2: {
    fontSize: 16,
  },
  cardRow2: {
    flex: 1,
    flexDirection: 'row',
    color: 'lightgrey',
  },
  cardRow3: {
    flex: 1,
    flexDirection: 'row',
    color: 'lightgrey',
  },
  textInput: {
    borderBottomColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export interface application {
  id: number;
  title: string;
  desc: string;
  active: boolean;
  date: string;
}

export const applications: application[] = [
  {
    id: 1,
    title: 'Medical Help',
    desc: 'My family is facing some medical situation and we need some financial help. Total expenses Rs.25000/- . From: Mr. Kabeer M S, Shenoli',
    active: true,
    date: '13/11/2022',
  },
  {
    id: 2,
    title: 'Cast Certificate',
    desc: 'Kindly issue a cast certificate for my son Master Junaid M Shikalgar. All documents handed over to Mr Rafiqbhai Shikalgar, Goleshwar',
    active: true,
    date: '23/1/2022',
  },
  {
    id: 3,
    title: 'Education Fund',
    desc: 'Kindly consider our request to fulfill my sons admission fees Rs.2500/- Master Muneer Shikalgar, Wardhangad. All documents handed over to Mr Rafiqbhai Shikalgar',
    active: true,
    date: '23/1/2022',
  },
];
