import React, {useState, useEffect, useRef} from 'react';
import { ScrollView, KeyboardAvoidingView, SafeAreaView, ActivityIndicator } from 'react-native';

import { Container, BoxLoading, BoxForm, BoxTitleService, TitleService, TextTitle, Line, 
  BoxTextImage, TextImage, BoxAddImage, ContainerImage,
    ButtonAddImage, ImageAdd, BoxImages, 
      ImageService, BoxButtonSave, ButtonSave, BoxPositionDelete,BoxDelete, ImageDelete } from './styles';
import { TextInputMask } from 'react-native-masked-text'
import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import ImagePicker from 'react-native-image-picker';
import Add from '../../../assets/add.png';
import Encanador from '../../../assets/encanador.jpg';
import Remove from '../../../assets/remove.png';

const EditCompleteServices = () => {
  const formRef = useRef(null);

  const navigation = useNavigation();

  const { dataAuth } = useAuth();

  const idUser = dataAuth.id;

  const route = useRoute();
  
  const idService = route.params.id;

  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingImageDb, setLoadingImageDb] = useState(true); 
  const [data, setData] = useState({});
  const [images, setImages] = useState();
  const [inputPrice, setInputPrice] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  useEffect(() => {
    async function load() {
      
      const response = await api.get(`serviceslist?provider=${idUser}&service=${idService}`);

      setData(response.data);
      setLoading(false);
    }

    async function loadImages() {
      const response = await api.get(`files_services?id=${idUser}`);

      if (response.error) {
        setImages();
        setLoadingImageDb(false);
      } else {
        setImages(response.data);
        setLoadingImageDb(false);
      }
    }

    load();
    loadImages();
  }, []);

  function handleUpImage() {
    setLoadingImage(true);
      ImagePicker.showImagePicker(
        {
          title: 'Selecionar imagem',
          cancelButtonTitle: 'cancelar',
          mediaType: 'photo',
          takePhotoButtonTitle: 'Tirar uma foto',
          chooseWhichLibraryTitle: 'Selecionar imagem',
          chooseFromLibraryButtonTitle: 'Selecionar',
          maxWidth: 220,
          maxHeight: 220,
          storageOptions: {
          skipBackup: true,
          path: 'images',
          },
        },
        upload => {
          if (upload.didCancel) {
            setLoadingImage(false);
          }

          if (upload.uri) {
            const previewData = {
              uri: `data:image/jpeg;base64,${upload.data}`,
            };
  
            let prefix;
            let ext;
  
            if (upload.fileName) {
              [prefix, ext] = upload.fileName.split('.');
              ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
            } else {
              prefix = new Date().getTime();
              ext = 'jpg';
            }
  
            const imageData = {
              uri: upload.uri,
              type: upload.type,
              name: `${prefix}.${ext}`,
            };

            const data = new FormData();

            data.append('file', imageData);
  
            handleUploadImage(data);
          }
        },
      ); 
  }

  async function handleUploadImage(data) {
    try {
      const response = await api.post(`files_services?id=${idUser}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoadingImage(false);
    } catch (error) {
      setLoadingImage(false);
    }
  }

  async function handleSubmit() {

  }

  return (
      <Container>
        {loading ? (
          <BoxLoading>
            <ActivityIndicator color="#000" size="large" />
          </BoxLoading>
        ) : (
          <SafeAreaView>        
            <ScrollView style={{flex: 1, height: '100%'}}>
                <BoxTitleService>
                  <TitleService>{data.service.description}</TitleService>
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
                  {loadingImage ? (
                    <BoxLoading>
                      <ActivityIndicator color="#000" size="small" />
                    </BoxLoading>
                  ) : (
                    <ButtonAddImage onPress={handleUpImage}>
                      <ImageAdd source={Add}></ImageAdd>
                    </ButtonAddImage>
                  )}                  
                </BoxAddImage>
                <BoxImages>
                  {loadingImageDb ? (
                    <BoxLoading>
                      <ActivityIndicator color="#000" size="small" />
                    </BoxLoading>
                  ) : (
                    <>
                      {images.map(item => (
                        <ContainerImage key={item.id}>
                        <ImageService source={{uri: item.url}}></ImageService>
                          <BoxPositionDelete>                  
                            <BoxDelete onPress={() => {}}>
                              <ImageDelete source={Remove}></ImageDelete>
                            </BoxDelete>
                          </BoxPositionDelete>
                        </ContainerImage>
                      ))}
                    </>
                  )}
                  
                </BoxImages>    
                <BoxButtonSave>
                   <ButtonSave>Salvar</ButtonSave>
                </BoxButtonSave>                             
            </ScrollView>                   
        </SafeAreaView>
        )}
      </Container>
    )
}

export default EditCompleteServices;