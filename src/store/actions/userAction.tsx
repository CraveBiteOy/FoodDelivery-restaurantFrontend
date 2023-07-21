import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, LoginForm,  UserRegisterForm } from "../../model/index.d";
import { Alert } from 'react-native'

export const login = (loginForm: LoginForm) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    const {longitude, latitude, username, password} = loginForm;
    try {
        const res = await axios.put(HOST_URL + "/api/users/signIn", {
            username,
            password,
            longitude,
            latitude
        });
 
        const data = res.data
        console.log(res.data)
        // console.log(res.headers)
        const token : string =  res.headers.authorization ?? ""
        console.log(token)
        await AsyncStorage.setItem("token", token)
        dispatch({
            type: "LOG_IN",
            payload: data
        })
    } catch (err) {
        console.log(err);
        Alert.alert("login failed") 
        dispatch({
            type: "USER_ERROR",
            payload: err
        });
    }
}
 
export const Register = (registerForm: UserRegisterForm) => async (dispatch: Dispatch<ACTION>, getState: any) => {
     try {
        console.log("sign up")
        const res = await axios.post(HOST_URL + "/api/users/signup", registerForm);
        const data = await res.data
        console.log(data)
        const token : string =  res.headers.authorization?? ""
        console.log(token)
        await AsyncStorage.setItem("token", token)
        dispatch({
            type: "REGISTER",
            payload: data
        })
     } catch (err) {
      dispatch({
          type: "USER_ERROR",
          payload: err
      })
     }
  
  }
 
  export const ChangePasswordAction = (form: CHANGEPASSWORD) => async (dispatch: Dispatch<ACTION>, getState: any) => {
     try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if (token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "USER_ERROR",
                payload: "token is null"
            });
        } else { 
            const res = await axios.put(HOST_URL + "/api/users/authUser/updatePassword", form, {
                headers: {
                    "Authorization": token
                }
            })
            const data = await res.data
            dispatch({
                type: "Change_Password",
                payload: data
            })
            Alert.alert("Changed Password successfully"); 
        }
    } catch (err) {
        dispatch({
            type: "USER_ERROR",
            payload: err
        })
    }  
  }
  export const updateCoordinateAction = (longitude: number, latitude: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token"); 
       if (token == null) {
           console.log("token is null");
           Alert.alert("token is null") 
           dispatch({
               type: "USER_ERROR",
               payload: "token is null"
           });
       } else { 
           
            const res = await axios.put(HOST_URL + `/api/users/update/longitude/${longitude}/latitude/${latitude}`, {}, {
               headers: {
                   "Authorization": token
               }
            })
            const data = await res.data
            dispatch({
               type: "update_coordinate",
               payload: data
            })
            console.log(`longitude ${longitude} , latitude ${latitude}`);
       }
    } catch (err) {
       dispatch({
           type: "USER_ERROR",
           payload: err
       })
   }  
 }
 export const updateTextAddressAction = (address: string, zipcode: string, city: string) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
       const token : string | null = await AsyncStorage.getItem("token"); 
       if (token == null) {
           console.log("token is null");
           Alert.alert("token is null") 
           dispatch({
               type: "USER_ERROR",
               payload: "token is null"
           });
       } else { 
           
            const res = await axios.put(HOST_URL + `/api/users/update/zipcode/${zipcode}/city/${city}/address/${address}`, {}, {
               headers: {
                   "Authorization": token
               }
            })
            const data = await res.data
            dispatch({
               type: "update_textAddress",
               payload: data
            })
            console.log(`address ${address}, zipcode ${zipcode} city ${city}`);
       }
    } catch (err) {
       dispatch({
           type: "USER_ERROR",
           payload: err
       })
   }  
 }

  export const getAuthUserAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if (token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "USER_ERROR",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/users/authUser/getAuthUser", {
                headers: {
                    "Authorization": token
                }
            })
            const data = await res.data
            dispatch({
                type: "get_authUser",
                payload: data
            })
        }
   } catch (err) {
       dispatch({
           type: "USER_ERROR",
           payload: "loading authenticated user failed"
       })
   }  
 }


 
  export const LogOutAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
     try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if (token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "USER_ERROR",
                payload: "token is null"
            });
        } else {
            await axios.get(HOST_URL + "/logout", {
                headers: {
                    "Authorization": token
                }
            })
        }
        await AsyncStorage.removeItem("token");
        console.log("logout");
        dispatch({
            type: "LOG_OUT"
        })
      
     } catch (err) {
        dispatch({
            type: "USER_ERROR",
            payload: err
        })
     }
  
}

export const updateProfileAction = (firstname?: string, surename?: string) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token");  
        let queryString = "";
        if(firstname && firstname.length > 0) {
            queryString += "firstname=" + firstname + "&";
        }
        if(surename && surename.length > 0) {
            queryString += "surename=" + surename + "&"; 
        }
        
        const res = await axios.put(HOST_URL + "/api/users/authUser/updateProfile?" + queryString, {}, {
            headers: {
                "Authorization": token ?? ""
            }
        })
        const data = await res.data;
        console.log(data);
        dispatch({
            type: "update_profile",
            payload: data
        })
        Alert.alert("Updated successfully"); 
    } catch (err) {
        dispatch({
            type: "USER_ERROR",
            payload: err
        })
    }  
 }

 

 export const ResetUser = () => (dispatch : Dispatch<ACTION>, getState: any) => {
     dispatch({
         type: "USER_RESET"
     })
 }
 