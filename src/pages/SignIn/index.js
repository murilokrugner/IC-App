import React, {useRef, useState} from 'react';
import {Image, Alert, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {Container, TitleBox, BoxForm, BoxPassword, ClickPassword, CreateAccountButton, CreateAccountButtonText} from './styles';
import { useNavigation } from '@react-navigation/native';

import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/ButtonAuth';
import { useAuth } from '../../hooks/auth';

import { Form } from '@unform/mobile';

import Screen from '../../assets/avatar_sem_fundo.png';

import api from '../../services/api';


function SignIn() {
    const navigation = useNavigation();
    const { signIn, loadingLogin } = useAuth();

    const formRef = useRef(null);
    const passwordRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        signIn(email, password);
    }

    return(
        <KeyboardAvoidingView style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled>
            <ScrollView  showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"

            >
                <Container>
                    <Image source={Screen} style={{width: 139, height: 219}}/>
                    <TitleBox>Procure Serviço</TitleBox>
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
                    <BoxPassword onPress={() => {navigation.navigate('ForgotPassword')}}>
                        <ClickPassword>Esqueci minha senha</ClickPassword>
                    </BoxPassword>
                    <CreateAccountButton onPress={() => { navigation.navigate('WhatUser') }}>
                        <Icon name="log-in" size={20} color="#235A5C" />
                        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
                    </CreateAccountButton>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignIn;
