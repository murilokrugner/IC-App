import React, {useRef, useState, useEffect} from 'react';
import {KeyboardAvoidingView, ScrollView, Alert} from 'react-native';
import {Container, BoxForm, BoxPassword, ClickPassword, BoxInputMask, Icon} from './styles';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/ButtonAuth';
import {TextInputMask} from 'react-native-masked-text';
import api from '../../services/api';

Geocoder.init('AIzaSyBIuZDy_cKsPTBfD2VG5XNV6Ty_SlsNlwk');

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
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [location, setLocation] = useState();

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    useEffect(() => {
        Geolocation.getCurrentPosition(
          async ({coords}) => {
            setCoordinates(coords);
            setLatitude(coords.latitude);
            setLongitude(coords.longitude);
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
            //const location = address.substring(0, address.indexOf(','));
    
            setLocation(address);            
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
                phone: 0,
                mobile_phone: mobilePhone,
                password: password,
                location_x: latitude,
                location_y: longitude,
                //document: 0,
                address:"",
                number_address:0,
                neighborhood_address:"",
                cep_address: 0,
                state_address: "São Paulo",
                provider: false,
                type_document: "0",
                first_access: "0",
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

    function handleCancel() {
        navigation.goBack();
    }

    return(
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <Container>
                    <BoxForm>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <InputAuth name="name" icon="user" placeholder="Nome completo" returnKeyType="next"                                 
                                onSubmitEditing={() => apelidoRef.current.focus()}
                                value={name}
                                onChangeText={setName}
                            />
                            <InputAuth ref={apelidoRef} name="apelido" icon="user-plus" placeholder="Apelido" returnKeyType="next"                                 
                                onSubmitEditing={() => mailRef.current.focus()}
                                value={nickname}
                                onChangeText={setNickname}
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
                            <BoxInputMask>                                
                                <TextInputMask
                                    type={'cel-phone'}
                                    ref={mobilephoneRef}
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
                                        padding: 16,
                                        fontSize: 16,
                                        color: '#000',   
                                        marginTop: 5,                                        
                                        marginBottom: 16,                          
                                    }}                                
                                    placeholder={'          Celular'}
                                    placeholderTextColor={'#666360'}
                                    name="mobile-phone"                                                                 
                                    returnKeyType="next" 
                                    onSubmitEditing={() => passwordRef.current.focus()}
                                    />
                                    <Icon name={'smartphone'} size={20} color="#666360" />
                                </BoxInputMask>
                                <InputAuth ref={passwordRef} name="password" icon="key" placeholder="Senha" 
                                    secureTextEntry returnKeyType="next" autoCorrect={false}                            
                                    autoCapitalize="none"
                                    onSubmitEditing={() => passwordRepeatRed.current.focus()}    
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            <InputAuth ref={passwordRepeatRed} name="password" icon="lock" placeholder="Confirmar Senha" 
                                secureTextEntry returnKeyType="send" autoCorrect={false}                            
                                autoCapitalize="none"
                                onSubmitEditing={handleSubmit}  
                                value={passwordRepeat}
                                onChangeText={setPasswordRepeat}  
                            />                                                        
                            <ButtonAuth onPress={() => {formRef.current.submitForm()}} loading={loading}>Criar Conta</ButtonAuth>
                        </Form>                        
                        <BoxPassword onPres={handleCancel}>
                            <ClickPassword>Cancelar</ClickPassword>
                        </BoxPassword>                                                
                    </BoxForm>                    
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>        
    )
}

export default SignUp;