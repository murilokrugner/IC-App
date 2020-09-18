import React, {useRef, useState, useEffect} from 'react';
import {KeyboardAvoidingView, ScrollView, Alert} from 'react-native';

import {Container, BoxForm, BoxPassword, ClickPassword} from './styles';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/ButtonAuth';

import api from '../../services/api';

Geocoder.init('AIzaSyBIuZDy_cKsPTBfD2VG5XNV6Ty_SlsNlwk');

function SignUpProvider() {
    const navigation = useNavigation();

    const formRef = useRef(null);
    const nicknameRef = useRef();
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
    const passwordRepeatRef = useRef();

    const [loading, setLoading] = useState(false);

    const [loadingLocation, setLoadingLocation] = useState(true);
    const [coordinates, setCoordinates] = useState({});
    const [location, setLocation] = useState();

    const[name, setName] = useState('');
    const[nickname, setNickName] = useState('');
    const[email, setEmail] = useState('');
    const[phone, setPhone] = useState('');
    const[mobilePhone, setMobilePhone] = useState('');
    const[cnpj, setCnpj] = useState('');
    const[address, setAddress] = useState('');
    const[number, setNumber] = useState('');
    const[bairr, setBairr] = useState('');
    const[point, setPoint] = useState('');
    const[cep, setCep] = useState('');
    const[state, setState] = useState('');
    const[password, setPassword] = useState('');
    const[passwordRepeat, setPasswordRepeat] = useState('');

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

      async function handleSubmit() {
        try {
            setLoading(true);

            if (password !== passwordRepeat) {
                Alert.alert('A senha não coecidem');
                setLoading(false);
                return;
            }

            const response = await api.post('users', {
                name: name,
                nickname: nickname,
                email: email,
                phone: phone,
                mobile_phone: mobilePhone,
                password: password,
                location_x: coordinates.latitude,
                location_y: coordinates.longitude,
                document: cnpj,
                address: address,
                number_address: number,
                neighborhood_address: bairr,
                cep_address: cep,
                state_address: "São Paulo",
                provider: true,
            });        
            
            setLoading(false);
            Alert.alert('Sua conta foi criada com sucesso! Faça login');
            navigation.goBack();
            navigation.goBack();

        } catch (error) {
            setLoading(false);
            Alert.alert('Não foi possível fazer o seu registro, tente novamente mais tarde');
        }
    }

    return(
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <Container>
                    <BoxForm>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <InputAuth name="name" icon="user" placeholder="Razão social" returnKeyType="next"                                 
                                onSubmitEditing={() => nicknameRef.current.focus()}
                                value={name}
                                onChangeText={setName}
                            />
                            <InputAuth ref={nicknameRef} name="nickname" icon="user" placeholder="Nome Fantasia" returnKeyType="next"                                 
                                onSubmitEditing={() => mailRef.current.focus()}
                                value={nickname}
                                onChangeText={setNickName}
                            />
                            <InputAuth ref={mailRef} name="email" icon="mail" placeholder="E-mail" 
                                autoCorrect={false}                            
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"     
                                onSubmitEditing={() => mobilephoneRef.current.focus()}
                                value={email}
                                onChangeText={setEmail}
                            />
                            <InputAuth ref={mobilephoneRef} name="tel-phone" icon="phone" placeholder="Telefone Fixo" returnKeyType="next"                                 
                                onSubmitEditing={() => telphoneRef.current.focus()}
                                value={mobilePhone}
                                onChangeText={setMobilePhone}
                                keyboardType="numeric"
                            />
                            <InputAuth ref={telphoneRef} name="mobile-phone" icon="smartphone" placeholder="Celular" returnKeyType="next"                                 
                                onSubmitEditing={() => documentRef.current.focus()}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="numeric"
                            />
                            <InputAuth ref={documentRef} name="document" icon="edit-2" placeholder="CNPJ" returnKeyType="next"                                 
                                onSubmitEditing={() => addressRef.current.focus()}
                                value={cnpj}
                                onChangeText={setCnpj}
                                keyboardType="numeric"
                            />
                            <InputAuth ref={addressRef } name="address" icon="map-pin" placeholder="Endereço" returnKeyType="next"                                 
                                onSubmitEditing={() => numberRef.current.focus()}
                                value={address}
                                onChangeText={setAddress}
                            />
                            <InputAuth ref={numberRef } name="number" icon="hash" placeholder="Número" returnKeyType="next"                                 
                                onSubmitEditing={() => BairroRef.current.focus()}
                                value={number}
                                onChangeText={setNumber}
                                keyboardType="numeric"
                            />
                            <InputAuth ref={BairroRef } name="bairro" icon="map-pin" placeholder="Bairro" returnKeyType="next"                                 
                                onSubmitEditing={() => pointRef.current.focus()}
                                value={bairr}
                                onChangeText={setBairr}
                            />
                            <InputAuth ref={pointRef} name="point" icon="map-pin" placeholder="Ponto de referencia" returnKeyType="next"                                 
                                onSubmitEditing={() => cepRef.current.focus()}
                                value={point}
                                onChangeText={setPoint}
                            />
                            <InputAuth ref={cepRef} name="cep" icon="map-pin" placeholder="CEP" returnKeyType="next"                                 
                                onSubmitEditing={() => stateRef.current.focus()}
                                value={cep}
                                onChangeText={setCep}
                                keyboardType="numeric"
                            />
                            <InputAuth ref={stateRef } name="state" icon="map" placeholder="Estado" returnKeyType="next"                                 
                                onSubmitEditing={() => passwordRef.current.focus()}
                                value={state}
                                onChangeText={setState}
                            />  
                            <InputAuth ref={passwordRef} name="password" icon="key" placeholder="Senha" 
                                secureTextEntry returnKeyType="send" autoCorrect={false}                            
                                autoCapitalize="none"
                                onSubmitEditing={() => passwordRepeatRef.current.focus()}    
                                value={password}
                                onChangeText={setPassword}
                            />
                            <InputAuth ref={passwordRepeatRef} name="password" icon="lock" placeholder="Confirmar Senha" 
                                secureTextEntry returnKeyType="send" autoCorrect={false}                            
                                autoCapitalize="none"
                                onSubmitEditing={handleSubmit}    
                                value={passwordRepeat}
                                onChangeText={setPasswordRepeat}
                            />
                            <ButtonAuth onPress={() => {formRef.current.submitForm()}} loading={loading}>Criar Conta</ButtonAuth>
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