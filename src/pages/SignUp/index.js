import React, {useRef, useState, useEffect} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';

import {Container, BoxForm, BoxPassword, ClickPassword} from './styles';
import Geolocation from '@react-native-community/geolocation';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/ButtonAuth';

function SignUp() {
    const navigation = useNavigation();

    const formRef = useRef(null);
    const apelidoRef = useRef();
    const mailRef = useRef();
    const mobilephoneRef = useRef();    
    const passwordRef = useRef();
    const passwordRepeatRed = useRef();

    const [loading, setLoading] = useState(false);

    const [loadingLocation, setLoadingLocation] = useState(true);
    const [coordinates, setCoordinates] = useState({});
    const [location, setLocation] = useState();

    useEffect(() => {
        Geolocation.getCurrentPosition(
          async ({coords}) => {
            setCoordinates(coords);
          },
          (error) => {
            console.log(error);
          },
          {enableHighAccuracy: true, maximumAge: 10000, timeout: 10000},
        );
        Geolocation.getCurrentPosition(
          async ({coords: {latitude, longitude}}) => {
            const response = await Geocoder.from({latitude, longitude});
            const address = response.results[0].formatted_address;
            const location = address.substring(0, address.indexOf(','));
    
            setLocation(location);
            setLoadingLocation(false);
          },
          (error) => {
            console.log(error);
          },
          {enableHighAccuracy: true, maximumAge: 10000, timeout: 10000},
        );
      }, []);

    async function handleSubmit() {}

    return(
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <Container>
                    <BoxForm>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <InputAuth name="name" icon="user" placeholder="Nome completo" returnKeyType="next"                                 
                                onSubmitEditing={() => apelidoRef.current.focus()}
                            />
                            <InputAuth ref={apelidoRef} name="apelido" icon="user-plus" placeholder="Apelido" returnKeyType="next"                                 
                                onSubmitEditing={() => mailRef.current.focus()}
                            />
                            <InputAuth ref={mailRef} name="email" icon="mail" placeholder="E-mail" 
                                autoCorrect={false}                            
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"     
                                onSubmitEditing={() => mobilephoneRef.current.focus()}
                            />
                            <InputAuth ref={mobilephoneRef} name="mobile-phone" icon="phone" placeholder="Celular" returnKeyType="next"                                 
                                onSubmitEditing={() => passwordRef.current.focus()}
                            />
                            <InputAuth ref={passwordRef} name="password" icon="key" placeholder="Senha" 
                                secureTextEntry returnKeyType="send" autoCorrect={false}                            
                                autoCapitalize="none"
                                onSubmitEditing={() => passwordRepeatRed.current.focus()}    
                            />
                            <InputAuth ref={passwordRepeatRed} name="password" icon="lock" placeholder="Confirmar Senha" 
                                secureTextEntry returnKeyType="send" autoCorrect={false}                            
                                autoCapitalize="none"
                                onSubmitEditing={handleSubmit}    
                            />
                            <ButtonAuth loading={loading}>Criar Conta</ButtonAuth>
                        </Form>

                        <BoxPassword onPres={() => {navigation.goBack()}}>
                            <ClickPassword>Cancelar</ClickPassword>
                        </BoxPassword>                                                
                    </BoxForm>                    
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>        
    )
}

export default SignUp;