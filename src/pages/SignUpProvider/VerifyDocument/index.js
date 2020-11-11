import React from 'react';
import { View } from 'react-native';

import {
    Container,
    Photo,
    TextTitle,
    ButtonCancel,
    ButtonNext,
} from './styles';

import PhotoIcon from '../../../assets/fotodocumento.jpg';

const VerifyDocument = () => {
    return (
        <Container>
            <Photo source={PhotoIcon} />
            <TextTitle>Sua foto ficou boa?</TextTitle>
            <ButtonNext>Sim</ButtonNext>
            <ButtonCancel>Tirar novamente</ButtonCancel>
        </Container>
    );
};

export default VerifyDocument;
