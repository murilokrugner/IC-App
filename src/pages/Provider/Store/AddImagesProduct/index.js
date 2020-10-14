import React, {useState, useEffect} from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

import { Container, BoxLoading, Box, TitleProduct, 
  TitleText, BoxButtonAdd, ButtonAdd,   
  ButtonAddImage, BoxImages, ContainerImage, 
  ImageService, BoxPositionDelete, BoxDelete, ImageDelete, BoxButtonSave, ButtonSave, BoxButtonCancel, ButtonCancel } from './styles';


import { useNavigation, useRoute } from '@react-navigation/native';

import Add from '../../../../assets/add.png';
import Remove from '../../../../assets/remove.png';

import Teste from '../../../../assets/fretes.jpg';

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

  //const idProduct = route.params.id;

  useEffect(() => {
    async function loadImages() {
      const response = await api.get(`filesproducts?id=16`);

      if (response.data === 'empty') {
        setLoading(false);
      } else {
        setImages(response.data); 
        setLoading(false);
      }
    }

    loadImages();
  },[]);


  return (
      <Container>
        <ScrollView style={{flex: 1}}>       
            <Box>
              <TitleProduct>Nome do produto aqui</TitleProduct>
              <TitleText>Adicione algumas fotos do seu produto</TitleText>
              <BoxButtonAdd>
                <ButtonAdd>
                  <ButtonAddImage source={Add}/>
                </ButtonAdd>
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
                      <ContainerImage key={item.id}>
                        <ImageService source={{uri: item.description}}></ImageService>
                          <BoxPositionDelete>                  
                            <BoxDelete onPress={() => {}}>
                              <ImageDelete source={Remove}></ImageDelete>
                            </BoxDelete>
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
                      <ButtonSave>Salvar</ButtonSave>
                    </BoxButtonSave>
                  )}                  
                  <BoxButtonCancel>
                    <ButtonCancel>Cancelar</ButtonCancel>
                  </BoxButtonCancel>
                </>
              )}
            </Box>
          </ScrollView>
      </Container>
  );
}

export default AddImagesProduct;