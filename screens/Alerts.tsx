import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import Search from '../components/Search';

import firestore from '@react-native-firebase/firestore';
import CustomFlatList from '../components/CustomFlatList';
import { dBTable } from '../data/misc';

const Alerts = ({ navigation, route }) => {
  const loggedInUser = route.params.user;
  const [selectedId, setSelectedId] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uiDetails, setUIDetails] = useState({
    dbTable: "events", redirectComponent: 'AlertsNew'
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setSearchResult([]);
      setItemsData([]);
      getItems();
    });
    return unsubscribe;
  }, [navigation]);

  const getItems = async () => {
    setLoading(true);
    setItemsData([]);

    await firestore()
      .collection(dBTable(uiDetails.dbTable))
      .where('deleted', '==', false)
      .where('eventDate', '>=', new Date())
      .orderBy('eventDate', 'desc')
      .limit(50)
      .get()
      .then(eventSnapshot => {
        eventSnapshot.forEach(doc => {
          if (doc?.exists) {
            let itemDoc = doc.data();
            itemDoc.id = doc.id;
            setItemsData(events => [...events, itemDoc]);
            setSearchResult(events => [...events, itemDoc]);

          } else {
            console.log("Error getEvents: Invalid Document");
          }
        });
        setLoading(false);
      });
  };

  const handleListSelection = (item) => {
    navigation.navigate(uiDetails.redirectComponent, { item: item, user: loggedInUser });
  };

  const filterBySearch = (input: string) => {
    let searchResult = itemsData.filter(item => {

      return item.name.toLowerCase().includes(input.toLocaleLowerCase()) ||
        item.description.toLowerCase().includes(input.toLocaleLowerCase()) ||
        item.location.toLowerCase().includes(input.toLocaleLowerCase());
    });
    //console.log('searchResult', searchResult.length);
    setSearchResult(searchResult);
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <View>
        <Search
          PlaceHolder='Search by Details'
          FilterBySearch={(search: string) => { filterBySearch(search) }}
        />
      </View>
      {loggedInUser.accessLevel > 1 && <CustomButton title="Add New" onPress={() => navigation.navigate(uiDetails.redirectComponent, { item: null, user: loggedInUser })} />}
      <CustomFlatList data={searchResult} selectedId={selectedId} onSelect={(item) => { handleListSelection(item); }} />
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 5,
  },
});


