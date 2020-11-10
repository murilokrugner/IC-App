import React, { useState } from 'react';
import { Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import {
    Container,
    BoxRadioTitle,
    BoxRadio,
    TextRadio,
    TextTitleRadio,
    ButtonNext,
} from './styles';
import { useNavigation } from '@react-navigation/native';

const WhatDocument = () => {
    const navigation = useNavigation();

    const [checkedCnpj, setCheckedCnpj] = useState('');
    const [checkedCpf, setCheckedCpf] = useState('');

    function handleNext() {
        if (checkedCnpj === '' && checkedCpf === '') {
            Alert.alert('Selecione um documento');
            return;
        }

        if (checkedCnpj === 'first') {
            navigation.navigate('WithCnpjAutonomous');
        } else {
            navigation.navigate('WithCpfAutonomous');
        }
    }

    return (
        <Container>
            <BoxRadioTitle>
                <TextTitleRadio>Você possui:</TextTitleRadio>
                <BoxRadio>
                    <TextRadio>CNPJ</TextRadio>
                    <RadioButton
                        value="first"
                        status={
                            checkedCnpj === 'first' ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                            setCheckedCnpj('first'), setCheckedCpf('');
                        }}
                    />
                    <TextRadio>CPF</TextRadio>
                    <RadioButton
                        value="first"
                        status={
                            checkedCpf === 'first' ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                            setCheckedCpf('first'), setCheckedCnpj('');
                        }}
                    />
                </BoxRadio>
            </BoxRadioTitle>
            <ButtonNext onPress={handleNext}>Avançar</ButtonNext>
        </Container>
    );
};

export default WhatDocument;
