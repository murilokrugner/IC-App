import React, {useState, useEffect, useRef} from 'react';
import { ScrollView, KeyboardAvoidingView, SafeAreaView, ActivityIndicator, TextInput, Alert } from 'react-native';

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
  const [loadingImageDb, setLoadingImageDb] = useState(false); 
  const [loadingSave, setLoadingSave] = useState(false);

  const [data, setData] = useState({});
  const [images, setImages] = useState();
  const [inputPrice, setInputPrice] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  useEffect(() => {
    async function load() {
      setLoadingImageDb(true);
      
      const response = await api.get(`serviceslist?provider=${idUser}&service=${idService}`);

      setData(response.data);
      setInputTime(response.data.time);
      
      const priceFormatted = response.data.price;

      setInputPrice('R$'+priceFormatted.toString());

      setInputDescription(response.data.description);
      
      const responseImage = await api.get(`files_services?id=${idUser}`);

      if (responseImage.data === []) {
        setImages();
        setLoadingImageDb(false);
        setLoading(false);
      } else {
        setImages(responseImage.data);             
        setLoadingImageDb(false);
        setLoading(false);
      }
    }

    load();
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
         // maxWidth: 220,
        //  maxHeight: 220,
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
      async function loadImages() {
        const response = await api.get(`files_services?id=${idUser}`);
  
        if (response.error) {
          setImages();
          setLoadingImageDb(false);
          setLoadingImage(false);
        } else {
          setImages(response.data);
          setLoadingImageDb(false);
          setLoadingImage(false);
        }
      }      

      const response = await api.post(`files_services?id=${idUser}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      loadImages();

      setLoadingImage(false);
    } catch (error) {
      setLoadingImage(false);
    }
  }

  async function handleSubmit() {
    setLoadingSave(true);
    if (inputPrice === '') {
      Alert.alert('Por favor, informe o preço médio do serviço!');
      setLoadingSave(false);
      return;
    }

    if (inputTime === '') {
      Alert.alert('Por favor, informe o tempo médio do serviço!');
      setLoadingSave(false);
      return;
    }

    if (inputDescription === '') {
      Alert.alert('Por favor, informe uma descrição para o serviço');
      setLoadingSave(false);
      return;
    }

    console.log(images);

    if (images === undefined) {
      Alert.alert('Por favor, adicione por o menos uma foto do serviço');
      setLoadingSave(false);
      return;
    }

    try {
      const priceFormatted = inputPrice.slice(2);
      const response = await api.put('serviceProvider', {
        id: idService,
        description: inputDescription,
        price: parseFloat(priceFormatted).toFixed(2),
        time: inputTime,
        
      });

      setLoadingSave(false);
      navigation.goBack();
      Alert.alert('Serviço atualizado!');
      
    } catch (error) {
      Alert.alert('Ocorreu um erro ao tentar salvar o serviço, tente novamente mais tarde');
      setLoadingSave(false);
    }
  }

  async function deleteImage(id) {
    try {
      setLoadingImageDb(true);      
      async function loadImages() {
        const response = await api.get(`files_services?id=${idUser}`);
  
        if (response.data === []) {
          setImages();
          setLoadingImageDb(false);
        } else {
          setImages(response.data);
          setLoadingImageDb(false);
        }
      }

      const response = await api.delete(`files_services?id=${id}`);
  
      loadImages();

      setLoadingImageDb(false);
    } catch (error) {
      setLoadingImageDb(false);
    }
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
                        <TextInput
                          value={inputDescription}
                          onChangeText={text => setInputDescription(text)}
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
                                <BoxDelete onPress={() => {deleteImage(item.id)}}>
                                  <ImageDelete source={Remove}></ImageDelete>
                                </BoxDelete>
                              </BoxPositionDelete>
                            </ContainerImage>
                          ))}
                        </>
                      )}
                    </>
                  )}
                  
                </BoxImages>    
                <BoxButtonSave>
                   <ButtonSave loading={loadingSave} onPress={handleSubmit}>Salvar</ButtonSave>
                </BoxButtonSave>                             
            </ScrollView>                   
        </SafeAreaView>
        )}
      </Container>
    )
}

export default EditCompleteServices;