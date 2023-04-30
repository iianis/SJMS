import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import Search from '../components/Search';

import firestore from '@react-native-firebase/firestore';
import CustomFlatList from '../components/CustomFlatList';

const Alerts = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      getEvents();
    });
  }, []);

  const getEvents = async () => {
    setLoading(true);
    setEventsData([]);

    await firestore()
      .collection('events')
      .orderBy('name')
      .limit(50)
      .get()
      .then(eventSnapshot => {
        eventSnapshot.forEach(doc => {
          if (doc?.exists) {
            let itemDoc = doc.data();
            itemDoc.id = doc.id;
            setEventsData(events => [...events, itemDoc]);

          } else {
            console.log("Error getEvents: Invalid Document");
          }
        });
        setLoading(false);
      });
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.eventType}</Text>
      <View style={styles.cardRow2}>
        <Text style={[styles.title2, textColor]}>Description: {item.desc}</Text>
      </View>
      <View style={styles.cardRow3}>
        <Text style={[styles.title2, textColor]}>Date: {item.eventDate}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#F9D162' : '#F4944F';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <View>
        <Search item={{ placeHolder: 'Search by any detail' }} />
      </View>
      <CustomButton title="Add New" onPress={() => navigation.navigate('AlertsNew', { item: null })} />
      <CustomFlatList data={eventsData} selectedId={selectedId} onSelect={(item) => { handleListSelection(item); }} />
    </View>
  );
};

const handleListSelection = (item) => {
  //console.log("list item selected ", item);
  navigation.navigate('AlertsNew', { item: item });
};
export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 150,
    height: 500,
  },
  cardContainer: {
    width: '100%'
  },
  tile1: {
    backgroundColor: 'red',
    height: 150,
    width: '50%',
    padding: 5,
  },
  item: {
    padding: 10,
    marginBottom: 5,
    marginHorizontal: 0,
    flexDirection: 'row',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
  },
  title2: {
    fontSize: 18,
  },
  title3: {
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
});

