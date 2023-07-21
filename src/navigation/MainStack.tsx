import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Drawer from './Drawer';


type MainStackParamList = {
  Drawer: {
    screen: string,
    params: any
  }
}


const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Drawer" component={Drawer} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
