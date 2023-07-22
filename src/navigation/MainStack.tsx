import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Drawer from './Drawer';
import LoginScreen from '../screens/LoginScreen';
import RestaurantForm from '../screens/RestaurantForm';


export type MainStackParamList = {
  LoginScreen: undefined,
  Drawer: undefined,
  RestaurantForm: undefined
}


const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='LoginScreen'
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Drawer" component={Drawer} />
      <Stack.Screen name="RestaurantForm" component={RestaurantForm} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
