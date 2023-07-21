import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, ImageBackground, Button } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react'
import store, { HOST_URL } from './src/store/store';
import { uploadImageFunction } from './src/utils/ImageUitls';
import { launchImageLibrary } from 'react-native-image-picker';
import { ImageData } from './src/model/index.d';
import axios from 'axios';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import MainStack from './src/navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
const App = () => {

  return (
    //@ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>   
      <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </TailwindProvider>
    
  )
}

export default App

const styles = StyleSheet.create({})