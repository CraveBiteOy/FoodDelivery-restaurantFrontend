import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import { useTailwind } from 'tailwind-rn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { HOST_URL, RootState } from '../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { listOrdersCompletedAction, orderByIdAction, resetOrderAction } from '../store/actions/OrderAction';
import { ORDER, ORDER_STATUS } from '../model/index.d';
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerNavigationType } from '../navigation/Drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainStackParamList } from '../navigation/MainStack';
import OrderCardInListOrders from '../components/OrderCardInListOrders';
import { firstRestaurantForAuthOwnerAction } from '../store/actions/RestaurantAction';

export type CompletedOrderNavigationProp = CompositeNavigationProp<
DrawerNavigationProp<DrawerNavigationType, "CompletedOrders">,
NativeStackNavigationProp<MainStackParamList>>;

const CompletedOrderScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
    const tw = useTailwind();
    const navigation = useNavigation<CompletedOrderNavigationProp>();
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const {orders, orderSuccess, orderError} = useSelector((state: RootState) => state.ORDERS);
    const {restaurant, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
    const dispatch = useDispatch();

    const loadRestaurant = useCallback(async () => {
        // setIsRefreshing(true);
        await dispatch(firstRestaurantForAuthOwnerAction() as any);
        // setIsRefreshing(false);
    }, [authUser]);
  
    const loadOrders = useCallback(async () => {
      if(restaurant) {
        setIsRefreshing(false)
        await dispatch(resetOrderAction() as any)
        dispatch(listOrdersCompletedAction(restaurant.id) as any);
        setIsRefreshing(true)
      }
    }, [authUser, restaurant]);
  
    useEffect(() => {
        loadRestaurant();
    }, [authUser])
  
    useEffect(() => {
      setIsLoading(true);
      loadOrders().then(() => setIsLoading(false));
    }, [restaurant])
  
    const handleRenderItem: ListRenderItem<any> = ({item}: {item: ORDER}) => {
        return (
          <>
            <OrderCardInListOrders order={item} navigation={navigation}></OrderCardInListOrders>
          </>
        )
    }
  
    if(isLoading) {
      return <LoadingComponent></LoadingComponent>
    }
  
    if(orders?.length <= 0) {
      return (
        <SafeAreaView style={tw('flex-1 items-center justify-center bg-white ')}>
          <Text style={tw('font-bold text-lg text-gray-500')}>Restaurant have no completed orders</Text>
        </SafeAreaView>
      )
    }
  
    return (
      <SafeAreaView style={tw('flex-1 items-center justify-start bg-white ')}>
        <View style={[tw('flex-1 w-full '), {paddingHorizontal: 40}]}>
         <FlatList
                //   ListHeaderComponent={() => <Text style={tw('text-2xl mx-auto font-bold text-[#f7691a] my-4')}>Your Orders</Text>}
                //   refreshing={isrefreshing}
                //   onRefresh={loadOrders}
                  data={orders}
                  keyExtractor={(item: any) => item.id}
                  renderItem={handleRenderItem}
                  showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    )  
}

export default CompletedOrderScreen

const styles = StyleSheet.create({})