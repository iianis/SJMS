import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

//import {Members} from ''
const FuntionalAreas = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <Image source={item.image} style={{ height: 200, width: '100%' }} />
      <View style={styles.cardRow2}>
        <Text style={[styles.title2, textColor]}>{item.desc}</Text>
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
          navigation.navigate(
            item.component ? item.component : 'WorkInProgress',
            { item: item },
          );
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
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

export interface IServiceArea {
  id: number;
  title: string;
  desc: string;
  image: string;
  component: string;
  active: boolean;
}

export const serviceAreas: IServiceArea[] = [
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
    title: 'Fees & Donations',
    desc: 'Contribute and be a part of the change.',
    component: 'Donations',
    active: true,
    image: require('../images/donations.jpg'),
  },
  {
    id: 2,
    title: 'Scholarships',
    desc: 'List of Scholarships on offer.',
    component: 'Schemes',
    active: true,
    image: require('../images/scholarships.jpg'),
  },
  {
    id: 8,
    title: 'Financials',
    component: 'Audits',
    desc: 'Review and let us know how we are doing.',
    active: true,
    image: require('../images/financials.jpg'),
  },
  {
    id: 4,
    title: 'Applications & Requests',
    component: 'Applications',
    desc: 'If you are in a need, please reach out to us by posting a request with due details. Which inturn would be reviewed by our senior members.',
    active: true,
    image: require('../images/requests.png'),
  },
  {
    id: 7,
    title: 'Alerts & Notifications',
    component: 'Alerts',
    desc: 'Alerts and Notifications for Meetings, Events, & unforseen developments.',
    active: true,
    image: require('../images/alerts.png'),
  },
  {
    id: 10,
    title: 'Invitations',
    component: 'Invitations',
    desc: 'Let us be close to our members by Sending/receiving Invitations of different events.',
    active: true,
    image: require('../images/invitations.jpg'),
  },
  {
    id: 5,
    title: 'Matrimonial',
    desc: 'Let us extend our bonds not just as community but as a family and beyond.',
    active: true,
    component: 'Matrimonial',
    image: require('../images/matrimonial.jpg'),
  },
  {
    id: 6,
    title: 'Jobs',
    component: 'Jobs',
    desc: 'Check if you find any of these jobs that pushes you out of your comfort zone.',
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
