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
  const [donationData, setDonationData] = useState([{
    name: '',
    phone: '',
    taluka: '',
    village: '',
    amount: 0,
    donationType: '',
    date: '',
  }]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getDonations();
  }, []);

  const getDonations = async () => {
    console.log('get donations like.. ', searchText);
    setLoading(true);
    await firestore()
      .collection('donations')
      .orderBy('donationType', 'desc')
      .where('donationType', '>=', searchText)
      .where('donationType', '<=', searchText + '\uf8ff')
      .limit(10)
      .get()
      .then(res => {
        if (res && res.docs) {
          //console.log('has data: ', res.docs.length);
          let docs =
            res.docs.map(doc => {
              console.log('has data: ');
              const data = doc._data;
              const id = doc.id;
              return { id, ...data }
            })
          setDonationData(docs);
        } else {
          console.log('has no data');
        }
        setLoading(false);
      });
  };

  const FilterBySearch = (text: string) => {
    console.log("searching..", text);
    setSearchText(text);
    getDonations();
  }

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <CustomButton title="Add New" onPress={() => navigation.navigate('DonationsNew')} />
      <CustomFlatList data={donationData} selectedId={selectedId} />
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
