import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import Search from '../components/Search';

import firestore from '@react-native-firebase/firestore';
import CustomFlatList from '../components/CustomFlatList';

const Alerts = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uiDetails, setUIDetails] = useState({
    dbTable: "events", redirectComponent: 'AlertsNew'
  });

  useEffect(() => {
    navigation.addListener('focus', async () => {
      getItems();
    });
  }, []);

  const getItems = async () => {
    setLoading(true);
    setItemsData([]);

    await firestore()
      .collection(uiDetails.dbTable)
      .where('deleted', '==', false)
      .orderBy('eventDate', 'desc')
      .limit(50)
      .get()
      .then(eventSnapshot => {
        eventSnapshot.forEach(doc => {
          if (doc?.exists) {
            let itemDoc = doc.data();
            itemDoc.id = doc.id;
            setItemsData(events => [...events, itemDoc]);

          } else {
            console.log("Error getEvents: Invalid Document");
          }
        });
        setLoading(false);
      });
  };

  const handleListSelection = (item) => {
    navigation.navigate(uiDetails.redirectComponent, { item: item });
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <View>
        <Search item={{ placeHolder: 'Search by any detail' }} />
      </View>
      <CustomButton title="Add New" onPress={() => navigation.navigate(uiDetails.redirectComponent, { item: null })} />
      <CustomFlatList data={itemsData} selectedId={selectedId} onSelect={(item) => { handleListSelection(item); }} />
    </View>
  );
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


