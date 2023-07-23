import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen';
import UpdateProfileForm from '../screens/UpdateProfileForm';
import PasswordUpdateForm from '../screens/PasswordUpdateForm';

export type PersonalStackParamList = {
  ProfileScreen: undefined,
  UpdateProfileForm: undefined,
  PasswordUpdateForm: undefined
}
const stack = createNativeStackNavigator<PersonalStackParamList>();


const PersonalStack = () => {
  return (
    <stack.Navigator
      initialRouteName='ProfileScreen'
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen name='ProfileScreen' component={ProfileScreen}></stack.Screen>
      <stack.Screen name='UpdateProfileForm' component={UpdateProfileForm}></stack.Screen>
      <stack.Screen name='PasswordUpdateForm' component={PasswordUpdateForm}></stack.Screen>
    </stack.Navigator>
  )
}

export default PersonalStack

const styles = StyleSheet.create({})