import { Alert,  Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewBase, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Image, useWindowDimensions } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo, useLayoutEffect} from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux';
import { HOST_URL, RootState } from '../store/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { DrawerNavigationType } from '../navigation/Drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { uploadImageFunction } from '../utils/ImageUitls';
import { Button } from '@rneui/base';
import { ownerByAuthUserAction } from '../store/actions/OwnerAction';
import { MainStackParamList } from '../navigation/MainStack';
import { DishStackParamList } from '../navigation/DishStack';
import { createDishAction, dishByIdAction, dishesByRestaurantAction, resetDishAction, updateDishAction } from '../store/actions/DishAction';
import { DISH, DISH_CREATE } from '../model/index.d';
import { Switch } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';


export type DishFormNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<DishStackParamList, "DishForm">,
DrawerNavigationProp<DrawerNavigationType>>;

type DishFormRouteProp = RouteProp<DishStackParamList, "DishForm">;

const DishForm = () => {
  const {dishID, restaurantID} = useRoute<DishFormRouteProp>().params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<DishFormNavigationProp>();
  const tw = useTailwind();
  const {restaurant, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
  const {dishes, dish, dishError, dishSuccess} = useSelector((state: RootState) => state.DISHES);
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const dispatch = useDispatch();
  const [imageurl, setImageurl] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("10");
  const [availability, setAvailability] = useState<boolean>(false);
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const addImage = async () => {
    const image = await uploadImageFunction();
    console.log("image:  " + image)
    setImageurl(image);
  }

  const submitFunction = async () => {
    if(!dishID) {
      if(name?.length > 0 && description.length > 0) {
        const req : DISH_CREATE = {
          description,
          name,
          restaurant: restaurantID,
          price: parseInt(price)
        }
        if(imageurl && imageurl?.length > 0) {
          req.imageurl = imageurl
        }
        dispatch(createDishAction(req, navigation) as any);
      }
    } else {
      dispatch(updateDishAction(dishID, navigation, name, description, +price, imageurl && imageurl, availability) as any)
    }
  }

  const loadDish= useCallback(async () => {
    if(dishID) {
      await dispatch(dishByIdAction(dishID) as any);
    }
  }, [dishID]);

  useEffect(() => {
      // dispatch(resetDishAction() as any);
      loadDish();
  }, [dishID])

  useEffect(() => {
    if(dishID && dish) {
      setDescription(dish.description);
      setName(dish.name)
      setPrice(dish.price + "")
      setImageurl(dish.imageurl ? dish.imageurl : null);
      setAvailability(dish.availability);
    }
  }, [dishID, dish])

  return (
    <KeyboardAvoidingView style={tw('flex-1')}>
      <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
          <SafeAreaView style={tw('flex-1 w-full items-center justify-center px-4')}>         
            <Text style={tw('font-bold mb-10 text-3xl text-[#f7691a]')}>{dishID ? "Update Dish" : "New Dish"}</Text>        
            <TextInput value={name} placeholder="Dish name" onChangeText={(text: string) => setName(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
            <TextInput value={description} placeholder="description" onChangeText={(text: string) => setDescription(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
            <View style={tw('flex items-start justify-center w-full mb-4')}>
                <Text style={tw(' text-lg font-bold text-gray-500 mb-2')}>Price €:</Text>
                <TextInput keyboardType='numeric'  value={price} placeholder="Time for cooking an order" onChangeText={(value: any) => setPrice(value)} style={[tw(' border border-gray-400 py-2 px-4 rounded-lg text-lg w-full'), {}]}></TextInput>
            </View>
            {dishID && (
                <View style={tw('flex flex-row items-center justify-start mt-2 w-full mb-4')}>
                    <Text style={tw(' text-lg font-bold text-gray-500 mr-6')}>Availability</Text>
                    <Switch
                      color='#f7691a'
                      value={availability}
                      onValueChange={(value: boolean) => setAvailability(value)}
                    />
                </View>
            )}
            <View style={[tw('flex-row items-center my-4 mb-8 px-4'), {width: width}]}>
                  <TouchableOpacity onPress={addImage}  style={[{ height: 40, width: 40, zIndex: 10}, tw('bg-[#f7691a] rounded-full  items-center justify-center')]}>
                      <MaterialCommunityIcons name='file-image' size={26} color="white"/>
                  </TouchableOpacity>
                  {imageurl && imageurl?.length > 0 ? (
                    <Image source={{uri: HOST_URL + "/api/images/image/" + imageurl}} style={[tw('rounded-lg'), {height: height/5, width: width - 100, objectFit: "cover", marginLeft: 20}]}></Image>
                  ): (
                    <Text style={tw('ml-4 text-base text-gray-500')}>Add Image</Text>
                  )}
            </View>
            <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mb-6')} size='lg' title={dishID ? "Update Dish" : "Create New Restaurant"} onPress={submitFunction}></Button>         
          </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default DishForm

const styles = StyleSheet.create({})