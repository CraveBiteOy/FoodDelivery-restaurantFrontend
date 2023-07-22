import { Alert,  Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewBase, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTailwind from 'tailwind-rn/dist/use-tailwind'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button } from '@rneui/themed';
import { MainStackParamList } from '../navigation/MainStack'
import { HOST_URL, RootState } from '../store/store'
import { ResetUser, login } from '../store/actions/userAction'
import { ownerByAuthUserAction } from '../store/actions/OwnerAction'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { uploadImageFunction } from '../utils/ImageUitls'
import { RESTAURANT_CREATE } from '../model/index.d'
import { createRestaurantAction } from '../store/actions/RestaurantAction'

export type RestaurantFormNavigationStack = NativeStackNavigationProp<MainStackParamList>;



const RestaurantForm = () => {
  const [name, setName] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [imageurl, setImageurl] = useState<string>("")
  const [zipcode, setZipcode] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [cookingTime, setCookingTime] = useState<string>("20")
  const tw = useTailwind()
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS)
  const {owner, ownerSuccess} = useSelector((state: RootState) => state.OWNERS)
  const dispatch = useDispatch()
  const navigation = useNavigation<RestaurantFormNavigationStack>()
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  
  const loadOwner = useCallback(async () => {
      await dispatch(ownerByAuthUserAction() as any);
  }, [authUser]);

  useEffect(() => {
      loadOwner()
  }, [authUser])

  useEffect(() => {
    console.log(cookingTime)
  }, [cookingTime])

  const addImage = async () => {
    const image = await uploadImageFunction();
    setImageurl(image);
  }


  const submitFunction = async () => {
      if(name?.length > 0 && zipcode?.length > 0 && city?.length > 0 && imageurl?.length > 0 && address?.length > 0 && cookingTime?.length > 0) {
        const req : RESTAURANT_CREATE = {
          name,
          zipcode,
          city,
          address,
          imageurl,
          cookingTime: +cookingTime
        }
        dispatch(createRestaurantAction(req, navigation) as any);
      }
  }

  return (
    <KeyboardAvoidingView style={tw('flex-1')}>
      <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
          <SafeAreaView style={tw('flex-1 w-full items-center justify-center px-4')}>         
              <Text style={tw('font-bold mb-10 text-3xl text-[#f7691a]')}>New Restaurant</Text>        
              <TextInput value={name} placeholder="Restaurant name" onChangeText={(text: string) => setName(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
              <TextInput value={address} placeholder="address" onChangeText={(text: string) => setAddress(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
              <TextInput value={city} placeholder="city" onChangeText={(text: string) => setCity(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
              <TextInput value={zipcode}  placeholder="zipcode" onChangeText={(text: string) => setZipcode(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} onSubmitEditing={submitFunction}></TextInput>
             <View style={tw('flex items-start justify-center w-full')}>
                <Text style={tw(' text-base text-gray-500 mb-2')}>Estimated Time for cooking an order</Text>
                <TextInput keyboardType='numeric'  value={cookingTime} placeholder="Time for cooking an order" onChangeText={(value: any) => setCookingTime(value)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
             </View>
            <View style={[tw('flex-row items-center my-4 mb-8 px-4'), {width: width}]}>
                  <TouchableOpacity onPress={addImage}  style={[{ height: 40, width: 40, zIndex: 10}, tw('bg-[#f7691a] rounded-full  items-center justify-center')]}>
                      <MaterialCommunityIcons name='file-image' size={26} color="white"/>
                  </TouchableOpacity>
                  {imageurl?.length > 0 ? (
                    <Image source={{uri: HOST_URL + "/api/images/image/" + imageurl}} style={[tw('rounded-lg'), {height: height/5, width: width - 100, objectFit: "cover", marginLeft: 20}]}></Image>
                  ): (
                    <Text style={tw('ml-4 text-base text-gray-500')}>Add Image</Text>
                  )}
            </View>
            <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mb-6')} size='lg' title='Create New Restaurant' onPress={submitFunction}></Button>         
          </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default RestaurantForm

const styles = StyleSheet.create({})