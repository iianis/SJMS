import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import MemberDetails from './screens/MemberDetails';
import Members from './screens/Members';
import ServiceAreas from './screens/ServiceAreas';
import WorkInProgress from './screens/WorkInProgress';
import Audits from './screens/Audits';
import Schemes from './screens/Schemes';
import Districts from './screens/Districts';
import Talukas from './screens/Talukas';
import Invitations from './screens/Invitations';
import Alerts from './screens/Alerts';
import Applications from './screens/Applications';
import Donations from './screens/Donations';
import Jobs from './screens/Jobs';
import Matrimonial from './screens/Matrimonial';
import Profile from './screens/Profile';
import Intro from './screens/Intro';
import Directors from './screens/Directors';
import Founders from './screens/Founders';
import Volunteers from './screens/Volunteers';
import DonationsNew from './screens/DonationsNew';
import MemberNew from './screens/MemberNew';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{
            headerShown: false,
            headerBackTitleVisible: true,
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            headerBackTitleVisible: true,
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            headerBackTitleVisible: true,
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="ServiceAreas"
          component={ServiceAreas}
          options={{
            headerShown: true,
            title: 'Service Areas',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Directors"
          component={Directors}
          options={{
            headerShown: true,
            title: 'Board of Director\'s',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Founders"
          component={Founders}
          options={{
            headerShown: true,
            title: 'Founder Members',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Volunteers"
          component={Volunteers}
          options={{
            headerShown: true,
            title: 'Taluka Commitee',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Members"
          component={Members}
          options={{
            headerShown: true,
            title: 'Members',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="MemberDetails"
          component={MemberDetails}
          options={{
            headerShown: false,
            title: '',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Audits"
          component={Audits}
          options={{
            headerShown: true,
            title: 'Audit 2021-22',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="WorkInProgress"
          component={WorkInProgress}
          options={{
            headerShown: true,
            title: 'Work In Progress',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Schemes"
          component={Schemes}
          options={{
            headerShown: true,
            title: 'Scholarships & Schemes',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Districts"
          component={Districts}
          options={{
            headerShown: true,
            title: 'Districts',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Talukas"
          component={Talukas}
          options={{
            headerShown: true,
            title: 'Talukas',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Invitations"
          component={Invitations}
          options={{
            headerShown: true,
            title: 'Invitations',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Alerts"
          component={Alerts}
          options={{
            headerShown: true,
            title: 'Alerts',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Applications"
          component={Applications}
          options={{
            headerShown: true,
            title: 'Applications',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Donations"
          component={Donations}
          options={{
            headerShown: true,
            title: 'Donations',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="DonationsNew"
          component={DonationsNew}
          options={{
            headerShown: true,
            title: 'Add Donation',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="MemberNew"
          component={MemberNew}
          options={{
            headerShown: false,
            title: 'Add Member',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Jobs"
          component={Jobs}
          options={{
            headerShown: true,
            title: 'Jobs',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Matrimonial"
          component={Matrimonial}
          options={{
            headerShown: true,
            title: 'Matrimonial',
            headerBackTitleVisible: true,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            title: '',
            headerBackTitleVisible: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
