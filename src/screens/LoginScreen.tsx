import { Alert,  Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewBase, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTailwind from 'tailwind-rn/dist/use-tailwind'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button } from '@rneui/themed';
import { MainStackParamList } from '../navigation/MainStack'
import { RootState } from '../store/store'
import { ResetUser, login } from '../store/actions/userAction'

export type LoginNavigationStack = NativeStackNavigationProp<MainStackParamList>;

const LoginScreen = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [longitude, setLongitude] = useState<number | null>(null)
    const [latitude, setLatitude] = useState<number | null>(null)
    const tw = useTailwind()
    const { authUser, authError, authSuccess} = useSelector((state: RootState) => state.USERS)
    const {owner, ownerSuccess} = useSelector((state: RootState) => state.OWNERS)
    const dispatch = useDispatch()
    const navigation = useNavigation<LoginNavigationStack>()


    const submitFunction = async () => {
        console.log("login")
        if(username && username.length > 0 && password && password.length > 0) {
            await  dispatch(login({username, password}, navigation) as any)
            console.log(username + " : " + password)
            setUsername("")
            setPassword("")
            
        } else {
            Alert.alert("please fill all required information")
        }
    }

    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }

  return (

    <KeyboardAvoidingView style={tw('flex-1')}>
        <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
            <SafeAreaView style={tw('flex-1 items-center justify-start px-4')}>              
                <View style={styles.centered}>
                    <Image
                        source={require("../assets/MicrosoftTeams-image.png")}
                        style={styles.logo}
                    />
                </View>   
                <TextInput value={username} placeholder="username" onChangeText={(text: string) => setUsername(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')}></TextInput>
                <TextInput secureTextEntry={true} value={password}  placeholder="Password" onChangeText={(text: string) => setPassword(text)} style={tw('w-full border border-gray-400 py-2 px-4 rounded-lg text-lg mb-6')} onSubmitEditing={submitFunction}></TextInput>
                <Button  color="#f7691a" containerStyle={tw('w-full rounded-lg mb-6')} size='lg' title='Log In' onPress={submitFunction}></Button>
                <View style={tw('flex flex-row')}>
                    <Text style={tw('text-base text-gray-400 mr-4')}>Don't have an account?</Text>
                    <TouchableOpacity activeOpacity={0.2} onPress={navigateToSignUp}>
                        <Text style={tw('text-base text-zinc-700 mr-4')}>Sign Up</Text>
                    </TouchableOpacity>
                </View>          
            </SafeAreaView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 100,
    },
    centered: {
        alignItems: 'center',
        marginVertical: 100
    },
})