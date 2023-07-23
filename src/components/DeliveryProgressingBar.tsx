import { StyleSheet, Text, View, Animated } from 'react-native'
import React from 'react'
import { ORDER_STATUS } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';

const DeliveryProgressingBar = ({status}: {status: ORDER_STATUS}) => {
    const tw = useTailwind();
    let width = 0;
    let description = "the order is waiting for your approval";

    if(status == ORDER_STATUS.NEW || status == ORDER_STATUS.OWNER_REJECTED) {
        width = 3;
    } else if(status == ORDER_STATUS.COOKING || status == ORDER_STATUS.COURIER_ACCEPTED || status == ORDER_STATUS.COURIER_REJECTED) {
        width = 25;
    } else if(status == ORDER_STATUS.READY_FOR_PICKUP || status == ORDER_STATUS.PICKED_UP) {
        width = 50;
    } else if(status == ORDER_STATUS.COMPLETED) {
        width = 100;
    }

    if(status == ORDER_STATUS.COURIER_ACCEPTED) {
        description = "the order is waiting for the courier";
    } else if(status == ORDER_STATUS.COURIER_REJECTED ) {
        description = "the order is waiting for the courier";
    } else if(status == ORDER_STATUS.READY_FOR_PICKUP ) {
        description = "the order is waiting for the courier";
    } else if(status == ORDER_STATUS.COMPLETED) {
        description = "the order is completed";
    } else if(status == ORDER_STATUS.PICKED_UP) {
        description = "the order was picked up";
    } else if(status == ORDER_STATUS.OWNER_REJECTED) {
        description = "";
    }
    
  return (
   <View style={tw(' w-full items-center justify-center')}>
     <View style={styles.progressBar}>
      <Animated.View style={{ backgroundColor: "#46FF33", width: `${width}%`, borderRadius: 4}}/>
    </View>
    {status != ORDER_STATUS.NEW && status != ORDER_STATUS.COOKING && ORDER_STATUS.OWNER_REJECTED && (
        <View style={tw('flex w-full items-center justify-start mx-auto')}>
            <Text style={tw('text-lg font-bold text-[#f7691a] mt-8')}>{description}</Text>
        </View>
    )}
   </View>
  )
}

export default DeliveryProgressingBar

const styles = StyleSheet.create({
    progressBar: {
        width: '80%',
        height: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        flexDirection:"row"
      }
})