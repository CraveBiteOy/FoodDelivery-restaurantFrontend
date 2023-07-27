import React, { useEffect, useState, useCallback } from 'react';
import {DrawerContentComponentProps, createDrawerNavigator} from '@react-navigation/drawer';
import { Text, View, TouchableOpacity } from 'react-native';
import CustomDrawerContent from './CustomerDrawerContent';
import { drawerItemsMain } from './drawerItemsMain';
import YourRestaurant from '../screens/YourRestaurant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MainStackParamList } from './MainStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import { ResetUser, getAuthUserAction } from '../store/actions/userAction';
import DishStack from './DishStack';
import { useTailwind } from 'tailwind-rn';
import Ionicons from "react-native-vector-icons/Ionicons"
import { firstRestaurantForAuthOwnerAction } from '../store/actions/RestaurantAction';
import CompletedOrderScreen from '../screens/CompletedOrderScreen';
import ActiveOrderScreen from '../screens/ActiveOrderScreen';
import PersonalStack from './PersonalStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type DrawerNavigationType = {
  Restaurant: undefined,
  Dish: undefined,
  CompletedOrders: undefined,
  ActiveOrders: undefined,
  PersonalProfile: undefined
}


const Drawer = () => {
  const Drawer = createDrawerNavigator<DrawerNavigationType>();
  const tw = useTailwind();
  const {restaurant, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
  const {dishes, dishError, dishSuccess} = useSelector((state: RootState) => state.DISHES);
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const dispatch = useDispatch();

  const loadRestaurant = useCallback(async () => {
      await dispatch(firstRestaurantForAuthOwnerAction() as any);
  }, [authUser]);

  useEffect(() => {
    loadRestaurant();
  }, [authUser])

  return (
    <Drawer.Navigator
      screenOptions={{ 
        drawerPosition: 'left',
        headerTintColor: "#f7691a"
      }}
      initialRouteName='Restaurant'
      drawerContent={(props: any) =>(
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props}></CustomDrawerContent>
      )}
    >
      <Drawer.Screen 
        name="Restaurant" 
        component={YourRestaurant} 
        options={{
          headerTitle: "Your Restaurant", 
          headerShown: true,
          headerTitleStyle: {
            color: "#f7691a",
            fontWeight: "bold"
          },
          unmountOnBlur:true,
          drawerIcon: ({focused}) => (
            <AntDesign size={30} name="home" color={focused ? "#f7691a" : "#f7b38d"}></AntDesign>
          )
        }}
      />
      <Drawer.Screen 
        name="Dish" 
        component={DishStack} 
        options={({navigation}) => ({
          headerTitle: "Dishes", 
          headerShown: true,
          headerTitleStyle: {
            color: "#f7691a",
            fontWeight: "bold"
          },
          headerRight: () => (
            <TouchableOpacity onPress={() =>  navigation.navigate("DishForm", {dishID: null, restaurantID: restaurant?.id})}  style={[{width: 50, height: 50}, tw('bg-white rounded-full  items-center justify-center mr-4 p-2')]}>
                <Entypo name='add-to-list' size={32} color="#f7691a"/>
            </TouchableOpacity>
          ),
          unmountOnBlur:true
        })}
      />
      <Drawer.Screen 
        name="ActiveOrders" 
        component={ActiveOrderScreen} 
        options={{
          headerTitle: "In-Progress orders", 
          headerShown: true,
          headerTitleStyle: {
            color: "#f7691a",
            fontWeight: "bold"
          },
          unmountOnBlur:true
        }}
      />
      <Drawer.Screen 
        name="CompletedOrders" 
        component={CompletedOrderScreen} 
        options={{
          headerTitle: "Completed orders", 
          headerShown: true,
          headerTitleStyle: {
            color: "#f7691a",
            fontWeight: "bold"
          },
          unmountOnBlur:true
        }}
      />
      <Drawer.Screen 
        name="PersonalProfile" 
        component={PersonalStack} 
        options={{
          headerTitle: "Your Profile", 
          headerShown: true,
          headerTitleStyle: {
            color: "#f7691a",
            fontWeight: "bold"
          },
          unmountOnBlur:true
        }}
      />
    </Drawer.Navigator>
  );
};

export default Drawer;
