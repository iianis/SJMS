import React from 'react';
import Home from '../screens/Home';
import Members from '../screens/Members';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';

const BottamTab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <BottamTab.Navigator>
      <BottamTab.Screen name="Home" component={Home} />
      <BottamTab.Screen name="Members" component={Members} />
      <BottamTab.Screen name="Profile" component={Profile} />
    </BottamTab.Navigator>
  );
};

export default Tabs;
