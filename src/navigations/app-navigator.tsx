import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import useTheme from '../utils/useTheme';

import PrimaryScreen from '../scenes/primary';
import SecondaryScreen from '../scenes/secondary';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const theme = useTheme();

  useEffect(() => {
    AsyncStorage.getItem('theme').then(str => {
      theme.setTheme(str == 'dark' ? 'dark' : 'light');
    });
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PrimaryScreen" component={PrimaryScreen} />
      <Stack.Screen
        name="SecondaryScreen"
        options={{presentation: 'modal'}}
        component={SecondaryScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
