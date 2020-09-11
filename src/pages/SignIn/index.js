import React, {useRef, useState} from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {Container, BoxForm, BoxPassword, ClickPassword, CreateAccountButton, CreateAccountButtonText} from './styles';
import { useNavigation } from '@react-navigation/native';
import InputAuth from '../../components/InputAuth';
import ButtonAuth from '../../components/ButtonAuth';

import { Form } from '@unform/mobile';

import Screen from '../../assets/screen.png';

function SignIn() {
    const navigation = useNavigation();
    
    const formRef = useRef(null);
    const passwordRef = useRef();

    const [loading, setLoading] = useState(false);

    async function handleSubmit() {}

    return(
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Container>
                    <Image source={Screen} style={{width: 420, height: 400}}/>
                    <BoxForm>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <InputAuth name="email" icon="mail" placeholder="E-mail" returnKeyType="next" keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => passwordRef.current.focus()}
                            />
                            <InputAuth ref={passwordRef} name="password" icon="lock" placeholder="Senha" 
                                secureTextEntry returnKeyType="send" autoCorrect={false}                            
                                autoCapitalize="none"
                                onSubmitEditing={handleSubmit}    
                            />
                            <ButtonAuth loading={loading}>Entrar</ButtonAuth>
                        </Form>
                    </BoxForm>
                    <BoxPassword>
                        <ClickPassword>Esqueci minha senha</ClickPassword>
                    </BoxPassword>
                    <CreateAccountButton onPress={() => { navigation.navigate('SignUp') }}>
                        <Icon name="log-in" size={20} color="#f08080" />
                        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
                    </CreateAccountButton>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>        
    )
}

export default SignIn;