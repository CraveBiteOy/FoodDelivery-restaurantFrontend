import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, BackHandler, ListRenderItem, FlatList } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo, useLayoutEffect} from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux';
import { HOST_URL, RootState } from '../store/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from "react-native-vector-icons/Ionicons"
import LoadingComponent from '../components/LoadingComponent';
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import { DrawerNavigationType } from '../navigation/Drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { firstRestaurantForAuthOwnerAction, updateRestaurantAction } from '../store/actions/RestaurantAction';
import { uploadImageFunction } from '../utils/ImageUitls';
import { Button } from '@rneui/base';
import { ownerByAuthUserAction } from '../store/actions/OwnerAction';
import { MainStackParamList } from '../navigation/MainStack';
import { DishStackParamList } from '../navigation/DishStack';
import { dishesByRestaurantAction } from '../store/actions/DishAction';
import { DISH } from '../model/index.d';
import DishComponent from '../components/DishComponent';


export type DishListNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<DishStackParamList, "DishListScreen">,
DrawerNavigationProp<DrawerNavigationType>>;



const DishListScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<DishListNavigationProp>();
  const tw = useTailwind();
  const {restaurant, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
  const {dishes, dishError, dishSuccess} = useSelector((state: RootState) => state.DISHES);
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPonits = useMemo(() => ['3', '50'], [])
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;


  const handleSheetChange = useCallback((index: any) => {
      console.log(index)
  }, []);

  const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    
  }, []);

  const handleDismissModalPress = useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
  }, []);


  const loadRestaurant = useCallback(async () => {
      setIsRefreshing(true);
      await dispatch(firstRestaurantForAuthOwnerAction() as any);
      setIsRefreshing(false);
  }, [authUser]);

  const loadOwner = useCallback(async () => {
      await dispatch(ownerByAuthUserAction() as any);
  }, [authUser]);

  const loadDishes = useCallback( async () => {
    if(restaurant) {
      await dispatch(dishesByRestaurantAction(restaurant?.id) as any);
    }
  }, [restaurant])

  const createNewDish = () => {
    if(restaurant) {
      navigation.navigate("DishForm", {dishID: null, restaurantID: restaurant?.id})
    }
  }
  
  const DishListHeader = () => {
    return (
      <View  style={tw('w-full  my-4 mb-8 flex-row items-center justify-center px-2')}>
        <View style={tw('flex-1 items-center')}>
          <Text style={tw('text-2xl font-bold text-[#f7691a]')}>Your Restaurant List</Text>
        </View>
        <TouchableOpacity onPress={createNewDish}  style={[{}, tw('bg-[#f7691a] rounded-full  items-center justify-center ml-4 p-2')]}>
            <Ionicons name='add' size={24} color="white"/>
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
      setIsLoading(true);
      loadRestaurant().then(() => loadOwner());
  }, [authUser])

  useEffect(() => {
    loadDishes().then(() => setIsLoading(false));
  }, [restaurant])

  const handleRenderItem: ListRenderItem<any> = ({item}: {item: DISH}) => {
      return (
        <DishComponent navigation={navigation} dish={item}></DishComponent>
      )
  }

  if(isLoading) {
    return <LoadingComponent/>
  }

  if(!isLoading && dishes?.length == 0) {
    return (
      <View style={tw('flex-1 items-center justify-center')}>
        <Text >Your Restaurant has no dishes</Text>
      </View>
    )
  }

  return (
    <BottomSheetModalProvider>
      <View style={tw('flex-1 pt-2 px-2')}>
          <FlatList
                // ListHeaderComponent={() => <DishListHeader></DishListHeader>}
                refreshing={isrefreshing}
                onRefresh={loadDishes}
                data={dishes?.length > 0 && dishes}
                keyExtractor={(item: any) => item.id}
                renderItem={handleRenderItem}
                showsVerticalScrollIndicator={false}
          />
      </View>
    </BottomSheetModalProvider>
  )
}

export default DishListScreen

const styles = StyleSheet.create({})