import React, {useState, useEffect} from 'react';
import { ActivityIndicator, SafeAreaView, Alert } from 'react-native';

import { Container, Box, BoxImageCover, ImageCover, BoxPositionSelectCover, 
    BoxSelectCover, SelectCover, BoxPositionSelectPhoto, BoxImageSelectPhoto, BoxSelectPhoto, SelectPhoto, 
        BoxPhoto, ImagePhoto, BoxName, Name, BoxStars, ImageStar, ButtonNext } from './styles';

import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import ImagePicker from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-crop-picker';

import Crf from '../../../assets/crf.jpg';
import Camera from '../../../assets/camera.png';
import Murilo from '../../../assets/murilo.jpg';
import Stars from '../../../assets/starts.png';

import api from '../../../services/api';

const CompleteRegister = () => {
    const navigation = useNavigation();

    function handleNext() {
        navigation.navigate('AddTypesServices');
    }

    const [loadingPreview, setLoadingPreview] = useState(false);
    const [preview, setPreview] = useState('');

    useEffect(() => {
        showMessage({
            message: "Complete seu perfil, adicionando algumas fotos",
            type: "info",
            duration: 5000,        
            titleStyle: {
                fontSize: 17,
                fontWeight: 'bold',
            },
            backgroundColor: '#f08080',
          });        
    }, []);

    function handleUpImage() {
        setLoadingPreview(true);

        /*Alert.alert(
            'Selecionar imagem',
            'Onde deseja selecionar a imagem?',
            [
              {
                text: 'Camera',
                onPress: () => {
                    ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                        includeBase64: true,
                        mediaType: 'photo',
                        enableRotationGesture: true,
                        useFrontCamera: true,
                        includeExif: true,
                      }).then(image => {
                        setPreview(image.data);
                        setLoadingPreview(false);
                      });  
                },
              },
              {
                text: 'Galeria',
                onPress: async () => {
                    ImagePicker.openPicker({
                        width: 300,
                        height: 400,
                        cropping: true,
                        includeBase64: true,
                        mediaType: 'photo',
                        enableRotationGesture: true,
                        includeExif: true,
                      }).then(image => {
                        setPreview(image.data);
                                 
                        handleUploadPhoto(image.path, image.mime);                        
                      });  
                },
              },
            ],
          ); */
          ImagePicker.showImagePicker(
            {
              title: 'Selecione uma nova foto',
            },
            upload => {
              if (upload.uri) {
                const previewData = {
                  uri: `data:image/jpeg;base64,${upload.data}`,
                };
      
                let prefix;
                let ext;
      
                if (upload.fileName) {
                  [prefix, ext] = upload.fileName.split('.');
                  ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
                } else {
                  prefix = new Date().getTime();
                  ext = 'jpg';
                }
      
                const imageData = {
                  uri: upload.uri,
                  type: upload.type,
                  name: `${prefix}.${ext}`,
                };

                const data = new FormData();

                data.append('file', imageData);
      
                setPreview(previewData);
                handleUploadPhoto(data);
              }
            },
          );               
        }

  async function handleUploadPhoto(data) {

    const response = await api.post('files', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setLoadingPreview(false);
  }

  return (
    <SafeAreaView>
        <Container>
            <Box>        
                <BoxImageCover>
                    <ImageCover source={Crf} />
                    <BoxPositionSelectCover>            
                        <BoxSelectCover>
                            <SelectCover source={Camera} />
                        </BoxSelectCover> 
                    </BoxPositionSelectCover>           
                </BoxImageCover>        
                <BoxPhoto>
                    {loadingPreview ? (
                        <ActivityIndicator style={{marginTop: 130}} color="#000" size="small" />
                    ) : (
                        <>
                            {preview !== undefined && (
                                <ImagePhoto  source={preview} />
                            )}
                        </>
                    )}
                    <BoxPositionSelectPhoto>
                        <BoxSelectPhoto onPress={handleUpImage}>
                            <BoxImageSelectPhoto>                            
                                <SelectPhoto source={Camera} />
                            </BoxImageSelectPhoto>
                        </BoxSelectPhoto>
                    </BoxPositionSelectPhoto>
                </BoxPhoto>
                <BoxName>
                    <Name>Murilo Krugner</Name>                
                </BoxName>   
                <BoxStars>
                    <ImageStar source={Stars} />
                </BoxStars>      

                <ButtonNext onPress={handleNext}>Avançar</ButtonNext>   
            </Box>
        </Container>
    </SafeAreaView>
  )
}

export default CompleteRegister;