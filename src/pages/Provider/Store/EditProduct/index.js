import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';

import { Container, BoxLoading } from './styles';
import { useAuth } from '../../../../hooks/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../../services/api';

const EditProduct = () => {
    const navigation = useNavigation();

    const { dataAuth } = useAuth();

    const route = useRoute();

    const id = route.params.idProduct;

  const [loading, setLoading] = useState(true);
 
  const [description, setDescription] = useState('');
  const [cashPrice, setCashPrice] = useState('');
  const [forwardPrice, setForwardPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [comments, setComments] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get(`productId?id=${id}`);

      setDescription(response.data.description);
      setCashPrice(response.data.cash_price);
      setForwardPrice(response.data.forward_price);
      setBrand(response.data.brand);
      setComments(response.data.comments);
      setCategory(response.data.category.description);
      setUnit(response.data.unit.description);

      setLoading(false);
    
    }

    loadProduct();
  }, []);

  return (
    <Container>
      {loading ? (
        <BoxLoading>
          <ActivityIndicator color="#000" size="small" />
        </BoxLoading>
      ) : (
        <View>

        </View>
      )}
    </Container>
  );
}

export default EditProduct;