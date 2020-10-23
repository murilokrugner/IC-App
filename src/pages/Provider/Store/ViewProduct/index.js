
import React, {useState, useEffect} from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';

import { Container, BoxLoading, BoxDescription, 
  Description, BoxPrice, Price, ForwardPrice, 
  BoxBrand, Brand, BoxNote, TitleNote, Note, BoxEdit, ButtonEdit } from './styles';
import { useAuth } from '../../../../hooks/auth';
import SwipeableParallaxCarousel from 'react-native-swipeable-parallax-carousel';
import { useNavigation, useRoute } from '@react-navigation/native';
import { withNavigationFocus } from '@react-navigation/compat';
import api from '../../../../services/api';

const ViewProduct = ({isFocused}) => {
  const navigation = useNavigation();

  const { dataAuth } = useAuth();

  const route = useRoute();

  const idProduct = route.params.id;

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState();

  useEffect(() => {
    if (isFocused) {
      async function loadImages() {
        const response = await api.get(`filesviewproducts?id=${idProduct}`);
  
        setImages(response.data);
  
        const responseProduct = await api.get(`productId?id=${idProduct}`);
  
        setProduct(responseProduct.data);
  
        setLoading(false);
        
      }
  
      loadImages();
    }
    
  }, [isFocused]);

  function handleEditProduct() {
    navigation.navigate('EditProduct', {idProduct});
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        {loading ? (
          <BoxLoading>
            <ActivityIndicator color="#000" size="small" />
          </BoxLoading>
        ) : (
          <>
            <SwipeableParallaxCarousel
            data={images}
            parallax={true}
            navigation={true}
            titleColor={"#fff"}
            navigationColor={"#235A5C"}
            height={300}
          />
            <BoxDescription>
            <Description>{product.description}</Description>
            </BoxDescription>
            <BoxPrice>
              <Price>R$ {product.cash_price} a vista - {product.unit.description}</Price>
              <ForwardPrice>R$ {product.forward_price} a prazo - {product.unit.description}</ForwardPrice>
            </BoxPrice>
            <BoxBrand>
              <Brand>Marca: {product.brand}</Brand>
              <Brand>Categoria: {product.category.description}</Brand>
            </BoxBrand>
            <BoxNote>
              <TitleNote>Observações sobre o produto: </TitleNote>
              <Note>{product.comments}</Note>
            </BoxNote>
            <BoxEdit>
              <ButtonEdit onPress={handleEditProduct}>Editar produto</ButtonEdit>
          </BoxEdit>
          </>
        )}        
      </Container>
    </SafeAreaView>
  );
}

export default withNavigationFocus(ViewProduct);