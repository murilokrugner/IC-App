import React, {useState, useEffect, useRef} from 'react';
import { ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';

import { Container, BoxForm, BoxTitleService, TitleService, TextTitle, Line, 
  BoxTextImage, TextImage, BoxAddImage, ContainerImage,
    ButtonAddImage, ImageAdd, BoxImages, 
      ImageService, BoxButtonSave, ButtonSave, BoxPositionDelete,BoxDelete, ImageDelete } from './styles';
import { TextInputMask } from 'react-native-masked-text'
import api from '../../../services/api';

import { Form } from '@unform/mobile';

import Add from '../../../assets/add.png';
import Encanador from '../../../assets/encanador.jpg';
import Remove from '../../../assets/remove.png';

const EditCompleteServices = () => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [inputPrice, setInputPrice] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  useEffect(() => {
    async function load() {
      
      const response = await api.get(`/`);

      setData(response.data);
      setLoading(false);
    }
  }, []);

  async function handleSubmit() {

  }

  return (
      <Container>
        <SafeAreaView>        
            <ScrollView style={{flex: 1, height: '100%'}}>
                <BoxTitleService>
                  <TitleService>Informatíca</TitleService>
                </BoxTitleService>   
                <KeyboardAvoidingView style={{flex : 1, height: '100%'}}>    
                <BoxForm>
                        
                  <Form ref={formRef} onSubmit={handleSubmit}>
                      <TextTitle>Média de preço:</TextTitle>
                      <TextInputMask
                          type={'money'}
                          value={inputPrice}
                          onChangeText={text => {
                              setInputPrice(text);
                          }}
                          options={{
                              precision: 2,
                              separator: '.',
                              delimiter: '.',
                              unit: 'R$',
                              suffixUnit: '',
                          }}
                          style={{
                              backgroundColor: '#FAFBFD',
                              width: 350,
                              borderRadius: 20,
                              padding: 15,
                              fontSize: 18,
                              color: '#000',
                          }}
                          placeholder={'Valor R$'}
                          placeholderTextColor={'#000'}

                          /> 
                        <TextTitle>Média de tempo de serviço:</TextTitle>
                        <TextInputMask
                            type={'datetime'}
                            value={inputTime}
                            onChangeText={text => {
                                setInputTime(text);
                            }}
                            options={{
                              format: 'HH:mm'
                            }}
                            style={{
                                backgroundColor: '#FAFBFD',
                                width: 350,
                                borderRadius: 20,
                                padding: 15,
                                fontSize: 18,
                                color: '#000',
                            }}
                            placeholder={'hh:mm'}
                            placeholderTextColor={'#000'}

                            /> 
                        <TextTitle>Descrição do serviço:</TextTitle> 
                        <TextInputMask
                          type={'custom'}
                          value={inputDescription}
                          onChangeText={text => {
                              setInputDescription(text);
                          }}
                          options={{
                            mask: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                              'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                          }}
                          style={{
                              backgroundColor: '#FAFBFD',
                              width: 350,
                              borderRadius: 20,
                              padding: 15,
                              fontSize: 18,
                              color: '#000',
                              height: 100,              
                          }}
                          placeholder={''}
                          placeholderTextColor={'#000'}                        

                          />                         
                  </Form>  
                  </BoxForm>   
                </KeyboardAvoidingView>
                <Line/>    
                <BoxTextImage>
                  <TextImage>Adicione algumas fotos do serviço</TextImage>
                </BoxTextImage>
                <BoxAddImage>
                  <ButtonAddImage onPress={() => {}}>
                    <ImageAdd source={Add}></ImageAdd>
                  </ButtonAddImage>
                </BoxAddImage>
                <BoxImages>
                  <ContainerImage>
                    <ImageService source={Encanador}></ImageService>
                      <BoxPositionDelete>                  
                        <BoxDelete onPress={() => {}}>
                          <ImageDelete source={Remove}></ImageDelete>
                        </BoxDelete>
                      </BoxPositionDelete>
                  </ContainerImage>
                  <ContainerImage>
                    <ImageService source={Encanador}></ImageService>
                      <BoxPositionDelete>                  
                        <BoxDelete>
                          <ImageDelete source={Remove}></ImageDelete>
                        </BoxDelete>
                      </BoxPositionDelete>
                  </ContainerImage>
                  <ContainerImage>
                    <ImageService source={Encanador}></ImageService>
                      <BoxPositionDelete>                  
                        <BoxDelete>
                          <ImageDelete source={Remove}></ImageDelete>
                        </BoxDelete>
                      </BoxPositionDelete>
                  </ContainerImage>
                  <ContainerImage>
                    <ImageService source={Encanador}></ImageService>
                      <BoxPositionDelete>                  
                        <BoxDelete>
                          <ImageDelete source={Remove}></ImageDelete>
                        </BoxDelete>
                      </BoxPositionDelete>
                  </ContainerImage>
                </BoxImages>    
                <BoxButtonSave>
                   <ButtonSave>Salvar</ButtonSave>
                </BoxButtonSave>                             
            </ScrollView>                   
        </SafeAreaView>
      </Container>
    )
}

export default EditCompleteServices;