import React, {useRef} from 'react';
import {Image} from 'react-native';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {Container} from './styles';

import InputAuth from '../../components/InputAuth';

import { Form } from '@unform/mobile';

import Women from '../../assets/women.jpg';

function SignIn() {
    const formRef = useRef(null);
    const passwordRef = useRef();

    async function handleSubmit() {

    }

    return(
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Container>
                    <Image source={Women} style={{width: 400, height: 500}}/>
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
                    </Form>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>        
    )
}

export default SignIn;