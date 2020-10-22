
import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';
import { useAuth } from '../../../../hooks/auth';
import SwipeableParallaxCarousel from 'react-native-swipeable-parallax-carousel';
import { useNavigation, useRoute } from '@react-navigation/native';

const ViewProduct = () => {
  const navigation = useNavigation();

  const { dataAuth } = useAuth();

  const route = useRoute();

 // const idProduct = route.param.id;

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function loadImages() {
      const response = await api.get(`filesviewproducts?id=${idProduct}`);

      setImages(response.data);

      setLoading(false);

      
    }
  }, []);

  return (
      <Container>
        <SwipeableParallaxCarousel
          data={images}
          parallax={true}
          navigation={true}
          titleColor={"#fff"}
          navigationColor={"#235A5C"}
          height={300}
        />
      </Container>
  );
}

export default ViewProduct;