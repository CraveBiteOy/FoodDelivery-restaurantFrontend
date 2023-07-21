import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//screens import
import Details from '../screens/Details';
import { Text, View } from 'react-native';
import CustomDrawerContent from './CustomerDrawerContent';
import { drawerItemsMain } from './drawerItemsMain';
import Settting1 from '../screens/Settting1';
import Setting2 from '../screens/Setting2';
import RestaurantStack from './RestaurantStack';

type DrawerNavigationType = {
  Restaurant: undefined,
  Details: undefined,
  Setting1: undefined,
  Setting2: undefined
}


const Drawer = () => {
  const Drawer = createDrawerNavigator<DrawerNavigationType>();
  return (
    <Drawer.Navigator
      screenOptions={{ drawerPosition: 'left'}}
      initialRouteName='Restaurant'
      drawerContent={(props: any) =>(
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props}></CustomDrawerContent>
      )}
    >
      <Drawer.Screen name="Restaurant" component={RestaurantStack} />
      <Drawer.Screen name="Details" component={Details} />
      <Drawer.Screen name="Setting1" component={Settting1} />
      <Drawer.Screen name="Setting2" component={Setting2} />
    </Drawer.Navigator>
  );
};

export default Drawer;
