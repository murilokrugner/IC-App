import React, {useState, useEffect} from 'react';
import { ActivityIndicator, SafeAreaView, Alert } from 'react-native';

import { Container, Box, BoxImageCover, ImageCover, 
    BoxPositionSelectPhoto, BoxImageSelectPhoto, BoxSelectPhoto, SelectPhoto, 
        BoxPhoto, ImagePhoto, BoxName, Name } from './styles';

import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import ImagePicker from 'react-native-image-picker';
import { useAuth } from '../../hooks/auth';

import Camera from '../../assets/camera.png';

import api from '../../services/api';

const Profile = () => {
    const { dataAuth } = useAuth();
    const navigation = useNavigation();

    const [loadingPreview, setLoadingPreview] = useState(false);
    const [loadingPreviewCover, setLoadingPreviewCover] = useState(false);
    const [preview, setPreview] = useState('');
    const [previewCover, setPreviewCover] = useState('');
    const [imageCover, setImageCover] = useState();
    const [imagePhoto, setImagePhoto] = useState();

    const userId = dataAuth.id;

    useEffect(() => {
      async function loadImages() {
        setLoadingPreview(true);
        setLoadingPreviewCover(true);

        const response = await api.get(`getImages?id=${userId}`);
        
        if (response.data.user.avatar === null) {
          setImagePhoto();
          setLoadingPreview(false);
          setLoadingPreviewCover(false);
        } else {
          setImagePhoto(response.data.user.avatar.url);
          setLoadingPreview(false);
          setLoadingPreviewCover(false);
        }

        if (response.data.user.cover === null) {
          setImageCover();
          setLoadingPreview(false);
          setLoadingPreviewCover(false);
        } else {
          setImageCover(response.data.user.cover.url);
          setLoadingPreview(false);
          setLoadingPreviewCover(false);
        }
      }

      loadImages();
    }, []);


    async function handleUpCover() {

    }

    async function handleUpImage() {

    }

  return (
    <SafeAreaView>
        <Container>
            <Box>        
                <BoxImageCover>
                {loadingPreviewCover ? (
                    <ActivityIndicator style={{marginBottom: 130}} color="#000" size="small" />
                  ) : (
                    <>
                      {previewCover ? (
                        <ImageCover  source={previewCover} />
                      ) : (
                        <ImageCover  source={{
                          uri: imageCover !== undefined
                            ? imageCover
                            : `https://ui-avatars.com/api/?name=${dataAuth.name}&size=395&background=random&color=000`,
                          }} />
                      )}
                    </>
                  )}
                    <BoxPositionSelectPhoto style={{width: 390, height: 260}}>
                        <BoxSelectPhoto onPress={handleUpCover}>
                            <BoxImageSelectPhoto>                            
                                <SelectPhoto source={Camera} />
                            </BoxImageSelectPhoto>
                        </BoxSelectPhoto>
                    </BoxPositionSelectPhoto>          
                </BoxImageCover>        
                <BoxPhoto>
                  {loadingPreview ? (
                    <ActivityIndicator style={{marginTop: 130}} color="#000" size="small" />
                  ) : (
                    <>
                      {preview ? (
                        <ImagePhoto  source={preview} />
                      ) : (
                        <ImagePhoto  source={{
                          uri: imagePhoto !== undefined
                            ? imagePhoto
                            : `https://ui-avatars.com/api/?name=${dataAuth.name}&size=220&background=random&color=000`,
                          }} />
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
                    <Name>{dataAuth.name}</Name>                
                </BoxName>         
            </Box>            
        </Container>
    </SafeAreaView>
  );
}

export default Profile;