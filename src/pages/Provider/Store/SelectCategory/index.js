import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';

import {Picker} from '@react-native-community/picker';
import { useAuth } from '../../../../hooks/auth';
import { Container, BoxLoading, BoxPicker, BoxCategories, 
    BoxAlignServices, ContainerBox, BoxSelectService, BoxTextCategory, TextCategory, Service, BoxDelService, DelService, BoxButtonNext, ButtonNext } from './styles';

import api from '../../../../services/api';
import { useNavigation } from '@react-navigation/native';

import Delete from '../../../../assets/delete.png';

const SelectCategory = () => {
  const navigation = useNavigation();

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

      if (response.data === 'empty') {
        setLoading(false);
      } else {
        setData(response.data);

        setLoading(false);
        setSelectCategory ('Selecione uma categoria');
      }       
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

      saveCategory();

      async function loadCategory() {
        setLoading(true);
        const response = await api.get(`products?provider=${dataAuth.id}`);

        setData(response.data);

        setLoading(false);
        setSelectCategory ('Selecione uma categoria');
      }

      loadCategory();
    }
  }, [selectCategory]);

  async function handleDelete(id) {
    const response = await api.delete(`products?id=${id}`);

    setData();
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
                    <BoxTextCategory>
                      <TextCategory>Categoria adicionada: </TextCategory>
                    </BoxTextCategory>                    
                    <BoxAlignServices>                      
                      {data.map(item => (          
                        <ContainerBox>                
                          <BoxSelectService key={item.id}>                          
                            <Service>{item.category.description}</Service>
                            <BoxDelService onPress={() => {handleDelete(item.id)}}>
                              <DelService source={Delete}/>
                            </BoxDelService>                      
                          </BoxSelectService>  
                          <BoxButtonNext>
                            <ButtonNext onPress={() => {navigation.navigate('CreateProduct', {item})}}>Avançar</ButtonNext>
                          </BoxButtonNext>  
                        </ContainerBox>             
                      ))}
                    </BoxAlignServices>
                  </>
                )}
              </>
            )}
          </BoxCategories>          
      </Container>
  )
}

export default SelectCategory;