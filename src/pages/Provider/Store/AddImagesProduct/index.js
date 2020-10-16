import React, {useState, useEffect} from 'react';
import { ScrollView, ActivityIndicator, Alert } from 'react-native';

import { Container, BoxLoading, Box, BoxTitleProduct, TitleProduct, 
  TitleText, BoxButtonAdd, ButtonAdd,   
  ButtonAddImage, BoxImages, ContainerImage, 
  ImageService, BoxPositionDelete, BoxDelete, 
  ImageDelete, BoxButtonSave, ButtonSave, 
  BoxButtonCancel, ButtonCancel, BoxPositionMark, BoxMarkMain, ImageMarkMain } from './styles';

import ImagePicker from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

import Add from '../../../../assets/add.png';
import Remove from '../../../../assets/remove.png';
import Mark from '../../../../assets/book-mark.png';

import api from '../../../../services/api';

const AddImagesProduct = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingTrash, setLoadingTrash] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  const [images, setImages] = useState();

  const route = useRoute();

  const idProduct = route.params.idProduct.id;

  const nameProduct = route.params.idProduct.description;

  useEffect(() => {
    async function loadImages() {
      const response = await api.get(`filesproducts?id=${idProduct}`);

      if (response.data === 'empty') {
        setLoading(false);
      } else {
        setImages(response.data); 
        setLoading(false);
      }
    }

    loadImages();
  },[]);

  async function handleAddImage() {
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
        const response = await api.post(`filesproducts?id=${idProduct}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        SaveImage();     

        setLoadingImage(false);
      } catch (error) {
        setLoadingImage(false);
      }

      async function loadImages() {
        const response = await api.get(`filesproducts?id=${idProduct}`);
  
          if (response.data === 'empty') {
            setLoading(false);
          } else {
            setImages(response.data); 
            setLoading(false);
          }
        }

      loadImages();
  }

  async function handleDelete(id) {
    setLoadingTrash(true);
    try {
      async function loadImages() {
        const response = await api.get(`filesproducts?id=${idProduct}`);
  
        if (response.data === 'empty') {
          setLoading(false);
        } else {
          setImages(response.data); 
          setLoading(false);
        }
      }

      const response = await api.delete(`filesproducts?id=${id}`);

      setLoadingTrash(false);
      loadImages();
    } catch (error) {
      setLoadingTrash(false);
    }
  }

  async function handleSave() {
    setLoadingSave(true);
    navigation.goBack();
    navigation.goBack();
    navigation.navigate('MyStore');
    setLoadingSave(false);
  }

  async function handleCancel() {
    Alert.alert(
      'Cancelar',
      'Deseja realmente excluir o produto?',
      [
        {
          text: 'Não',
          onPress: () => {
              return;
          },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            async function Delete() {
              try {
                setLoadingCancel(true);
          
                const response = await api.delete(`products?id=${idProduct}`);
          
                setLoadingCancel(false);
          
                navigation.goBack();
              } catch (error) {
                setLoadingCancel(false);
              }
            }

            Delete();
          }
        }
      ]
    )    
  }

  async function handleMarkMainFile(id) {
    async function loadImages() {
      const response = await api.get(`filesproducts?id=${idProduct}`);

      if (response.data === 'empty') {
        setLoading(false);
      } else {
        setImages(response.data); 
        setLoading(false);
      }
    }

    const updateFileMark = await api.put(`mainProduct?id=${id}&product=${idProduct}`);

    loadImages();
  }

  return (
    <ScrollView style={{flex: 1}}>   
      <Container>            
            <Box>
              <BoxTitleProduct>
                <TitleProduct>{nameProduct}</TitleProduct>
              </BoxTitleProduct>              
              <TitleText>Adicione algumas fotos do seu produto</TitleText>
              <BoxButtonAdd>
                {loadingImage ? (
                  <BoxLoading>
                    <ActivityIndicator color="#000" size="small"/>
                  </BoxLoading>
                ) : (
                  <ButtonAdd onPress={handleAddImage}>
                    <ButtonAddImage source={Add}/>
                  </ButtonAdd>
                )}                
              </BoxButtonAdd>              
                {loading ? (
                  <BoxLoading>
                    <ActivityIndicator color="#000" size="small"/>
                  </BoxLoading>
                ) : (
                  <>
                    {images === undefined ? (
                    <TitleText>Nenhuma imagem adicionada</TitleText>
                  ) : (
                    <BoxImages>
                      {images.map(item => (
                        <ContainerImage onPress={() => {handleMarkMainFile(item.id)}} key={item.id}>
                          <ImageService source={{uri: item.url}}></ImageService> 
                            {item.main && (
                              <BoxPositionMark>
                                <BoxMarkMain>
                                  <ImageMarkMain source={Mark} />
                                </BoxMarkMain>  
                              </BoxPositionMark> 
                            )}                          
                            <BoxPositionDelete>                                             
                              {loadingTrash ? (
                                <BoxLoading>
                                  <ActivityIndicator color="#235A5C" size="small"/>
                                </BoxLoading>
                              ) : (                                
                                <BoxDelete onPress={() => {handleDelete(item.id)}}>
                                  <ImageDelete source={Remove}/>
                                </BoxDelete>                                                                                                  
                              )}                                 
                              </BoxPositionDelete>
                        </ContainerImage>
                      ))}
                  </BoxImages>
                  )}
                  </>
                )}
              {loading ? (
                <></>
              ) : (
                <>
                  {images !== undefined && (
                    <BoxButtonSave>
                      <ButtonSave loading={loadingSave} onPress={handleSave}>Salvar</ButtonSave>
                    </BoxButtonSave>
                  )}                  
                  <BoxButtonCancel>
                    <ButtonCancel loading={loadingCancel} onPress={handleCancel}>Cancelar</ButtonCancel>
                  </BoxButtonCancel>
                </>
              )}
            </Box>          
      </Container>
    </ScrollView>
  );
}

export default AddImagesProduct;