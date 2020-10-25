import React, {useEffect, useState, useRef} from 'react';
import { ScrollView, ActivityIndicator, BoxForm, BoxPicker } from 'react-native';

import { Container, BoxLoading } from './styles';
import { useAuth } from '../../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Form } from '@unform/mobile';
import Input from '../../../components/Input';
import {Picker} from '@react-native-community/picker';

const ClientData = () => {
    const { DataAuth } = useAuth();
    const navigation = useNavigation();

    const formRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const nameRef = useRef();
    const nicknameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const mobile_phoneRef = useRef();
    const documentRef = useRef();
    const addressRef = useRef();
    const number_addressRef = useRef();
    const point_addressRef = useRef();
    const neighborhood_addressRef = useRef();
    const cep_addressRef = useRef();
    const state_addressRef = useRef();
    const passwordRef = useRef();
    const password_repeatRef = useRef();

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [mobile_phone, setMobilePhone] = useState('');    
    const [document, setDocument] = useState('');
    const [address, setAddress] = useState('');
    const [number_address, setNumberAddress] = useState('');
    const [point_address, setPointAddress] = useState('');
    const [neighborhood_address, setNeighborhoodAddress] = useState('');
    const [cep_address, setCepAddress] = useState('');
    const [state_address, setStateAddress] = useState('');
    const [password, setPassword] = useState('');
    const [password_repeat, setPasswordRepeat] = useState('');

    const [type_document, setTypeDocument] = useState('');

    useEffect(() => {
        async function loadData() {
            const response = await api.get(`/users?id=${dataAuth.id}`);

            setName(response.data.name);
            setNickname(response.data.nickname);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setMobilePhone(response.data.mobile_phone);
            setDocument(response.data.document);
            setAddress(response.data.address);
            setNumberAddress(response.data.number_address);
            setPointAddress(response.data.point_address);
            setNeighborhoodAddress(response.data.neighborhood_address);
            setCepAddress(response.data.cep_address);
            setStateAddress(response.data.state_address);

            setTypeDocument(response.data.type_document);

            setLoading(false);
        }

        //loadData();
    }, []);

    async function handleSave() {

    }
    
  return (
      <ScrollView style={{flex: 1}}>
          <Container>
              {loading ? (
                  <BoxLoading>
                      <ActivityIndicator color="#000" size="small" />
                  </BoxLoading>
              ) : (
                  <BoxForm>
                      <Form ref={formRef} onSubmit={handleSave}>
                          <Input name="name" icon="user" placeholder="Nome" returnKeyType="next" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => nicknameRef.current.focus()}
                                value={name}
                                onChangeText={setName}
                            />
                            <Input name="nickname" icon="user" placeholder="Apelido" returnKeyType="next" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => emailRef.current.focus()}
                                value={nickname}
                                onChangeText={setNickname}
                            />
                            <Input name="email" icon="mail" placeholder="E-mail" returnKeyType="next" 
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => phoneRef.current.focus()}
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Input name="phone" icon="user" placeholder="Telefone" returnKeyType="next" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => mobile_phoneRef.current.focus()}
                                value={phone}
                                onChangeText={setPhone}
                            />
                            <Input name="mobile_phone" icon="user" placeholder="Celular/Whatsapp" returnKeyType="next" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => addressRef.current.focus()}
                                value={mobile_phone}
                                onChangeText={setMobilePhone}
                            />
                            <Input name="document" icon="user" placeholder="Documento" returnKeyType="next" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => addressRef.current.focus()}
                                value={document}
                                onChangeText={setDocument}
                            />
                            <Input name="address" icon="user" placeholder="Endereço" returnKeyType="next" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => number_addressRef.current.focus()}
                                value={address}
                                onChangeText={setAddress}
                            />
                            <Input name="number_address" icon="user" placeholder="Número" returnKeyType="next" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => point_addressRef.current.focus()}
                                value={number_address}
                                onChangeText={setNumberAddress}
                            />
                            <Input name="point_address" icon="user" placeholder="Ponto de referência" returnKeyType="next" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => neighborhood_addressRef.current.focus()}
                                value={point_address}
                                onChangeText={setPointAddress}
                            />
                            <Input name="cep_address" icon="user" placeholder="Cep" returnKeyType="next" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => cep_addressRef.current.focus()}
                                value={cep_address}
                                onChangeText={setCepAddress}
                            />
                             <BoxPicker>
                                    <Picker
                                        selectedValue={state}
                                        style={{height: 20, width: 300, color: '#666360'}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setState(itemValue)
                                        }>
                                        <Picker.Item key={"Estado"} label={"        Selecione um Estado"} value={"Estado"}/>                                 
                                    </Picker>
                                </BoxPicker>
                      </Form>
                  </BoxForm>
              )}
          </Container>
      </ScrollView>
  );
}

export default ClientData;