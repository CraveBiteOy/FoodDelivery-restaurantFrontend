import { requestLocationPermission } from "./GeolocationPermission";
import Geolocation from 'react-native-geolocation-service';

export const getLocation = (setLocation: any) => {
    const result =  requestLocationPermission();
    let newlocation =  result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position : Geolocation.GeoPosition) => {
            console.log(position);
            setLocation(position);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(null);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    return newlocation;
};