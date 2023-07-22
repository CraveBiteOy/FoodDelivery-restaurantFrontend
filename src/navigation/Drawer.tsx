import React, { useEffect, useState, useCallback } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Text, View, TouchableOpacity } from 'react-native';
import CustomDrawerContent from './CustomerDrawerContent';
import { drawerItemsMain } from './drawerItemsMain';
import Settting1 from '../screens/Settting1';
import Setting2 from '../screens/Setting2';
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

export type DrawerNavigationType = {
  Restaurant: undefined,
  Dish: undefined,
  Setting1: undefined,
  Setting2: undefined
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
          }
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
            <TouchableOpacity onPress={() =>  navigation.navigate("DishForm", {dishID: null, restaurantID: restaurant?.id})}  style={[{width: 40, height: 40}, tw('bg-[#f7691a] rounded-full  items-center justify-center mr-4 p-2')]}>
                <Ionicons name='add' size={20} color="white"/>
            </TouchableOpacity>
          )
        })}
      />
      <Drawer.Screen name="Setting1" component={Settting1} />
      <Drawer.Screen name="Setting2" component={Setting2} />
    </Drawer.Navigator>
  );
};

export default Drawer;
