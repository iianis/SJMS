import React, {useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import {district, districts} from '../data/members';

const Districts = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <View>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
        <View style={styles.cardRow2}>
          <Text style={[styles.title2, textColor]}>
            Talukas: {item.talukas}
            <Text style={[styles.title2, textColor]}>
              , Population: {item.population}
            </Text>
          </Text>
        </View>
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
          navigation.navigate('Talukas', {item: item});
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  /*let [searchResult, setSearchResult] = useState[];

  const filterBySearch = (input: string) => {
    searchResult = districts.filter(item => {
      return item.name.toLowerCase().includes(input.toLocaleUpperCase());
    });
    setSearchResult(searchResult);
  };*/

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={districtInfo}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

export default Districts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  tile1: {
    backgroundColor: 'red',
    height: 150,
    width: '50%',
    padding: 5,
  },
  item: {
    padding: 25,
    marginVertical: 5,
    marginHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 30,
  },
  title2: {
    fontSize: 18,
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
    marginTop: 5,
    width: '100%',
  },
});

const districtInfo: district[] = districts;
