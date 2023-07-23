import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { getAuthUserAction, updateProfileAction } from '../store/actions/userAction';
import LoadingComponent from '../components/LoadingComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';
import { PersonalStackParamList } from '../navigation/PersonalStack';
import { DrawerNavigationType } from '../navigation/Drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';



export type UpdateProfileFormNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<PersonalStackParamList, "UpdateProfileForm">,
DrawerNavigationProp<DrawerNavigationType>
>;

const UpdateProfileForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigation<UpdateProfileFormNavigationProp>();
    const tw = useTailwind();
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState<string>(authUser?.firstname);
    const [surename, setSurename] = useState<string>(authUser?.surename);

    const loadAuthUser = useCallback(async () => {
        dispatch(getAuthUserAction() as any);
      }, []);
    
    useEffect(() => {
        if(!authUser) {
          setIsLoading(true);
          loadAuthUser().then(() => setIsLoading(false));
        }
    }, [authUser])

    const updateProfileFunction = async () => {
        if(firstname && surename) {
          await dispatch(updateProfileAction(firstname, surename) as any);
          navigation.goBack();
        } else {
          Alert.alert("please type required information");
        }
    }

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerShown: true,
    //         headerTitle: "Your Profile"
    //     })
    // }, [navigation])

  return (
    <KeyboardAvoidingView style={tw('flex-1')}>
        <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
            <SafeAreaView style={tw('flex-1')}>
                <View style={[tw('  items-center justify-center flex px-4'), {height: "100%", width: "100%"}]}>  
                    <View style={tw('mb-4 w-full')}>
                        <Text style={tw('mb-2 text-black text-base')}>First name</Text>
                        <TextInput value={firstname} placeholder="firstname" onChangeText={(text: string) => setFirstname(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')}></TextInput> 
                    </View>
                    <View style={tw('mb-4 w-full')}>
                        <Text style={tw('mb-2 text-black text-base')}>Surename</Text>
                        <TextInput onSubmitEditing={updateProfileFunction} value={surename} placeholder="surename" onChangeText={(text: string) => setSurename(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')}></TextInput> 
                    </View>
                    <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mt-6')} size='lg' title='Update Profile' onPress={updateProfileFunction}></Button>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default UpdateProfileForm

const styles = StyleSheet.create({})