import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
    Container,
    ImageCaption,
    TextTitle,
    BoxTextCaptions,
    TextCaptions,
    ButtonNext,
} from './styles';

import TakeIcon from '../../../assets/take.png';

const DocumentsCaptions = () => {
    const navigation = useNavigation();

    return (
        <Container>
            <ImageCaption source={TakeIcon} />
            <TextTitle>Porquê pedimos sua foto e o seu documento?</TextTitle>
            <BoxTextCaptions>
                <TextCaptions>
                    Lorem Ipsum é simplesmente uma simulação de texto da
                    indústria tipográfica e de impressos, e vem sendo utilizado
                    desde o século XVI, quando um impressor desconhecido pegou
                    uma bandeja de tipos e os embaralhou para fazer um livro de
                    modelos de tipos. Lorem
                </TextCaptions>
            </BoxTextCaptions>
            <ButtonNext
                onPress={() => {
                    {
                        navigation.navigate('TakePhotoDocument');
                    }
                }}
            >
                Concordar
            </ButtonNext>
        </Container>
    );
};

export default DocumentsCaptions;
