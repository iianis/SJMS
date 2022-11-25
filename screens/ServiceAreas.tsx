import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

//import {Members} from ''
const FuntionalAreas = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <Image source={item.image} style={{height: 200, width: '100%'}} />
      <View style={styles.cardRow2}>
        <Text style={[styles.title2, textColor]}>{item.desc}</Text>
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
          navigation.navigate(
            item.component ? item.component : 'WorkInProgress',
            {item: item},
          );
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={serviceAreas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

export default FuntionalAreas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
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
});

export interface serviceArea {
  id: number;
  title: string;
  desc: string;
  image: string;
  component: string;
  active: boolean;
}

export const serviceAreas: serviceArea[] = [
  {
    id: 1,
    title: 'Members',
    desc: 'List of community members',
    component: 'Members',
    active: true,
    image: require('../images/members.jpg'),
  },
  {
    id: 3,
    title: 'Donations',
    desc: 'Different ways that we receive donations',
    component: 'Donations',
    active: true,
    image: require('../images/donations.jpg'),
  },
  {
    id: 2,
    title: 'Scholarships',
    desc: 'List & details of Scholarships offered',
    component: 'Schemes',
    active: true,
    image: require('../images/scholarships.jpg'),
  },
  {
    id: 8,
    title: 'Financials',
    component: 'Audits',
    desc: 'List of Financial reports.',
    active: true,
    image: require('../images/financials.jpg'),
  },
  {
    id: 4,
    title: 'Applications & Requests',
    component: 'Applications',
    desc: 'You can post a request/applications that reaches to all responsible team members',
    active: true,
    image: require('../images/requests.png'),
  },
  {
    id: 7,
    title: 'Alerts & Notifications',
    component: 'Alerts',
    desc: 'Alerts and Notifications. Meetings, Unforseen Events.',
    active: true,
    image: require('../images/alerts.png'),
  },
  {
    id: 10,
    title: 'Invitations',
    component: 'Invitations',
    desc: 'Send or receive invitations.',
    active: true,
    image: require('../images/invitations.jpg'),
  },
  {
    id: 5,
    title: 'Matrimonial',
    desc: 'This feature is going to help us connect our families to build relations beyond a limit.',
    active: true,
    component: 'Matrimonial',
    image: require('../images/matrimonial.jpg'),
  },
  {
    id: 6,
    title: 'Jobs',
    component: 'Jobs',
    desc: 'Find list of jobs that may interest you.',
    active: true,
    image: require('../images/jobs.jpg'),
  },
  {
    id: 9,
    title: 'Performance',
    component: 'WorkInProgress',
    desc: 'List of performance reports.',
    active: true,
    image: require('../images/performance.png'),
  },
];
