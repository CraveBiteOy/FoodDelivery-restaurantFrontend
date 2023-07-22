import { StyleSheet, Text, View } from 'react-native'
import React, {useLayoutEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Drawer from './Drawer';
import DishListScreen from '../screens/DishListScreen';
import DishForm from '../screens/DishForm';

export type DishStackParamList = {
  DishListScreen: undefined,
  DishForm: {dishID: number | null, restaurantID: number}
}


const Stack = createNativeStackNavigator<DishStackParamList>();

const DishStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='DishListScreen'
    >
      <Stack.Screen 
        name="DishListScreen" 
        component={DishListScreen} 
      />
      <Stack.Screen 
        name="DishForm" 
        component={DishForm} 
      />
    </Stack.Navigator>
  );
}

export default DishStack

const styles = StyleSheet.create({})