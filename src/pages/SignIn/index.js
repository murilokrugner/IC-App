import React, {useRef, useState} from 'react';
import {Image, Alert, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {Container, BoxForm, BoxPassword, ClickPassword, CreateAccountButton, CreateAccountButtonText} from './styles';
import { useNavigation } from '@react-navigation/native';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/ButtonAuth';
import AsyncStorage from '@react-native-community/async-storage';
import { useAuth } from '../../hooks/auth';

import { Form } from '@unform/mobile';

import Screen from '../../assets/screen.png';

import api from '../../services/api';

function SignIn() {
    const navigation = useNavigation();
    const { signIn, loadingLogin } = useAuth();
    
    const formRef = useRef(null);
    const passwordRef = useRef();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {     
        setLoading(true);

        const response = await api.post('session', {
            email: email,
            password: password,
        })

        if (!response.data) {
            Alert.alert('Dados inválidos');
            setLoading(false);
            return;
        }

        console.log(response.data.user);

        const {token} = response.data;

        await AsyncStorage.multiSet([
            ['@App:token', token],            
            ['@App:name', response.data.user.name],
            ['@App:email', response.data.user.email],
        ]);

        setLoading(false);                
    }

    return(
        <KeyboardAvoidingView style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled>
            <ScrollView  showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                
            >
                <Container>
                    <Image source={Screen} style={{width: 420, height: 400}}/>
                    <BoxForm>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <InputAuth name="email" icon="mail" placeholder="E-mail" returnKeyType="next" keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => passwordRef.current.focus()}
                                value={email}
                                onChangeText={setEmail}
                            />
                            <InputAuth ref={passwordRef} name="password" icon="lock" placeholder="Senha" 
                                secureTextEntry returnKeyType="send" autoCorrect={false}                            
                                autoCapitalize="none"
                                onSubmitEditing={handleSubmit}    
                                value={password}
                                onChangeText={setPassword}
                            />
                            <ButtonAuth loading={loadingLogin} onPress={() => {formRef.current.submitForm()}}>Entrar</ButtonAuth>
                        </Form>
                    </BoxForm>
                    <BoxPassword>
                        <ClickPassword>Esqueci minha senha</ClickPassword>
                    </BoxPassword>
                    <CreateAccountButton onPress={() => { navigation.navigate('WhatUser') }}>
                        <Icon name="log-in" size={20} color="#f08080" />
                        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
                    </CreateAccountButton>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>        
    )
}

export default SignIn;