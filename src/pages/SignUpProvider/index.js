import React, {useRef, useState, useEffect} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';

import {Container, BoxForm, BoxPassword, ClickPassword} from './styles';
import Geolocation from '@react-native-community/geolocation';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/ButtonAuth';

function SignUpProvider() {
    const navigation = useNavigation();

    const formRef = useRef(null);
    const mailRef = useRef();
    const telphoneRef = useRef();
    const mobilephoneRef = useRef();    
    const documentRef = useRef();
    const addressRef = useRef();
    const numberRef = useRef();
    const BairroRef = useRef();
    const pointRef = useRef();
    const cepRef = useRef();
    const stateRef = useRef();
    const passwordRef = useRef();
    const passwordRepeatRed = useRef();

    const [loading, setLoading] = useState(false);

    const [loadingLocation, setLoadingLocation] = useState(true);
    const [coordinates, setCoordinates] = useState({});
    const [location, setLocation] = useState();

   /* useEffect(() => {
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
      }, []);*/

    async function handleSubmit() {}

    return(
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <Container>
                    <BoxForm>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <InputAuth name="name" icon="user" placeholder="Razão social" returnKeyType="next"                                 
                                onSubmitEditing={() => mailRef.current.focus()}
                            />
                            <InputAuth ref={mailRef} name="email" icon="mail" placeholder="E-mail" 
                                autoCorrect={false}                            
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"     
                                onSubmitEditing={() => mobilephoneRef.current.focus()}
                            />
                            <InputAuth ref={mobilephoneRef} name="tel-phone" icon="phone" placeholder="Telefone Fixo" returnKeyType="next"                                 
                                onSubmitEditing={() => telphoneRef.current.focus()}
                            />
                            <InputAuth ref={telphoneRef} name="mobile-phone" icon="smartphone" placeholder="Celular" returnKeyType="next"                                 
                                onSubmitEditing={() => documentRef.current.focus()}
                            />
                            <InputAuth ref={documentRef} name="document" icon="edit-2" placeholder="CNPJ" returnKeyType="next"                                 
                                onSubmitEditing={() => addressRef.current.focus()}
                            />
                            <InputAuth ref={addressRef } name="address" icon="map-pin" placeholder="Endereço" returnKeyType="next"                                 
                                onSubmitEditing={() => numberRef.current.focus()}
                            />
                            <InputAuth ref={numberRef } name="number" icon="hash" placeholder="Número" returnKeyType="next"                                 
                                onSubmitEditing={() => BairroRef.current.focus()}
                            />
                            <InputAuth ref={BairroRef } name="bairro" icon="map-pin" placeholder="Bairro" returnKeyType="next"                                 
                                onSubmitEditing={() => pointRef.current.focus()}
                            />
                            <InputAuth ref={pointRef } name="point" icon="map-pin" placeholder="Ponto de referencia" returnKeyType="next"                                 
                                onSubmitEditing={() => cepRef.current.focus()}
                            />
                            <InputAuth ref={cepRef } name="cep" icon="map-pin" placeholder="CEP" returnKeyType="next"                                 
                                onSubmitEditing={() => stateRef.current.focus()}
                            />
                            <InputAuth ref={stateRef } name="state" icon="map" placeholder="Estado" returnKeyType="next"                                 
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

export default SignUpProvider;