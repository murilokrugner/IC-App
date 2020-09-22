import React, {useState, useRef} from 'react';
import {Alert} from 'react-native';
import {Container, BoxInputMask, Icon, ButtonSubmit} from './styles';
import {TextInputMask} from 'react-native-masked-text';
import { Form } from '@unform/mobile';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../services/api';

function WithCpf() {
    const navigation = useNavigation();
    const route = useRoute();

    const formRef = useRef(null);

    const email = route.params.email;

    const [loading, setLoading] = useState(false);
    const [document, setDocument] = useState('');

    async function handleSubmit() {
        try {
            setLoading(true);

            const response = await api.put('/usersDocument', {
                email: email,
                document: document,
            });
        
            setLoading(false);
            navigation.goBack();
            navigation.goBack();
            navigation.goBack();
            Alert.alert('Cadastro realizado com sucesso! Faça login');
        } catch (error) {
            Alert.alert('Não foi possível atualizar o seu cadastro, tente novamente mais tarde');
            setLoading(false);
        }
    }

    return(
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <BoxInputMask>                           
                    <TextInputMask
                        type={'cpf'}
                        value={document}
                        placeholder={'          CPF'}
                        placeholderTextColor={'#666360'}
                        onChangeText={text => {
                            setDocument(text);
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
                        returnKeyType="send" 
                        onSubmitEditing={handleSubmit}
                        />
                        <Icon name={'book'} size={20} color="#666360" />
                    </BoxInputMask> 
                    <ButtonSubmit loading={loading} onPress={() => {formRef.current.submitForm()}}>Salvar</ButtonSubmit>
                </Form>
        </Container>
    )
}

export default WithCpf;