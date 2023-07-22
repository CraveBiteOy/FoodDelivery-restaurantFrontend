import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React  , {useCallback, useEffect, useState} from 'react'
import { DISH } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import { DishListNavigationProp } from '../screens/DishListScreen';
import { HOST_URL } from '../store/store';


type DishComponentProp = {
    dish: DISH,
    navigation: DishListNavigationProp
}

const imageDefault = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80";

const DishComponent = ({dish, navigation}: DishComponentProp) => {
    const tw = useTailwind();
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const image = dish?.imageurl == null ? imageDefault : dish?.imageurl &&  dish?.imageurl?.startsWith("https") ? dish.imageurl : HOST_URL + "/api/images/image/" + dish.imageurl;
    const pressFunction = () => {
      console.log("dish " + dish.id);
      navigation.navigate("DishForm", {dishID: dish?.id, restaurantID: dish.restaurant})
    }


  return (
    <TouchableOpacity onPress={pressFunction} style={[tw('w-full  flex-row items-center justify-between border-b border-gray-200 my-2 rounded-md'), {backgroundColor: dish.availability ? "white" : "#a1a1aa"}]}>
      <View style={tw('flex items-start justify-start flex-1 ml-6')}>
        <Text style={[tw(' font-bold mb-4 text-lg '), {fontSize: 18, color: dish.availability ? "#f7691a" : "#4b5563"}]}>{dish.name}</Text>
        <Text style={[tw(' mb-2 font-bold'), {color: "#4b5563"}]}>{Math.round(dish.price * 100 / 100).toFixed(2)} €</Text>
        {!dish.availability && (
          <Text style={[tw(' text-lg font-bold'), {color: "#4b5563"}]}>UNSOLD</Text>
        )}
      </View>
      {image && (
        <Image source={{uri: image}} style={[tw('rounded-md'), {height: 120, width: 160}]}></Image>
      )}
    </TouchableOpacity>
  )
}

export default DishComponent

const styles = StyleSheet.create({})