import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './screens/AuthContext';
import AppNav from './screens/AppNav';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;
