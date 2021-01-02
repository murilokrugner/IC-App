import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { Container, BoxInputMask, Icon, ButtonSubmit } from './styles';
import { TextInputMask } from 'react-native-masked-text';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import api from '../../../../../services/api';
import { cpf as validateCpf } from 'cpf-cnpj-validator';

function WithCpfAutonomous() {
    const navigation = useNavigation();

    const formRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [document, setDocument] = useState('');

    async function handleSubmit() {
        try {
            setLoading(true);

            if (document === '') {
                Alert.alert('Por favor, informe seu documento');
                setLoading(false);
                return;
            }

            if (validateCpf.isValid(document) === false) {
                Alert.alert('Erro', ' Cpf inexistente');
                setLoading(false);
                return false;
              }

            navigation.navigate('SignUpProviderAutonomous', { document });
            setLoading(false);
        } catch (error) {
            Alert.alert(
                'Não foi possível atualizar o seu cadastro, tente novamente mais tarde'
            );
            setLoading(false);
        }
    }

    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <BoxInputMask>
                    <TextInputMask
                        type={'cpf'}
                        value={document}
                        placeholder={'CPF'}
                        placeholderTextColor={'#666360'}
                        onChangeText={(text) => {
                            setDocument(text);
                        }}
                        style={{
                            backgroundColor: '#ECF6FF',
                            width: 330,
                            height: 58,
                            borderRadius: 10,
                            paddingLeft: 45,
                            fontSize: 16,
                            color: '#000',
                            marginTop: 5,
                            marginBottom: 16,
                        }}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />
                    <Icon name={'book'} size={20} color="#666360" />
                </BoxInputMask>
                <ButtonSubmit
                    loading={loading}
                    onPress={() => {
                        formRef.current.submitForm();
                    }}
                >
                    Salvar
                </ButtonSubmit>
            </Form>
        </Container>
    );
}

export default WithCpfAutonomous;
