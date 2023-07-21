import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import YourRestaurant from '../screens/YourRestaurant'
import UpdateRestaurantForm from '../screens/UpdateRestaurantForm'

type RestaurantStackParamList = {
    YourRestaurant: undefined,
    UpdateRestaurantForm: undefined
  }
  
  
  const Stack = createNativeStackNavigator<RestaurantStackParamList>();

const RestaurantStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='YourRestaurant'  
        >
          <Stack.Screen name="YourRestaurant" component={YourRestaurant} />
          <Stack.Screen name="UpdateRestaurantForm" component={UpdateRestaurantForm} />
        </Stack.Navigator>
      );
}

export default RestaurantStack

const styles = StyleSheet.create({})