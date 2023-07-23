import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { ChangePasswordAction, getAuthUserAction, updateProfileAction } from '../store/actions/userAction';
import LoadingComponent from '../components/LoadingComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';
import { CHANGEPASSWORD } from '../model/index.d';
import { PersonalStackParamList } from '../navigation/PersonalStack';
import { DrawerNavigationType } from '../navigation/Drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';


export type PasswordUpdateFormNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<PersonalStackParamList, "PasswordUpdateForm">,
DrawerNavigationProp<DrawerNavigationType>
>;


const PasswordUpdateForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigation<PasswordUpdateFormNavigationProp>();
    const tw = useTailwind();
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS);
    const dispatch = useDispatch();
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");

    const loadAuthUser = useCallback(async () => {
        dispatch(getAuthUserAction() as any);
      }, []);
    
    useEffect(() => {
        if(!authUser) {
          setIsLoading(true);
          loadAuthUser().then(() => setIsLoading(false));
        }
    }, [authUser])

    const updatePassword = async () => {
        if(password?.length > 0 && newPassword?.length > 0 && confirm?.length > 0) {
            const req : CHANGEPASSWORD = {
                password: password,
                newPassword: newPassword,
                confirmPassword: confirm
            }
            await dispatch(ChangePasswordAction(req) as any);
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
                <View style={[tw(' items-center justify-center flex px-4'), {height: "100%", width: "100%"}]}>  
                    <View style={tw('mb-4 w-full')}>
                        <Text style={tw('mb-2 text-black text-base')}>Current Password</Text>
                        <TextInput secureTextEntry value={password} placeholder="Current Password" onChangeText={(text: string) => setPassword(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')}></TextInput> 
                    </View>
                    <View style={tw('mb-4 w-full')}>
                        <Text style={tw('mb-2 text-black text-base')}>New Password</Text>
                        <TextInput secureTextEntry value={newPassword} placeholder="New Password" onChangeText={(text: string) => setNewPassword(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')}></TextInput> 
                    </View>
                    <View style={tw('mb-4 w-full')}>
                        <Text style={tw('mb-2 text-black text-base')}>Confirm Password</Text>
                        <TextInput secureTextEntry value={confirm} placeholder="Confirm Password" onChangeText={(text: string) => setConfirm(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg')} onSubmitEditing={updatePassword}></TextInput> 
                    </View>
                    <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mt-6')} size='lg' title='Update Password' onPress={updatePassword}></Button>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default PasswordUpdateForm