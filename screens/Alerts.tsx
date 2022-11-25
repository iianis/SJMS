import React, {useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import Search from '../components/Search';

const Alerts = ({navigation}) => {
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
    const backgroundColor = item.id === selectedId ? '#F9D162' : '#F4944F';
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
          data={alerts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

export default Alerts;

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

export interface alert {
  id: number;
  title: string;
  desc: string;
  active: boolean;
  date: string;
}

export const alerts: alert[] = [
  {
    id: 1,
    title: 'Emergency Meeting',
    desc: 'To decide AGM agenda and finalize board members. Venue: Mrs Shamimbi Shikalgar Residence, Rukhmini Garden',
    active: true,
    date: '13/11/2022',
  },
  {
    id: 2,
    title: 'Annual General Meeting',
    desc: 'Venue: Hotel Shahi, Karad',
    active: true,
    date: '23/1/2022',
  },
];
