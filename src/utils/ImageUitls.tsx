import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { HOST_URL } from '../store/store';
import { ImageData } from '../model/index.d';

export const uploadImageFunction = async () => {
    const images: any = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1
    })
    console.log(images)
    const formdata = new FormData();
    if(!images.canceled) {
            console.log(images.assets[0])
            const split = images.assets[0].uri.split('/')
            const fileNameDot = split[split.length - 1].split(".")
            const fileName = fileNameDot[0]
            const imageFile = {
                uri: images.assets[0].uri,
                type: images.assets[0].type,
                name: fileName
            }
            console.log(imageFile)
           formdata.append("file",  JSON.parse(JSON.stringify(imageFile)))         
    }
    console.log(formdata)
    const res = await axios.post(HOST_URL + "/api/images/singleImage", formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    const data: ImageData = await res.data;
    console.log(data.image)
    return data.image;
  }