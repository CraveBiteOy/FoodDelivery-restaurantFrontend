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
import { listOrdersCompletedAction, listOrdersInProgressAction, orderByIdAction, receiveNewOrderForOrderListFromWebsocket, receiveUpdatedOrderForOrderListFromWebsocket, resetOrderAction } from '../store/actions/OrderAction';
import { ORDER, ORDER_STATUS } from '../model/index.d';
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerNavigationType } from '../navigation/Drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainStackParamList } from '../navigation/MainStack';
import OrderCardInListOrders from '../components/OrderCardInListOrders';
import { firstRestaurantForAuthOwnerAction } from '../store/actions/RestaurantAction';
import SockJS from "sockjs-client";
import {over} from "stompjs"
import { ownerByAuthUserAction } from '../store/actions/OwnerAction';

export type ActiveOrderNavigationProp = CompositeNavigationProp<
DrawerNavigationProp<DrawerNavigationType, "ActiveOrders">,
NativeStackNavigationProp<MainStackParamList>>;

const ActiveOrderScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
    const tw = useTailwind();
    const navigation = useNavigation<ActiveOrderNavigationProp>();
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const {orders, orderSuccess, orderError} = useSelector((state: RootState) => state.ORDERS);
    const {restaurant, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
    const {owner, ownerSuccess} = useSelector((state: RootState) => state.OWNERS)
    const dispatch = useDispatch();
    const [stompClient, setStompClient] = useState<any | null>(null);
    

    const loadRestaurant = useCallback(async () => {
        // setIsRefreshing(true);
        await dispatch(firstRestaurantForAuthOwnerAction() as any);
        // setIsRefreshing(false);
    }, [authUser]);

    const loadOwner = useCallback(async () => {
        await dispatch(ownerByAuthUserAction() as any);
    }, [authUser]);
  
    const loadOrders = useCallback(async () => {
      if(restaurant) {
        setIsRefreshing(false)
        await dispatch(resetOrderAction() as any)
        dispatch(listOrdersInProgressAction(restaurant.id) as any);
        setIsRefreshing(true)
      }
    }, [authUser, restaurant]);
  
    useEffect(() => {
        loadRestaurant();
        loadOwner();
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

    const connect =  async () => {
      const token = await AsyncStorage.getItem("token");
      let sock = SockJS(HOST_URL + "/socket");
      let stompClient = over(sock);
      setStompClient(stompClient);
      if(stompClient.status !== "CONNECTED") {
        stompClient.connect({Authorization: token}, (frame: any) => {
          stompClient.subscribe("/restaurant/" + restaurant?.id, orderReceivedHandling)
        }, notConnected)
      }
    }
  
    const orderReceivedHandling = (payload: any) => {
      const orderReceived : ORDER = JSON.parse(payload.body);
      console.log("order received from websocket");
      console.log(orderReceived);
      if(orderReceived.status != ORDER_STATUS.COMPLETED) {
        if(orderReceived.status == ORDER_STATUS.NEW) {
          dispatch(receiveNewOrderForOrderListFromWebsocket(orderReceived) as any);
        } else {
          dispatch(receiveUpdatedOrderForOrderListFromWebsocket(orderReceived) as any);
        }
      }
    }
  
    const notConnected = () => {
      console.log("not connected")
    }
  
    useEffect(() => {
      if(stompClient == null && restaurant) {
        connect();
      }
    }, [stompClient, restaurant])
  
    if(isLoading) {
      return <LoadingComponent></LoadingComponent>
    }
  
    if(orders?.length <= 0) {
      return (
        <SafeAreaView style={tw('flex-1 items-center justify-center bg-white ')}>
          <Text style={tw('font-bold text-lg text-gray-500')}>Restaurant have no in-progress orders</Text>
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

export default ActiveOrderScreen

const styles = StyleSheet.create({})