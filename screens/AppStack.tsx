import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Intro from './Intro';
import Register from './Register';
import ServiceAreas from './ServiceAreas';
import Directors from './Directors';
import Donations from './Donations';
import RequestsNew from './RequestsNew';
import Requests from './Requests';
import DonationsNew from './DonationsNew';
import MemberNew from './MemberNew';
import Matrimonial from './Matrimonial';
import AlertsNew from './AlertsNew';
import Alerts from './Alerts';
import Schemes from './Schemes';
import WorkInProgress from './WorkInProgress';
import Members from './Members';
import Profile from './Profile';
import SchemesNew from './SchemesNew';

const AppStack = () => {

    const Stack = createNativeStackNavigator();

    return (
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
                name="Members"
                component={Members}
                options={{
                    headerShown: true,
                    title: 'Members',
                    headerBackTitleVisible: true,
                }}
            />
            <Stack.Screen
                name="WorkInProgress"
                component={WorkInProgress}
                options={{
                    headerShown: false,
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
                name="SchemesNew"
                component={SchemesNew}
                options={{
                    headerShown: false,
                    title: 'Scholarships & Schemes',
                    headerBackTitleVisible: true,
                }}
            />
            <Stack.Screen
                name="Alerts"
                component={Alerts}
                options={{
                    headerShown: true,
                    title: 'Events',
                    headerBackTitleVisible: true,
                }}
            />
            <Stack.Screen
                name="AlertsNew"
                component={AlertsNew}
                options={{
                    headerShown: false,
                    title: 'Add Alerts',
                    headerBackTitleVisible: true,
                }}
            />
            <Stack.Screen
                name="Requests"
                component={Requests}
                options={{
                    headerShown: true,
                    title: 'Requests',
                    headerBackTitleVisible: true,
                }}
            />
            <Stack.Screen
                name="RequestsNew"
                component={RequestsNew}
                options={{
                    headerShown: false,
                    title: 'Add Requests',
                    headerBackTitleVisible: true,
                }}
            />
            <Stack.Screen
                name="Donations"
                component={Donations}
                options={{
                    headerShown: true,
                    title: 'Fees & Donations',
                    headerBackTitleVisible: true,
                }}
            />
            <Stack.Screen
                name="DonationsNew"
                component={DonationsNew}
                options={{
                    headerShown: false,
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
                name="Matrimonial"
                component={Matrimonial}
                options={{
                    headerShown: false,
                    title: 'Matrimonial',
                    headerBackTitleVisible: true,
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: true,
                    title: 'Profile',
                    headerBackTitleVisible: true,
                }}
            />
        </Stack.Navigator>
    )
}

export default AppStack