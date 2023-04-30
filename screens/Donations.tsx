//Member, Registration, Education, Widow Empowerment, Qurbani, Jakat,
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, LogBox } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CustomFlatList from '../components/CustomFlatList';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';

const Donations = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [donationsData, setDonationsData] = useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    navigation.addListener('focus', async () => {
      setDonationsData([]);
      getDonations();
    });
  }, []);

  const getDonations = async () => {
    //console.log('get donations like.. ', searchText);
    setLoading(true);
    await firestore()
      .collection('donations')
      .where('deleted', '==', false)
      .orderBy('receivedOn', 'desc')
      //.where('donationType', '>=', searchText)
      //.where('donationType', '<=', searchText + '\uf8ff')
      .limit(50)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc?.exists) {
            let donationDoc = doc.data();
            donationDoc.id = doc.id;
            setDonationsData(donations => [...donations, donationDoc]);
          } else {
            console.log('No records found!');
          }
          setLoading(false);
        });
        setLoading(false);
      });
  };

  const FilterBySearch = (text: string) => {
    console.log("searching..", text);
    setSearchText(text);
    getDonations();
  }

  const handleListSelection = (item) => {
    //console.log("list item selected ", item);
    navigation.navigate('DonationsNew', { item: item });
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <CustomButton title="Add New" onPress={() => navigation.navigate('DonationsNew', { item: null })} />
      <CustomFlatList data={donationsData} selectedId={selectedId} onSelect={(item) => { handleListSelection(item); }} />
    </View>
  );
};

export default Donations;

const styles = StyleSheet.create({
  textHeader: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  textFooter: { fontSize: 16 },
  textInfo: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  button: {
    fontSize: 16, fontWeight: 'bold',
    borderRadius: 5,
    width: 80,
    height: 30,
    backgroundColor: 'lightgreen',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16, fontWeight: 'bold',
  },
  formHeader: {
    fontSize: 20,
    marginVertical: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
  dropdown: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
