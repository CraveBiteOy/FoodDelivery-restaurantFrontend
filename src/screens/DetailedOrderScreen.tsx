import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView, BackHandler } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo, useLayoutEffect} from 'react'
import { ORDER, ORDERDISH, ORDER_STATUS } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import moment from "moment";
import { Button } from '@rneui/base';
import { useDispatch, useSelector } from 'react-redux';
import { orderByIdAction, orderCookedAndReadyForPickupAction, ownerAcceptOrderAction, ownerDeclineOrderAction, resetOrderAction, updateOrderFromWebsocket } from '../store/actions/OrderAction';
import LoadingComponent from '../components/LoadingComponent';
import { CompositeNavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HOST_URL, RootState } from '../store/store';
import { orderDishesByOrderIdAction, resetOrderDishesAction } from '../store/actions/OrderDishAction';
import { MainStackParamList } from '../navigation/MainStack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerNavigationType } from '../navigation/Drawer';
import OrderDetailedItem from '../components/OrderDetailedItem';
import DeliveryProgressingBar from '../components/DeliveryProgressingBar';
import SockJS from "sockjs-client";
import {over} from "stompjs"
import AsyncStorage from '@react-native-async-storage/async-storage';


export type DetailedOrderNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<MainStackParamList, "DetailedOrderScreen">,
DrawerNavigationProp<DrawerNavigationType>>;

type DetailedOrderRouteProp = RouteProp<MainStackParamList, "DetailedOrderScreen">;

