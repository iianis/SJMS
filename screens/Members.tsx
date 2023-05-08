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
  const [loading, setLoading] = useState(false);

  //console.log(item);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      getMembers();
      //console.log('UseEffect .. onfocus');
    });
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
        //console.log(' total members: ' + memberSnapshot.size);
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
        {item.memberType == "Member" && <View style={styles.cardRow2}>
          <Text style={[styles.title2, textColor]}>{item.memberType}</Text>
        </View>}
        {item.memberType == "Family" && <View style={styles.cardRow2}>
          <Text style={[styles.title2, textColor]}>{item.relation} of {item.familyHeadName}</Text>
        </View>}
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
