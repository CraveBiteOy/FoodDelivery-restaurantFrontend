import { Alert,  Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, FlatList, ListRenderItem } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { Button } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { HOST_URL, RootState } from '../store/store';
import { Register, ResetUser } from '../store/actions/userAction';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from '@rneui/base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { getLocation } from '../utils/GetLocationFromDevice';
import { validateConfirmPassword, validateName, validatePassword } from '../utils/FormValidation';
import Geolocation from 'react-native-geolocation-service';
import { MainStackParamList } from '../navigation/MainStack';


const SignUpScreen = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [surename, setSurename] = useState<string>("");
    const [location, setLocation] = useState<Geolocation.GeoPosition | null>();
    const tw = useTailwind();
    const {authUser, authError, authSuccess, message} = useSelector((state: RootState) => state.USERS);
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
   
    useEffect(() => {
        getLocation(setLocation);
    }, [])

    
    const submitFunction = async () => {
        if(username && username.length > 0 && password && password.length > 0 && confirmPassword === password && firstname && firstname.length > 0 && surename && surename.length > 0 && location) {
            const longitude = location?.coords?.longitude;
            const latitude = location?.coords?.latitude;
            await  dispatch(Register({username, firstname, surename, password, longitude: longitude, latitude: latitude}, navigation) as any)
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setFirstname("");
            setSurename("");
           
        } else {
            Alert.alert("please fill all required information")
        }
    }

  
    const navigateToLogin = () => {
        navigation.navigate('LoginScreen');
    }

    const validateInput = (result: string) => {
        if(result.length >  0) {
            return (
                <Text style={tw('mb-2 text-red-500 ml-4')}>{result}</Text>
            )
        }
    }

  return (
   <KeyboardAvoidingView style={tw('flex-1')}>
        <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
            <ScrollView style={tw('flex-1 mt-2 px-4')}>  
                <View style={styles.centered}>
                    <Image
                        source={require("../assets/MicrosoftTeams-image.png")}
                        style={styles.logo}
                    />
                </View>   
                {username?.length > 0 && validateInput(validateName(username, "username"))}
                <TextInput value={username} placeholder="username" onChangeText={(text: string) => setUsername(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
                
                {firstname?.length > 0 && validateInput(validateName(firstname, "firstname"))}
                <TextInput value={firstname} placeholder="firstname" onChangeText={(text: string) => setFirstname(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>

                {surename?.length > 0 && validateInput(validateName(surename, "surename"))}
                <TextInput value={surename} placeholder="surename" onChangeText={(text: string) => setSurename(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>

                {password?.length > 0 && validateInput(validatePassword(password))}
                <TextInput secureTextEntry={true} value={password}  placeholder="Password" onChangeText={(text: string) => setPassword(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} ></TextInput>

                {confirmPassword?.length > 0 && validateInput(validateConfirmPassword(password, confirmPassword))}
                <TextInput secureTextEntry={true} value={confirmPassword}  placeholder="confirm your Password" onChangeText={(text: string) => setConfirmPassword(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} ></TextInput>

                <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mb-6')} size='lg' title='Sign Up' onPress={submitFunction}></Button>
                <View style={tw('flex flex-row mx-auto')}>
                    <Text style={tw('text-base text-gray-400 mr-4')}> have an account?</Text>
                    <TouchableOpacity activeOpacity={0.2} onPress={navigateToLogin}>
                        <Text style={tw('text-base text-zinc-700 mr-4')}>Login</Text>
                    </TouchableOpacity>
                </View>
                {/* {location && (
                    <>
                        <Text style={tw('text-base text-gray-400 mr-4')}> longitude: {location ? location.coords.longitude : "error"}</Text>
                        <Text style={tw('text-base text-gray-400 mr-4')}> latitude: {location ? location.coords.latitude : "error"}</Text>
                    </>
                )} */}
            </ScrollView>
        </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    logo: {
        width: 250,
        height: 120,
    },
    centered: {
        alignItems: 'center',
        marginVertical: 30
    },
})