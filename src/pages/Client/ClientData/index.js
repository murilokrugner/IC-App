import React, {useEffect, useState, useRef} from 'react';
import { SafeAreaView, ScrollView, ActivityIndicator, Alert} from 'react-native';

import { Container, BoxLoading, BoxForm, TitleInput, BoxPicker, ButtonSave, Line} from './styles';
import { useAuth } from '../../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Form } from '@unform/mobile';
import Input from '../../../components/Input';
import {Picker} from '@react-native-community/picker';

const ClientData = () => {
    const { dataAuth } = useAuth();
    const navigation = useNavigation();

    const formRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);

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
    const [oldPassword, SetOldPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');

    const [type_document, setTypeDocument] = useState('');

    const [stateItens, setStateItens] = useState([
        {item: "Acre (AC)"},
        {item: "Alagoas (AL)"},
        {item: "Amapá (AP)"},
        {item: "Amazonas (AM)"},
        {item: "Bahia (BA)"},
        {item: "Ceará (CE)"},
        {item: "Distrito Federal (DF)"},
        {item: "Espírito Santo (ES)"},
        {item: "Goiás (GO)"},
        {item: "Maranhão (MA)"},
        {item: "Mato Grosso (MT)"},
        {item: "Mato Grosso do Sul (MS)"},
        {item: "Minas Gerais (MG)"},
        {item: "Pará (PA)"},
        {item: "Paraíba (PB)"},
        {item: "Paraná (PR)"},
        {item: "Pernambuco (PE)"},
        {item: "Piauí (PI)"},
        {item: "Rio de Janeiro (RJ)"},
        {item: "Rio Grande do Norte (RN)"},
        {item: "Rio Grande do Sul (RS)"},
        {item: "Rondônia (RO)"},
        {item: "Roraima (RR)"},
        {item: "Santa Catarina (SC)"},
        {item: "São Paulo (SP)"},
        {item: "Sergipe (SE)"},
        {item: "Tocantins (TO)"},
     ]);

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

        loadData();
    }, []);

    async function handleSave() {
        setLoadingSave(true);

        if (oldPassword !== '') {
            if (password !== confirmPassword) {
                Alert.alert('As senhas não coincidem');
                setLoadingSave(false);
                return
            }

            try {
                const response = await api.put('users', {
                    id: dataAuth.id,
                    name: name,
                    nickname: nickname,
                    email: email,
                    phone: phone,
                    mobile_phone: mobile_phone,
                    document: document,
                    address: address,
                    number_address: number_address,
                    point_address: point_address,
                    neighborhood_address: neighborhood_address,
                    cep_address: cep_address,
                    state_address: state_address,
                    oldPassword: oldPassword,
                    password: password,
                    confirmPassword: confirmPassword,
                });

                if (response.data.error === 'Password does not match') {
                    Alert.alert('Senha antiga é inválida');
                    setLoadingSave(false);
                    return;
                }

                setLoadingSave(false);
                Alert.alert('Dados atualizados');
                navigation.goBack();
            } catch (error) {
                setLoadingSave(false);
                Alert.alert('Não foi possível atualizar os dados, tente novamente mais tarde');
            }
        } else {
            try {
                const response = await api.put('users', {
                    id: dataAuth.id,
                    name: name,
                    nickname: nickname,
                    email: email,
                    phone: phone,
                    mobile_phone: mobile_phone,
                    document: document,
                    address: address,
                    number_address: number_address,
                    point_address: point_address,
                    neighborhood_address: neighborhood_address,
                    cep_address: cep_address,
                    state_address: state_address,
                });

                if (response.error === 'Password does not match') {
                    Alert.alert('Senha antiga é inválida');
                    setLoadingSave(false);
                    return;
                }

                setLoadingSave(false);
                Alert.alert('Dados atualizados');
                navigation.goBack();
            } catch (error) {
                setLoadingSave(false);
                Alert.alert('Não foi possível atualizar os dados, tente novamente mais tarde');
            }
        }
    }

  return (
      <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
          <Container>
              {loading ? (
                  <BoxLoading>
                      <ActivityIndicator color="#000" size="small" />
                  </BoxLoading>
              ) : (
                <BoxForm>
                <Form ref={formRef} onSubmit={handleSave}>
                    <TitleInput>Nome</TitleInput>
                    <Input name="name" icon="user" placeholder="Nome" returnKeyType="next"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => nicknameRef.current.focus()}
                          value={name}
                          onChangeText={setName}
                          ref={nameRef}
                      />
                      <TitleInput>Apelido</TitleInput>
                      <Input name="nickname" icon="user" placeholder="Apelido" returnKeyType="next"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => emailRef.current.focus()}
                          value={nickname}
                          onChangeText={setNickname}
                          ref={nicknameRef}
                      />
                      <TitleInput>E-mail</TitleInput>
                      <Input name="email" icon="mail" placeholder="E-mail" returnKeyType="next"
                          keyboardType="email-address"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => phoneRef.current.focus()}
                          value={email}
                          onChangeText={setEmail}
                      />
                      <TitleInput>Telefone</TitleInput>
                      <Input name="phone" icon="user" placeholder="Telefone" returnKeyType="next"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => mobile_phoneRef.current.focus()}
                          value={phone}
                          onChangeText={setPhone}
                          ref={phoneRef}
                      />
                      <TitleInput>Celular/Whatsapp</TitleInput>
                      <Input name="mobile_phone" icon="user" placeholder="Celular/Whatsapp" returnKeyType="next"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => addressRef.current.focus()}
                          value={mobile_phone}
                          onChangeText={setMobilePhone}
                          ref={mobile_phoneRef}
                      />
                      <TitleInput>Documento CPF/CNPJ</TitleInput>
                      <Input name="document" icon="user" placeholder="Documento CPF/CNPJ" returnKeyType="next"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => addressRef.current.focus()}
                          value={document}
                          onChangeText={setDocument}
                          ref={documentRef}
                      />
                      <TitleInput>Endereço</TitleInput>
                      <Input name="address" icon="user" placeholder="Endereço" returnKeyType="next"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => number_addressRef.current.focus()}
                          value={address}
                          onChangeText={setAddress}
                          ref={addressRef}
                      />
                      <TitleInput>Número</TitleInput>
                      <Input name="number_address" icon="user" placeholder="Número" returnKeyType="next"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => point_addressRef.current.focus()}
                          value={number_address}
                          onChangeText={setNumberAddress}
                          ref={number_addressRef}
                      />
                      <TitleInput>Ponto de referência</TitleInput>
                      <Input name="point_address" icon="user" placeholder="Ponto de referência" returnKeyType="next"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => neighborhood_addressRef.current.focus()}
                          value={point_address}
                          onChangeText={setPointAddress}
                          ref={point_addressRef}
                      />
                      <TitleInput>Cep</TitleInput>
                      <Input name="cep_address" icon="user" placeholder="Cep" returnKeyType="next"
                          autoCorrect={false}
                          autoCapitalize="none"
                          onSubmitEditing={() => cep_addressRef.current.focus()}
                          value={cep_address}
                          onChangeText={setCepAddress}
                          ref={cep_addressRef}
                      />
                      <TitleInput>Estado</TitleInput>
                       <BoxPicker>
                          <Picker
                              selectedValue={state_address}
                              style={{height: 20, width: 300, color: '#666360'}}
                              onValueChange={(itemValue, itemIndex) =>
                                  setStateAddress(itemValue)
                              }>
                              <Picker.Item key={state_address} label={"Estado selecionado: " + state_address} value={state_address}/>
                              {stateItens.map(item => (
                                <Picker.Item key={item.item} label={item.item} value={item.item}/>
                              ))}
                          </Picker>
                      </BoxPicker>
                      <TitleInput>Senha antiga</TitleInput>
                      <Input name="oldPassword" icon="lock" placeholder="Senha antiga" returnKeyType="next"
                          autoCorrect={false}
                          secureTextEntry
                          autoCapitalize="none"
                          onSubmitEditing={() => password.current.focus()}
                          value={oldPassword}
                          onChangeText={SetOldPassword}
                      />
                      <TitleInput>Nova senha</TitleInput>
                      <Input name="password" icon="lock" placeholder="Nova senha" returnKeyType="next"
                          autoCorrect={false}
                          secureTextEntry
                          autoCapitalize="none"
                          onSubmitEditing={() => password_repeatRef.current.focus()}
                          value={password}
                          onChangeText={setPassword}
                          ref={passwordRef}
                      />
                      <TitleInput>Confirmar senha</TitleInput>
                      <Input name="confirmPassword" icon="lock" placeholder="Confirmar senha" returnKeyType="send"
                          autoCorrect={false}
                          secureTextEntry
                          autoCapitalize="none"
                          onSubmitEditing={() => formRef.current.submitForm()}
                          value={confirmPassword}
                          onChangeText={SetConfirmPassword}
                          ref={password_repeatRef}
                      />
                </Form>
            </BoxForm>
              )}
              <Line />
              {loading === false && (
                  <ButtonSave loading={loadingSave} onPress={() => {formRef.current.submitForm()}}>Salvar</ButtonSave>
              )}
          </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ClientData;
