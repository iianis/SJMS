import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import Search from '../components/Search';

const Schemes = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <View style={styles.cardRow2}>
        <Text style={[styles.title2, textColor]}>Description: {item.desc}</Text>
        <Text style={[styles.title2, textColor]}>, {item.active}</Text>
      </View>
      <View style={styles.cardRow3}>
        <Text style={[styles.title2, textColor]}>
          Dates: {item.applicationOpenDate}, {item.applicationCloseDate}
        </Text>
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
        <Search item={{placeHolder: 'Search by Scheme Name'}} />
      </View>
      <View>
        <FlatList
          data={schemes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

export default Schemes;

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

export interface scheme {
  id: number;
  title: string;
  desc: string;
  active: boolean;
  applicationOpenDate: string;
  applicationCloseDate: string;
}

export const schemes: scheme[] = [
  {
    id: 1,
    title: 'Maulana Azad Minorities financial development corporation',
    desc: '29, Shahid Bhagat Singh Marg, Kala Ghoda, Fort, Mumbai. Contact: 022 2267 2293',
    active: true,
    applicationOpenDate: '1/12/2022',
    applicationCloseDate: '31/12/2022',
  },
  {
    id: 2,
    title: 'Nationalized Bank Loan',
    desc: 'MH',
    active: true,
    applicationOpenDate: '1/12/2022',
    applicationCloseDate: '31/12/2022',
  },
  {
    id: 3,
    title: 'Savitribai Phule Scholaship',
    desc: 'Pune',
    active: true,
    applicationOpenDate: '1/12/2022',
    applicationCloseDate: '31/12/2022',
  },
];
