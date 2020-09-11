import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';

import {Container, BoxForm, BoxPassword, ClickPassword} from './styles';

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

    const [loading, setLoading] = useState(false);

    async function handleSubmit() {}

    return(
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Container>
                    <BoxForm>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <InputAuth name="name" icon="user" placeholder="Nome completo" returnKeyType="next"                                 
                                onSubmitEditing={() => apelidoRef.current.focus()}
                            />
                            <InputAuth ref={apelidoRef} name="apelido" icon="user" placeholder="Apelido" returnKeyType="next"                                 
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
                            <InputAuth ref={passwordRef} name="password" icon="lock" placeholder="Senha" 
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