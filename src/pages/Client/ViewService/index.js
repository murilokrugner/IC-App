import React, {useState, useEffect} from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Alert } from 'react-native';

import { Container, Box, BoxImageCover, ImageCover,
   BoxPhoto, Line, ImagePhoto, BoxName, Stars, Name, TitleService, 
   BoxInformation, Price, Time, Images, BoxImages, ImageService, BoxButtonMap, ButtonMap } from './styles';

import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';

import StarsIcon from '../../../assets/starts.png';
import EncanadorIcon from '../../../assets/encanador.jpg';

const ViewService = () => {
    const { dataAuth } = useAuth();
    const navigation = useNavigation();

    const [loadingPreview, setLoadingPreview] = useState(false);
    const [loadingPreviewCover, setLoadingPreviewCover] = useState(false);
    const [preview, setPreview] = useState('');
    const [previewCover, setPreviewCover] = useState('');
    const [imageCover, setImageCover] = useState();
    const [imagePhoto, setImagePhoto] = useState();

    const userId = dataAuth.id;

    function handleMaps() {
      navigation.navigate('Maps');
    }

  return (
    <SafeAreaView style={{flex: 1}}> 
    <Container>
      <ScrollView style={{flex: 1}}> 
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
            </BoxPhoto>
            <BoxName>
                <Name>{dataAuth.name}</Name>   
                <Stars source={StarsIcon} />             
            </BoxName>         
        </Box>   
        <TitleService>Serviços de Encanador</TitleService>  
        <BoxInformation>
          <Price>Preço médio: R$ 50,00</Price>
          <Time>Tempo médio: 40min</Time>          
        </BoxInformation>
        <Line />
        <Images>
          <BoxImages>
            <ImageService source={EncanadorIcon}/>   
            <ImageService source={EncanadorIcon}/>  
            <ImageService source={EncanadorIcon}/>   
            <ImageService source={EncanadorIcon}/> 
            <ImageService source={EncanadorIcon}/>                   
          </BoxImages>
        </Images>
        <BoxButtonMap>
          <ButtonMap onPress={handleMaps}>Ver no mapa</ButtonMap>                      
        </BoxButtonMap>        
      </ScrollView>
      </Container>
    </SafeAreaView>
   
  );
}

export default ViewService;