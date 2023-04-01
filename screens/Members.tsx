import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image, Dimensions
} from 'react-native';
import Search from '../components/Search';
import firestore from '@react-native-firebase/firestore';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';

const Members = ({ navigation, route }) => {

  const { height, width } = Dimensions.get('window');
  const filter = route.params.filter;
  const [selectedId, setSelectedId] = useState(null);
  const [membersData, setMembersData] = useState([]);
  const [memberData, setMemberData] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    taluka: '',
    dob: '',
    village: '',
    occupation: 'Business',
    education: 'Graduate',
    memberType: 'Member',
    familyMembers: '2',
    fees: '0',
    requests: '',
    invitaions: '',
    certificate: '',
    donations: '0',
    active: true,
  });
  const [loading, setLoading] = useState(false);

  //console.log(item);
  useEffect(() => {
    //console.log('UseEffect ..');
    getMembers();
  }, []);

  const getMembers = async () => {
    setLoading(true);
    setMembersData([]);

    await firestore()
      .collection('members')
      .orderBy('name')
      .limit(50)
      .get()
      .then(memberSnapshot => {
        console.log(' total members: ' + memberSnapshot.size);
        memberSnapshot.forEach(doc => {
          if (doc?.exists) {
            let memberDoc = doc.data();
            memberDoc.id = doc.id;

            //console.log(' member name: ', memberDoc.name);
            if (memberDoc.memberType == filter) {
              //console.log('memberDoc type: ' + memberDoc.memberType + ", filter: " + filter);
              setMembersData(members => [...members, memberDoc]);
            } else if (filter && filter == "Member") {
              setMembersData(members => [...members, memberDoc]);
            } else if (filter && filter == "Director"
              && (memberDoc.memberType == "Director" ||
                memberDoc.memberType == "Secretary" ||
                memberDoc.memberType == "Treasurer" ||
                memberDoc.memberType == "President" ||
                memberDoc.memberType == "Vice-president")) {
              setMembersData(members => [...members, memberDoc]);
            }
            else {
              console.log('Else memberDoc type: ' + memberDoc.memberType + ", filter: " + filter);
            }
            //setDocumentId(doc.id);
          } else {
            console.log("Error getMembers: Invalid Document");
          }
        });
        setLoading(false);
      });
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <View>
        <Image
          source={require('../images/members/profile.jpg')}
          style={styles.itemImage}
        />
      </View>
      <View>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
        <View style={styles.cardRow2}>
          <Text style={[styles.title2, textColor]}>{item.memberType}</Text>
        </View>
        <View style={styles.cardRow2}>
          <Text style={[styles.title2, textColor]}>Taluka: {item.taluka}</Text>
        </View>
        <View style={styles.cardRow3}>
          <Text style={[styles.title3, textColor]}>Phone: {item.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#F9D162' : '#009387';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate('MemberNew', { item: item });
        }}
        key={Math.random().toString(36).toString(7)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  /*let [searchResult, setSearchResult] = useState[];

const filterBySearch = (input: string) => {
  searchResult = members.filter(item => {
    return item.name.toLowerCase().includes(input.toLocaleUpperCase());
  });
  setSearchResult(searchResult);
};*/

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <View>
        <Search item={{ placeHolder: 'Search by Name, Taluka, Phone' }} />
      </View>
      <CustomButton title="Add New" onPress={() => navigation.navigate('MemberNew', { item: null })} />
      <View style={[styles.cardContainer]}>
        <FlatList
          data={membersData}
          renderItem={renderItem}
          //keyExtractor={item => item.id}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

export default Members;

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

export interface member {
  id: number;
  salutation: string;
  name: string;
  taluka: string;
  memberType: string;
  phone: string;
  fees?: number;
}

export const members: member[] = [
  {
    id: 9997,
    salutation: 'Mr.',
    name: 'Majjidbhai Shikalgar',
    taluka: 'Satara',
    phone: '7841000121',
    memberType: 'Founder Member',
    fees: 1250,
  },
  {
    id: 9998,
    salutation: 'Mr.',
    name: 'Chandbhai Shikalgar',
    taluka: 'Satara',
    phone: 'xxxxxxxxxx',
    memberType: 'Founder Member',
    fees: 800,
  },
  {
    id: 1,
    salutation: 'Mr.',
    name: 'Babubhai Shikalgar',
    taluka: 'Karad',
    phone: '9764224425',
    memberType: 'President',
    fees: 950,
  },
  {
    id: 2,
    salutation: 'Mr.',
    name: 'Huseinbhai Shikalgar',
    taluka: 'Wardhangad',
    phone: '9860381328',
    memberType: 'Vice-president',
    fees: 1200,
  },
  {
    id: 3,
    salutation: 'Mr.',
    name: 'Rafiqbhai Shikalgar',
    taluka: 'Koregaon',
    phone: '7709608080',
    memberType: 'Secretary',
    fees: 1100,
  },
  {
    id: 4,
    salutation: 'Mr.',
    name: 'Shabbirbhai Shikalgar',
    taluka: 'Satara',
    phone: 'xxxxxxxxxx',
    memberType: 'Treasurer',
  },
  {
    id: 5,
    salutation: 'Mr.',
    name: 'Sirajbhai Shikalgar',
    taluka: 'Waduj',
    phone: 'xxxxxxxxxx',
    memberType: 'Director',
  },
  {
    id: 6,
    salutation: 'Mrs.',
    name: 'Hazarabi Shikalgar',
    taluka: 'Wathar',
    phone: '9763129746',
    memberType: 'Director',
  },
  {
    id: 7,
    salutation: 'Mr.',
    name: 'Zhakirbhai Shikalgar',
    taluka: 'Malakapur',
    phone: 'xxxxxxxxxx',
    memberType: 'Director',
  },
  {
    id: 8,
    salutation: 'Mr.',
    name: 'Shabbirbhai Shikalgar',
    taluka: 'Rethare',
    phone: 'xxxxxxxxxx',
    memberType: 'Director',
  },
  {
    id: 9,
    salutation: 'Mr.',
    name: 'Nazirbhai Shikalgar',
    taluka: 'Virali',
    phone: 'xxxxxxxxxx',
    memberType: 'Director',
  },
  {
    id: 10,
    salutation: 'Mr.',
    name: 'Maulabhai Shikalgar',
    taluka: 'Nagthane',
    phone: 'xxxxxxxxxx',
    memberType: 'Director',
  },
  {
    id: 11,
    salutation: 'Mr.',
    name: 'Anis Shikalgar',
    taluka: 'Satara',
    phone: '9886174607',
    memberType: 'Advisor',
  },
  {
    id: 101,
    salutation: 'Mr.',
    name: 'Jameerbhai Shikalgar',
    taluka: 'Ogalewadi',
    phone: '9422679008',
    memberType: 'Volunteer',
  },
  {
    id: 102,
    salutation: 'Mr.',
    name: 'Ramzaanbhai Shikalgar',
    taluka: 'Nagthane',
    phone: '9673917786',
    memberType: 'Volunteer',
  },
  {
    id: 103,
    salutation: 'Mrs.',
    name: 'Shamimbi Shikalgar',
    taluka: 'Virali',
    phone: '9850987905',
    memberType: 'Volunteer',
  },
  {
    id: 104,
    salutation: 'Mr.',
    name: 'Liyakat Shikalgar',
    taluka: 'Koregaon',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 105,
    salutation: 'Mr.',
    name: 'Maulabhai Shikalgar',
    taluka: 'Shenoli',
    phone: '9730934326',
    memberType: 'Volunteer',
  },
  {
    id: 106,
    salutation: 'Mr.',
    name: 'Naseerbhai Shikalgar',
    taluka: 'Wardhangad',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 107,
    salutation: 'Mr.',
    name: 'Nadimbhai Shikalgar',
    taluka: 'Kaledhon',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 108,
    salutation: 'Mr.',
    name: 'Haroonbhai Shikalgar',
    taluka: 'Wathar',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 109,
    salutation: 'Mr.',
    name: 'Mubarakbhai Shikalgar',
    taluka: 'Waduj',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 110,
    salutation: 'Mrs.',
    name: 'Salimabi Shikalgar',
    taluka: 'Satara',
    phone: '9975334193',
    memberType: 'Volunteer',
  },
  {
    id: 111,
    salutation: 'Mr.',
    name: 'Rashidbhai Shikalgar',
    taluka: 'Khatav',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 204,
    salutation: 'Mr.',
    name: 'Dilawarbhai Shikalgar',
    taluka: 'Karad',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 205,
    salutation: 'Mrs.',
    name: 'Hajarabi Shikalgar',
    taluka: 'Satara',
    phone: '8624989671',
    memberType: 'Volunteer',
  },
  {
    id: 206,
    salutation: 'Mr.',
    name: 'Salimbhai Shikalgar',
    taluka: 'Umbraj',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 207,
    salutation: 'Mr.',
    name: 'Sameerbhai Shikalgar',
    taluka: 'Ubraj',
    phone: '7721079777',
    memberType: 'Volunteer',
  },
  {
    id: 208,
    salutation: 'Mr.',
    name: 'Naushad Shikalgar',
    taluka: 'Karad',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 209,
    salutation: 'Mr.',
    name: 'Gulambhai Shikalgar',
    taluka: 'Malkapur',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 210,
    salutation: 'Mr.',
    name: 'Qadarbhai Shikalgar',
    taluka: 'Karad',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
  {
    id: 211,
    salutation: 'Mr.',
    name: 'Ameerbhai Shikalgar',
    taluka: 'Karad',
    phone: 'xxxxxxxxxx',
    memberType: 'Volunteer',
  },
];
