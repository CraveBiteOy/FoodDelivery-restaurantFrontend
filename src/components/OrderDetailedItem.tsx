import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React  , {useCallback, useEffect, useState} from 'react'
import { useTailwind } from 'tailwind-rn';
import { ORDERDISH } from '../model/index.d';

const OrderDetailedItem = ({orderDish}: {orderDish: ORDERDISH}) => {
    const tw = useTailwind();
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;

  return (
    <View style={tw('w-full flex-row items-center justify-between  my-2 pb-4 px-4')}>
        <Text style={[tw('text-black mr-4'), {fontSize: 18}]}>{orderDish.quantity}.</Text>
        <View style={tw('flex items-start justify-start flex-1')}>
            <Text style={[tw('text-black '), {fontSize: 18}]}>{orderDish.dish.name}</Text>
        </View>
        <Text style={tw('text-black')}>{Math.round(orderDish.dish.price * orderDish.quantity * 100 / 100).toFixed(2)} €</Text>
    </View>
  )
}

export default OrderDetailedItem

const styles = StyleSheet.create({})