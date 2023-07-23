import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ORDER, ORDER_STATUS } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import moment from "moment"

const OrderCardInListOrders = ({order, navigation}: {order: ORDER, navigation: any}) => {
    const tw = useTailwind();

    const navigateFunction = () => {
        if(order.status != ORDER_STATUS.OWNER_REJECTED) {
            navigation.navigate("DetailedOrderScreen", {orderID: order?.id})
        }
    }

    const statusNotification = () => {
        if(order?.status == ORDER_STATUS.COMPLETED) {
            return "Completed";
        } else if(order?.status == ORDER_STATUS.NEW) {
            return "New";
        } else if(order?.status == ORDER_STATUS.COOKING) {
            return "In Cooking";
        } else if(order?.status == ORDER_STATUS.OWNER_REJECTED) {
            return "Decline";
        } else if(order?.status == ORDER_STATUS.PICKED_UP) {
            return "Picked Up";
        } else if(order?.status == ORDER_STATUS.READY_FOR_PICKUP) {
            return "Waiting for courier";
        } else if(order?.status == ORDER_STATUS.COURIER_ACCEPTED || order?.status == ORDER_STATUS.COURIER_REJECTED) {
            return "In Cooking";
        } 
    }

    const borderColor = () => {
        if (order?.status == ORDER_STATUS.COMPLETED || order?.status == ORDER_STATUS.PICKED_UP || order?.status == ORDER_STATUS.READY_FOR_PICKUP) {
            return "border-gray-300";
        } else if(order?.status == ORDER_STATUS.NEW || order?.status == ORDER_STATUS.COOKING || order?.status == ORDER_STATUS.COURIER_ACCEPTED || order?.status == ORDER_STATUS.COURIER_REJECTED) {
            return "border-blue-500";
        }  else if(order?.status == ORDER_STATUS.OWNER_REJECTED) {
            return "border-red-500";
        } 
    }

    const statusColor = () => {
        if (order?.status == ORDER_STATUS.COMPLETED || order?.status == ORDER_STATUS.PICKED_UP || order?.status == ORDER_STATUS.READY_FOR_PICKUP) {
            return "text-black";
        } else if(order?.status == ORDER_STATUS.NEW || order?.status == ORDER_STATUS.COOKING || order?.status == ORDER_STATUS.COURIER_ACCEPTED || order?.status == ORDER_STATUS.COURIER_REJECTED) {
            return "text-blue-500 font-bold";
        }  else if(order?.status == ORDER_STATUS.OWNER_REJECTED) {
            return "text-red-500 font-bold";
        } 
    }

  return (
    <TouchableOpacity onPress={navigateFunction} style={[tw(`my-2 bg-[#FCE4D6] rounded-lg border-2 ${borderColor()} py-2 items-center justify-center`), {with: "60%"}]}>
        <Text style={tw('text-lg font-bold text-black')}>{order?.restaurant?.name}</Text>
        <View style={tw('w-full mb-2 mt-4 flex-row items-center justify-between px-4')}>
            <Text style={tw('text-base text-black')}>Order status:</Text>
            <Text style={tw(`text-base ${statusColor()}`)}>{statusNotification()}</Text>
        </View>
        { order?.status != ORDER_STATUS.OWNER_REJECTED && (
            <>    
                <View style={tw('w-full mb-2 flex-row items-center justify-between px-4')}>
                    <Text style={tw('text-base text-black')}>Delivered at:</Text>
                    <Text style={tw('text-base text-black')}>{moment(order?.updatedDate).format("DD-MM-YYYY")}</Text>
                </View>
                <View style={tw('w-full mb-2 flex-row items-start justify-between px-4')}>
                    <Text style={tw('text-base text-black')}>Delivered to:</Text>
                    <View style={[{width: "60%"}, tw('flex items-end')]}>
                        <Text style={tw('text-base text-black')}>{order?.address}, {order?.city?.toUpperCase()}</Text>
                    </View>
                </View>
                <View style={tw('w-full mb-2 flex-row items-center justify-between px-4')}>
                    <Text style={tw('text-base text-black')}>Total Price:</Text>
                    <Text style={tw('text-base text-black')}>€ {order?.finalPrice?.toFixed(2)}</Text>
                </View>
                {order?.status == ORDER_STATUS.NEW && (
                    <View style={tw('w-full mt-2 mb-2 flex-row items-center justify-between px-4')}>
                        <View style={tw(' px-8 py-2 rounded-lg bg-white items-center justify-center')}>
                            <Text style={tw('text-lg font-bold text-blue-500')}>Decline</Text>
                        </View>
                        <View style={tw(' px-8 py-2 rounded-lg bg-blue-500 items-center justify-center')}>
                            <Text style={tw('text-lg font-bold text-white')}>Accept</Text>
                        </View>
                    </View>
                )}
                {order?.status == ORDER_STATUS.COOKING && (
                    <View style={tw('w-full mt-2 mb-2 flex-row items-center justify-center px-4')}>
                        <View style={tw(' px-8 py-2 rounded-lg bg-blue-500 items-center justify-center')}>
                            <Text style={tw('text-lg font-bold text-white')}>Ready For Pickup</Text>
                        </View>
                    </View>
                )}
            </>
        )}
         { order?.status == ORDER_STATUS.OWNER_REJECTED && (
            <>    
                <View style={tw('w-full mb-2 flex-row items-center justify-between px-4')}>
                    <Text style={tw('text-base text-black')}>Ordered at:</Text>
                    <Text style={tw('text-base text-black')}>{moment(order?.updatedDate).format("DD-MM-YYYY")}</Text>
                </View>
            </>
        )}
    </TouchableOpacity>
  )
}

export default OrderCardInListOrders

const styles = StyleSheet.create({})