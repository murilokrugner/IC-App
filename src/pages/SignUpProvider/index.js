import React, {useRef, useState, useEffect} from 'react';
import {KeyboardAvoidingView, ScrollView, Alert} from 'react-native';

import {Container, BoxForm, BoxPassword, ClickPassword, BoxInputMask, 
    Icon, BoxPicker, TextRadio, TextTitleRadio, BoxRadioTitle, BoxRadio} from './styles';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/ButtonAuth';
import {TextInputMask} from 'react-native-masked-text';
import {Picker} from '@react-native-community/picker';
import { RadioButton } from 'react-native-paper';
import api from '../../services/api';
import apiServices from '../../services/api-services';

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
    const[state, setState] = useState('        Selecione um Estado');
    const[password, setPassword] = useState('');
    const[passwordRepeat, setPasswordRepeat] = useState('');
    const[checkedCnpj, setCheckedCnpj] = useState('');
    const[checkedCpf, setCheckedCpf] = useState('');

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

            if (checkedCnpj === '' && checkedCpf === '') {
                Alert.alert('Selecione o tipo da empresa');
                setLoading(false);
                return;
            }

            const searchAddress = await apiServices.get(`${cep}/json/`);

            if (searchAddress.data.status === 400) {
                Alert.alert('Cep inválido');
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
                address: address,
                number_address: number,
                point_address: point,
                neighborhood_address: bairr,
                cep_address: cep,
                state_address: searchAddress.data.uf,
                city: searchAddress.data.localidade,
                provider: true,
                type_document: "0",
                first_access: "0",
            });    
                                        
            setLoading(false);
            Alert.alert('Sua conta foi criada com sucesso!');

            if (checkedCnpj === 'first') {
                navigation.navigate('WithCnpj', {email});
            } else {
                navigation.navigate('WithCpf', {email});
            }
           
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
                                onSubmitEditing={() => telphoneRef.current.focus()}
                                value={email}
                                onChangeText={setEmail}
                            />       
                            <BoxInputMask>
                            <TextInputMask
                                type={'cel-phone'}
                                value={phone}
                                onChangeText={text => {
                                    setPhone(text);
                                }}
                                withDDD={true}
                                maskType={'BRL'}
                                dddMask={'(99)'}
                                style={{
                                    backgroundColor: '#ECF6FF',
                                    width: 330,
                                    height: 58,
                                    borderRadius: 10,
                                    padding: 15,
                                    fontSize: 16,
                                    color: '#000',   
                                    marginTop: 5,
                                    marginBottom: 16                                 
                                }}                                
                                placeholder={'          Telefone Fixo'}
                                placeholderTextColor={'#666360'}
                                ref={telphoneRef}
                                name="phone" 
                                actions={{
                                    title: 'Icone',
                                    showWithText: true,
                                    show: "always",
                                    icon: require('../../assets/smartphone.png'),
                                }}
                                                             
                                returnKeyType="next" 
                                onSubmitEditing={() => mobilephoneRef.current.focus()}
                                />
                                <Icon name={'smartphone'} size={20} color="#666360" />
                            </BoxInputMask>  

                            <BoxInputMask>                                           
                                <TextInputMask
                                    type={'cel-phone'}
                                    value={mobilePhone}
                                    onChangeText={text => {
                                        setMobilePhone(text);
                                    }}
                                    withDDD={true}
                                    maskType={'BRL'}
                                    dddMask={'(99)'}
                                    style={{
                                        backgroundColor: '#ECF6FF',
                                        width: 330,
                                        height: 58,
                                        borderRadius: 10,
                                        padding: 15,
                                        fontSize: 16,
                                        color: '#000',   
                                        marginTop: 5,
                                        marginBottom: 16                                 
                                    }}                                
                                    placeholder={'          Celular'}
                                    placeholderTextColor={'#666360'}
                                    ref={mobilephoneRef}
                                    name="mobile-phone" 
                                    actions={{
                                        title: 'Icone',
                                        showWithText: true,
                                        show: "always",
                                        icon: require('../../assets/smartphone.png'),
                                    }}
                                                                
                                    returnKeyType="next" 
                                    onSubmitEditing={() => documentRef.current.focus()}
                                    />                               
                                <Icon name={'phone'} size={20} color="#666360" />
                            </BoxInputMask>   
                            <BoxInputMask>
                            <TextInputMask
                            type={'zip-code'}
                            name="cep"
                            value={cep}
                            ref={cepRef}
                            onChangeText={text => {
                                setCep(text);
                            }}
                            style={{
                                backgroundColor: '#ECF6FF',
                                width: 330,
                                height: 58,
                                borderRadius: 10,
                                padding: 15,
                                fontSize: 16,
                                color: '#000',   
                                marginTop: 5,
                                marginBottom: 16                                 
                            }}
                            placeholder={'          CEP'}
                            placeholderTextColor={'#666360'}
                            returnKeyType="next" 
                            onSubmitEditing={() => stateRef.current.focus()}
                            />
                            <Icon name={'minus-square'} size={20} color="#666360" />
                            </BoxInputMask>                          
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
                            <BoxRadioTitle>                           
                                <TextTitleRadio>Você possui:</TextTitleRadio>
                                <BoxRadio>                            
                                    <TextRadio>CNPJ</TextRadio>
                                    <RadioButton
                                        value="first"
                                        status={checkedCnpj === 'first' ? 'checked' : 'unchecked' }
                                        onPress={() => {setCheckedCnpj('first'), setCheckedCpf('')}}

                                    />
                                    <TextRadio>CPF</TextRadio>
                                    <RadioButton
                                        value="first"
                                        status={checkedCpf === 'first' ? 'checked' : 'unchecked' }
                                        onPress={() => {setCheckedCpf('first'), setCheckedCnpj('')}}

                                    />
                                </BoxRadio>
                            </BoxRadioTitle>
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