const DetailedOrderScreen = () => {
    const navigation = useNavigation<DetailedOrderNavigationProp>();
    const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeOrder, setActiveOrder] = useState<ORDER | null>(null);
    const tw = useTailwind();
    const dispatch = useDispatch();
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const {order, orderSuccess, orderError} = useSelector((state: RootState) => state.ORDERS);
    const {orderDish, orderDishes} = useSelector((state: RootState) => state.ORDERDISHES);
    const {orderID} = useRoute<DetailedOrderRouteProp>().params; 
    const [estimatedTime, setEstimatedTime] = useState<Date>(new Date());
    const [stompClient, setStompClient] = useState<any | null>(null);

    const loadOrder = useCallback(async () => {
        if(orderID) {
        await dispatch(resetOrderAction() as any)
        dispatch(orderByIdAction(orderID) as any);
        }
    }, [authUser, orderID]);
  
    const loadOrderDishes = useCallback(async () => {
      if(orderID) {
        setIsRefreshing(true);
        await dispatch(resetOrderDishesAction() as any)
        await dispatch(orderDishesByOrderIdAction(orderID) as any);
        setIsRefreshing(false);
      } 
    }, [authUser, orderID]);
  
    useEffect(() => {
      setIsLoading(true);
      loadOrder().then(() => loadOrderDishes()).then(() => setIsLoading(false))
    }, [orderID, authUser])

    
    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Order id " + orderID,
        headerShown: true,
        unmountOnBlur: true
      })
    }, [navigation, orderID])

    useEffect(() => {
      if(order) {
        const orderCreatedTime = new Date(order?.createdDate);
        setEstimatedTime(new Date(orderCreatedTime.getTime() + order?.totalTime * 60000));
      }
    }, [order, orderID])

    const connect =  async () => {
      const token = await AsyncStorage.getItem("token");
      let sock = SockJS(HOST_URL + "/socket");
      let stompClient = over(sock);
      setStompClient(stompClient);
      if(stompClient.status !== "CONNECTED") {
        stompClient.connect({Authorization: token}, (frame: any) => {
          stompClient.subscribe(`/order/${orderID}`, orderUpdated)
        }, notConnected)
      }
    }
  
    const orderUpdated = (payload: any) => {
      const orderUpdated : ORDER = JSON.parse(payload.body);
      console.log("order received from websocket");
      console.log(orderUpdated);
      if(orderUpdated.id == orderID) {
        setActiveOrder(orderUpdated);
        // update the order in order list of redux store
        dispatch(updateOrderFromWebsocket(orderUpdated) as any);
      }
    }
  
    const notConnected = () => {
      console.log("not connected")
    }
  
    useEffect(() => {
      if(stompClient == null && orderID && order.status != ORDER_STATUS.COMPLETED) {
        connect();
      }
    }, [stompClient, orderID, order])

    useEffect(() => {
      if(order ) {
        setActiveOrder(order)
      }
    }, [order, orderID])

  

    const AcceptOrderFunction = async () => {
      dispatch(ownerAcceptOrderAction(orderID) as any);
    }

    const DeclineOrderFunction = async () => {
      dispatch(ownerDeclineOrderAction(orderID) as any);
    }

    const finishCookingFunction = async () => {
      dispatch(orderCookedAndReadyForPickupAction(orderID) as any);
    }

    if(isLoading) {
        return <LoadingComponent></LoadingComponent>
    }

    if(!activeOrder) {
      return (
        <View style={tw('flex-1 items-center justify-center')}>
          <Text>No order</Text>
        </View>
      )
    }

  return (
    <View style={tw('flex-1 bg-gray-200')}>
      {activeOrder && activeOrder.id == orderID  && (
        <ScrollView style={tw('flex-1 bg-gray-200')}>
          
            <View style={tw('my-6 w-full px-4 mx-auto items-center justify-center')}>
                {activeOrder?.status == ORDER_STATUS.OWNER_REJECTED && (
                    <View style={tw('my-6 mx-auto')}>
                        <Text style={tw('text-3xl font-bold text-red-500')}>Order Declined</Text>
                    </View>
                )}
                {activeOrder?.status == ORDER_STATUS.COMPLETED && (
                    <View style={tw('my-6 mx-auto')}>
                        <Text style={tw('text-3xl font-bold text-black')}>Order Delivered</Text>
                    </View>
                )}
                <Text style={tw('text-base font-bold text-gray-400 mt-4')}>{moment(order?.updatedDate).format("MMMM Do YYYY")}</Text>
                {activeOrder?.status != ORDER_STATUS.COMPLETED && order?.status != ORDER_STATUS.OWNER_REJECTED && (
                  <View style={tw('w-full my-4  items-start justify-center')}>
                      <View style={tw(' w-full flex-row items-start justify-center mb-4')}>
                          <Text style={tw('text-2xl font-bold text-black mr-8')}>Estimated Arrival: </Text>
                          <Text style={tw('text-2xl font-bold text-black')}>{estimatedTime.getHours() < 10 ? "0" + estimatedTime.getHours() : estimatedTime.getHours()} : {estimatedTime.getMinutes() < 10 ? "0" + estimatedTime.getMinutes() : estimatedTime.getMinutes()}</Text>
                      </View>
                      <DeliveryProgressingBar status={order.status}></DeliveryProgressingBar>
                  </View>    
                )}    
                {activeOrder?.status == ORDER_STATUS.NEW && (
                  <View style={tw('w-full mt-4 mb-2 flex-row items-center justify-between px-4')}>
                    <TouchableOpacity onPress={DeclineOrderFunction} style={tw(' px-4 py-2 rounded-lg bg-white items-center justify-center')}>
                        <Text style={tw('text-lg font-bold text-[#f7691a]')}>Decline Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={AcceptOrderFunction} style={tw(' px-4 py-2 rounded-lg bg-[#f7691a] items-center justify-center')}>
                        <Text style={tw('text-lg font-bold text-white')}>Accept Order</Text>
                    </TouchableOpacity>
                  </View>
                )}      
                {activeOrder?.status == ORDER_STATUS.COOKING && (
                  <View style={tw('w-full mt-4 mb-2 flex-row items-center justify-center px-4')}>
                    <TouchableOpacity onPress={finishCookingFunction} style={tw(' px-8 py-2 rounded-lg bg-[#f7691a] items-center justify-center')}>
                        <Text style={tw('text-lg font-bold text-white')}>Ready For PickUp</Text>
                    </TouchableOpacity>
                  </View>
                )}
                     
            </View>
        
            <View style={tw('w-full my-2 bg-white py-2 px-4 flex items-start justify-start')}> 
                <Text style={tw('text-2xl font-bold text-black mb-4')}>Delivery Details</Text>
                <Text style={tw('text-lg font-bold text-zinc-400 mb-2')}>Address</Text>
                <Text style={tw('text-base text-black mb-4')}>{activeOrder?.address}, {activeOrder?.zipcode} {activeOrder?.city}</Text>
                {activeOrder?.note && (
                    <>
                        <View style={[{width: "100%", height: 1}, tw('bg-gray-300 mb-4')]}></View>
                        <Text style={tw('text-lg font-bold text-zinc-400 mb-2')}>Note</Text>
                        <Text style={tw('text-base text-black')}>{activeOrder?.note}</Text>
                    </>
                )}
            </View>
            <View style={tw('w-full my-2 bg-white py-2 px-4 flex items-start justify-start mb-4')}> 
                <Text style={tw('text-2xl font-bold text-black mb-4')}>Order Summary</Text>
                {orderDishes?.length > 0 && orderDishes.map((orderDish: ORDERDISH, index: number) => <OrderDetailedItem key={index} orderDish={orderDish}></OrderDetailedItem>)}
                <View style={[{width: "100%", height: 1}, tw('bg-gray-300 mb-4')]}></View>
                <View style={tw('w-full flex-row items-center justify-between  my-2 px-4')}>
                    <Text style={[tw('text-black font-bold mr-4'), {fontSize: 18}]}>Delivery fee</Text>
                    <Text style={tw('text-black')}>{activeOrder?.deliveryFee?.toFixed(2)} €</Text>
                </View>
                <View style={tw('w-full flex-row items-center justify-between  my-2 pb-4 px-4')}>
                    <Text style={[tw('text-black font-bold mr-4'), {fontSize: 18}]}>Total</Text>
                    <Text style={tw('text-black')}>{activeOrder?.finalPrice?.toFixed(2)} €</Text>
                </View>
            </View>
        </ScrollView>
      )}
    </View>
  )
}

export default DetailedOrderScreen

const styles = StyleSheet.create({})