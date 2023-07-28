import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Drawer from './Drawer';
import LoginScreen from '../screens/LoginScreen';
import RestaurantForm from '../screens/RestaurantForm';
import DetailedOrderScreen from '../screens/DetailedOrderScreen';
import SignUpScreen from '../screens/SignUpScreen';


export type MainStackParamList = {
  LoginScreen: undefined,
  SignUp: undefined,
  Drawer: undefined,
  RestaurantForm: undefined,
  DetailedOrderScreen: {
    orderID: number
  }
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
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Drawer" component={Drawer} />
      <Stack.Screen name="RestaurantForm" component={RestaurantForm} />
      <Stack.Screen name="DetailedOrderScreen" component={DetailedOrderScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
