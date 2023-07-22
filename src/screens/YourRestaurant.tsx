import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, BackHandler } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo, useLayoutEffect} from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux';
import { HOST_URL, RootState } from '../store/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import LoadingComponent from '../components/LoadingComponent';
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import { DrawerNavigationType } from '../navigation/Drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { firstRestaurantForAuthOwnerAction, updateRestaurantAction } from '../store/actions/RestaurantAction';
import { uploadImageFunction } from '../utils/ImageUitls';
import { Button } from '@rneui/base';
import { ownerByAuthUserAction } from '../store/actions/OwnerAction';
import { MainStackParamList } from '../navigation/MainStack';


export type YourRestaurantNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<DrawerNavigationType, "Restaurant">,
DrawerNavigationProp<MainStackParamList>>;


const YourRestaurant = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isrefreshing, setIsRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<YourRestaurantNavigationProp>();
  const tw = useTailwind();
  const {restaurant, restaurantError, restaurantSuccess} = useSelector((state: RootState) => state.RESTAURANTS);
  const {dishes, dishError, dishSuccess} = useSelector((state: RootState) => state.DISHES);
  const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPonits = useMemo(() => ['3', '50'], [])
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const [img, setImg] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [cookingTime, setCookingTime] = useState<string>("")
  const [isTime, setIsTime] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);

  const handleSheetChange = useCallback((index: any) => {
      console.log(index)
  }, []);

  const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    
  }, []);

  const handleDismissModalPress = useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
      setIsName(false);
      setIsTime(false);
  }, []);


  const loadRestaurant = useCallback(async () => {
      setIsRefreshing(true);
      await dispatch(firstRestaurantForAuthOwnerAction() as any);
      setIsRefreshing(false);
  }, [authUser]);

  const loadOwner = useCallback(async () => {
      await dispatch(ownerByAuthUserAction() as any);
  }, [authUser]);

  
  useEffect(() => {
      setIsLoading(true);
      loadRestaurant().then(() => loadOwner()).then(() => setIsLoading(false));
  }, [authUser])

  useEffect(() => {
    if(restaurant?.imageurl?.length > 0) {
      if(restaurant.imageurl.startsWith("https")) {
        setImg(restaurant?.imageurl);
      } else {
        setImg(HOST_URL + "/api/images/image/" + restaurant.imageurl);
      }  
    }
    if(restaurant?.name) {
      setName(restaurant.name);
    }
    if(restaurant) {
      setCookingTime(restaurant.cookingTime + "");
    }
  }, [restaurant, authUser])

  useFocusEffect(
    useCallback(() => {
        const onBackPress = () => {
            navigation.navigate("LoginScreen");
            return true;
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => backHandler.remove();
    }, [navigation])
 )

  const openNameModal = () => {
    handlePresentModalPress();
    setIsName(true);
  }

  const openTimeModal = () => {
    handlePresentModalPress();
    setIsTime(true);
  }


  const editRestaurantName = async () => {
    if(name?.length > 0 && restaurant) {
      await dispatch(updateRestaurantAction(restaurant.id, name, restaurant?.imageurl, restaurant?.cookingTime) as any);
      handleDismissModalPress();
    }
  }

  const editCookingTime = async () => {
    if(cookingTime?.length > 0 && restaurant ) {
      await dispatch(updateRestaurantAction(restaurant.id, restaurant?.name, restaurant?.imageurl, parseInt(cookingTime)) as any);
      handleDismissModalPress();
    }
  }

  const updateImage = async () => {
      if (restaurant) {
        const image = await uploadImageFunction();
        console.log(image);
        dispatch(updateRestaurantAction(restaurant.id, restaurant?.name, image, restaurant?.cookingTime) as any);
      }
  }

  if(isLoading) {
      return <LoadingComponent/>
  }

  if(!restaurant) {
    return (
      <View style={tw('flex-1')}>
        <Text>No restaurants</Text>
      </View>
    )
  }


  return (
    <BottomSheetModalProvider>
        <View style={tw('flex-1 relative')}>
          <View>
            {img && (
              <View style={tw('relative')}>
                    <Image source={{uri: img}} style={[tw('mb-2'), {height: height/3, width: width, objectFit: "cover", objectPostion: "center"}]}></Image>
                    <TouchableOpacity onPress={updateImage}  style={[{top: 10, right: 10, height: 40, width: 40, zIndex: 10}, tw('bg-[#f7691a] rounded-full absolute items-center justify-center')]}>
                        <MaterialCommunityIcons name='file-image-plus' size={26} color="white"/>
                    </TouchableOpacity>
              </View> 
            )}
            <View style={tw('px-4')}>
                <View style={[tw('flex flex-row items-center justify-center mt-6 w-full px-4 border-gray-300 py-2'), {}]}>
                  <Text style={tw('text-3xl font-bold text-[#f7691a] my-4 mx-auto')}>{name}</Text>
                  <TouchableOpacity onPress={openNameModal}  style={[{}, tw('bg-[#f7691a] rounded-full  items-center justify-center ml-4 p-2')]}>
                      <AntDesign name='edit' size={24} color="white"/>
                  </TouchableOpacity>
                </View>
                <View style={[tw('flex flex-row items-center justify-between mt-6 w-full  border-gray-300 py-2'), {borderBottomWidth: 2}]}>
                    
                    <Text style={tw('mx-2  text-lg text-black')}>{restaurant?.address}, {restaurant?.zipcode} {restaurant?.city?.toUpperCase()}</Text>
                    <Entypo name={"location-pin"} size={34} color="#f7691a"></Entypo>
                </View>  
                <View style={[tw('flex flex-row items-center justify-between mt-6 w-full  border-gray-300 py-2'), {borderBottomWidth: 2}]}>
                    
                    <Text style={tw('mx-2  text-lg text-black')}>{restaurant?.cookingTime} mintutes</Text>
                    <TouchableOpacity onPress={openTimeModal}>
                      <AntDesign name={"clockcircleo"} size={30} color="#f7691a"></AntDesign>
                    </TouchableOpacity>
                </View>  
                <View style={[tw('flex flex-row items-center justify-between mt-6 w-full  border-gray-300 py-2'), {borderBottomWidth: 2}]}>
                    
                    <Text style={tw('mx-2  text-lg text-black')}>{restaurant?.rating ? (Math.round(restaurant?.rating * 100  / 100).toFixed(2)) : 5}</Text>
                    <Entypo name={"star"} size={32} color="#f7691a"></Entypo>
                </View>        
            </View>
          </View>
          <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPonits}
                    onChange={handleSheetChange} 
                    onDismiss={() => {
                      setIsName(false);
                      setIsTime(false);
                    }}
                >
                    <KeyboardAvoidingView style={styles.contentContainer}>
                        <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
                          <>
                            {isName && (
                              <View style={tw('items-start justify-center px-4 flex-1 w-full')}>
                                <Text style={tw('my-2 text-lg text-gray-400')}>Restaurant Name</Text>
                                <TextInput value={name} placeholder="Restaurant Name" onChangeText={(text: string) => setName(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} onSubmitEditing={editRestaurantName}></TextInput>
                                <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mb-6')} size='lg' title='Edit Name' onPress={editRestaurantName}></Button>
                              </View>
                            )}
                            {isTime && (
                              <View style={tw('items-start justify-center px-4 flex-1 w-full')}>
                                <Text style={tw('my-2 text-lg text-gray-400')}>Estimated Cooking Time</Text>
                                <TextInput keyboardType='numeric'  value={cookingTime} placeholder="Time for cooking an order" onChangeText={(value: any) => setCookingTime(value)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} onSubmitEditing={editCookingTime}></TextInput>
                                <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mb-6')} size='lg' title='Edit Cooking Time' onPress={editCookingTime}></Button>
                              </View>
                            )}
                          </>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </BottomSheetModal>
          </View>
        </View>
    </BottomSheetModalProvider>
  )
}

export default YourRestaurant

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%"
},
contentContainer: {
    flex: 1,
    alignItems: 'center'
}
})