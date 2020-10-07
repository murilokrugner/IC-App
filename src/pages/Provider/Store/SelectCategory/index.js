import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';

import {Picker} from '@react-native-community/picker';
import { useAuth } from '../../../../hooks/auth';
import { Container, BoxLoading, BoxPicker, BoxCategories, 
    BoxAlignServices, BoxSelectService, TextCategory, Service, BoxDelService, DelService, BoxButtonNext, ButtonNext } from './styles';

import api from '../../../../services/api';

import Delete from '../../../../assets/delete.png';

const SelectCategory = () => {
  const [selectCategory, setSelectCategory] = useState('        Selecione uma categoria');

  const { dataAuth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(true);

  const [category, setCategory] = useState({});  

  const [data, setData] = useState();

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('productcategory');

      setCategory(response.data);

      setLoadingCategory(false);
    }

    async function loadCategory() {
      setLoading(true);
      const response = await api.get(`products?provider=${dataAuth.id}`);

      setData(response.data);

      setLoading(false);
      setSelectCategory ('Selecione uma categoria');
    }

    loadCategories();
    loadCategory();
  }, []);

  useEffect(() => {    
    if (selectCategory !== '        Selecione uma categoria') {
      async function saveCategory() {
        const response = await api.post('addcategoryproduct', {
          id_provider: dataAuth.id,
          category: selectCategory,
        });
      }

      async function loadCategory() {
        setLoading(true);
        const response = await api.get(`products?provider=${dataAuth.id}`);

        setData(response.data);

        setLoading(false);
        setSelectCategory ('Selecione uma categoria');
      }

      saveCategory();
      loadCategory();
    }
  }, [selectCategory]);

  async function handleDelete() {

  }

  return (
      <Container>
          <BoxPicker>
            {loadingCategory ? (
              <BoxLoading>
                <ActivityIndicator color="#000" size="small" />
              </BoxLoading>              
            ) : (
              <>
                {data === undefined && (
                <Picker
                selectedValue={selectCategory}
                style={{height: 20, width: 300, color: '#666360'}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectCategory(itemValue)
                }>
                  <Picker.Item key={"        Selecione uma categoria"} label={"        Selecione uma categoria"} value={"        Selecione uma categoria"}/>                                 
                  {category.map(item => (
                        <Picker.Item key={item.description} label={item.description} value={item.description}/>  
                  ))}
                </Picker> 
                )}  
              </>            
            )}            
          </BoxPicker>
          <BoxCategories>
            {loading ? (
              <BoxLoading>
                <ActivityIndicator color="#000" size="small" />
              </BoxLoading>
            ) : (
              <>
                {data !== undefined && (
                  <>
                    <TextCategory>Categoria adicionada: </TextCategory>
                    <BoxAlignServices>                      
                      {data.map(item => (                          
                          <BoxSelectService key={item.id}>                          
                            <Service>{item.category.description}</Service>
                            <BoxDelService onPress={() => {handleDelete(item.id)}}>
                              <DelService source={Delete}/>
                            </BoxDelService>                      
                          </BoxSelectService>                 
                      ))}
                    </BoxAlignServices>
                  </>
                )}
              </>
            )}
          </BoxCategories>
          <BoxButtonNext>
            <ButtonNext>Avançar</ButtonNext>
          </BoxButtonNext>
      </Container>
  )
}

export default SelectCategory;