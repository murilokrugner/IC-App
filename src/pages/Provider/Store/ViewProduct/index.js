
import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, BoxLoading, BoxDescription, 
  Description, BoxPrice, Price, ForwardPrice, 
  BoxBrand, Brand, BoxNote, TitleNote, Note, BoxEdit, ButtonEdit } from './styles';
import { useAuth } from '../../../../hooks/auth';
import SwipeableParallaxCarousel from 'react-native-swipeable-parallax-carousel';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../../../services/api';

const ViewProduct = () => {
  const navigation = useNavigation();

  const { dataAuth } = useAuth();

  const route = useRoute();

  const idProduct = route.params.id;

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function loadImages() {
      const response = await api.get(`filesviewproducts?id=${idProduct}`);

      setImages(response.data);

      setLoading(false);
      
    }

    loadImages();
  }, []);

  return (
      <Container>
        {loading ? (
          <BoxLoading>
            <ActivityIndicator color="#000" size="small" />
          </BoxLoading>
        ) : (
          <SwipeableParallaxCarousel
            data={images}
            parallax={true}
            navigation={true}
            titleColor={"#fff"}
            navigationColor={"#235A5C"}
            height={300}
          />
        )}
        <BoxDescription>
          <Description>Descrição do produto aqui</Description>
        </BoxDescription>
        <BoxPrice>
          <Price>R$ 50,00 a vista</Price>
          <ForwardPrice>R$ 55,00 a prazo</ForwardPrice>
        </BoxPrice>
        <BoxBrand>
          <Brand>Marca: HONDA</Brand>
        </BoxBrand>
        <BoxNote>
          <TitleNote>Observações sobre o produto: </TitleNote>
          <Note>teste de obsenfenvnr</Note>
        </BoxNote>
        <BoxEdit>
          <ButtonEdit>Editar produto</ButtonEdit>
        </BoxEdit>
      </Container>
  );
}

export default ViewProduct;