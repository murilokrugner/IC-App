import React, {useState, useEffect} from 'react';
//import { Image } from 'react-native';

import { Container, Box, BoxImageCover, ImageCover, BoxPositionSelectCover, 
    BoxSelectCover, SelectCover, BoxPositionSelectPhoto, BoxSelectPhoto, SelectPhoto, 
        BoxPhoto, ImagePhoto, BoxName, Name, BoxStars, ImageStar, ButtonNext } from './styles';

import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import Crf from '../../../assets/crf.jpg';
import Camera from '../../../assets/camera.png';
import Murilo from '../../../assets/murilo.jpg';
import Stars from '../../../assets/starts.png';

const CompleteRegister = () => {
    const navigation = useNavigation();

    function handleNext() {
        navigation.navigate('AddTypesServices');
    }

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
    }, {});

  return (
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
                <ImagePhoto source={Murilo} />
                <BoxPositionSelectPhoto>
                    <BoxSelectPhoto>
                        <SelectPhoto source={Camera} />
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
  )
}

export default CompleteRegister;