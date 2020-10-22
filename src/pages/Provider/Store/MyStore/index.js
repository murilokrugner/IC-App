import React, {useState, useEffect} from 'react';
import { ScrollView, SafeAreaView, ActivityIndicator, FlatList, Text, Alert } from 'react-native';
import { BoxLoading, Container, BoxTitle, TitleText, 
  BoxFilters, BoxOrder, OrderFilterTitle, 
  Filters, FilterTitle, BoxSelectFilters, 
  BoxButtonFilter, ButtonFilter, ButtonFilters, Line,
  ContainerProducts, Product, ImageProduct, 
  ProductDescription, ProductPrice, ButtonViewProduct, BoxButtonAdd, ButtonAdd, ButtonAddImage
} from './styles';

import {Picker} from '@react-native-community/picker';

import Add from '../../../../assets/add2.png';

import { useNavigation } from '@react-navigation/native';
import { withNavigationFocus } from '@react-navigation/compat';
import { useAuth } from '../../../../hooks/auth';

import api from '../../../../services/api';

const MyStore = ({isFocused}) => {
  const [selectOrder, setSelectOrder] = useState('Ordenar');
  const [selectBrand, setSelectBrand] = useState('Todos');
  const [selectCategory, setSelectCategory] = useState('Todos');
  const [selectUnit, setSelectUnit] = useState('Todos');

  const [categories, setCategories] = useState();
  const [units, setUnits] = useState();

  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [products, setProducts] = useState();
  const [page, setPage] = useState(5);
  const [count, setCount] = useState(0);

  const { dataAuth } = useAuth();

  useEffect(() => {
    if (isFocused) {
      async function load() {

        if (selectOrder === 'Ordenar') {
          const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=created_at&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);          

          setProducts(response.data);
        } else if (selectOrder === 'Descrição') {
          const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'description'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);          

          setProducts(response.data);
        } else if (selectOrder === 'Data') {
          const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'created_at'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);

          setProducts(response.data);
        } else if (selectOrder === 'Preço') {
          const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'cash_price'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);

          setProducts(response.data);
        }            

        const responseCount = await api.get(`mainCount?id=${dataAuth.id}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);

        setCount(responseCount.data);

        const responseCategories = await api.get('productcategory');

        setCategories(responseCategories.data);

        const responseUnits = await api.get('productunits');

        setUnits(responseUnits.data);
  
        setLoading(false);
      };
  
      load();
    }
    
  }, [isFocused]);

  useEffect(() => {
    if (page !== 1) {
      async function load() {

        if(selectOrder === 'Ordenar') {
          const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'created_at'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);

          setProducts(response.data);
        } else if (selectOrder === 'Descrição') {
          const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'description'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);

          setProducts(response.data);
        } else if (selectOrder === 'Data') {
          const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'created_at'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);

          setProducts(response.data);
        } else if (selectOrder === 'Preço') {
          const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'cash_price'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);

          setProducts(response.data);
        } 

        const responseCount = await api.get(`mainCount?id=${dataAuth.id}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);

        setCount(responseCount.data);
  
        setLoading(false);
      };
  
      load();
    }
    
  }, [page]);

  useEffect(() => {
      if (selectOrder !== 'Ordenar' || selectCategory !== 'Todos' || selectUnit !== 'Todos') {
        async function load() {

          setLoadingOrder(true);
      
          if(selectOrder === 'Ordenar') {
            const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'created_at'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);
    
            setProducts(response.data);
          } else if (selectOrder === 'Descrição') {
            const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'description'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);
    
            setProducts(response.data);
          } else if (selectOrder === 'Data') {
            const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'created_at'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);
    
            setProducts(response.data);
          } else if (selectOrder === 'Preço') {
            const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}&orderSelect=${'cash_price'}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);
    
            setProducts(response.data);
          } 
  
          const responseCount = await api.get(`mainCount?id=${dataAuth.id}&brand=${selectBrand}&category=${selectCategory}&unit=${selectUnit}`);
    
          setCount(responseCount.data);
    
          setLoadingOrder(false);        
      }  
      
      load();
    };    
  }, [selectOrder, selectCategory, selectUnit]);
  

  function openFilters() {
    if (filterVisible === true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  }

  function handleLoading() {
    if (page >= count) {
      return (
        <Text></Text>
      )
    } else {
      return (
        <ActivityIndicator style={{marginBottom: 20}} size="small" color="#000"/>
      )
    }
    
  }

  function loadPage() {
    setPage(page + 5);
  }

  function openAddProduct() {
    navigation.navigate('CreateProduct')
  }

  function handleViewPrduct(id) {
    navigation.navigate('ViewProduct', {id});
  }

  return (
      <Container>
        {loading ? (
          <BoxLoading>
            <ActivityIndicator color="#000" size="large" />
          </BoxLoading>
        ) : (
          <>
            <BoxTitle>
              <TitleText>Minha Loja</TitleText>
              <BoxButtonAdd>
                <ButtonAdd onPress={openAddProduct}>
                  <ButtonAddImage source={Add} />
                </ButtonAdd>
              </BoxButtonAdd>
            </BoxTitle>
              <BoxFilters>
                <BoxOrder>
                  <Picker
                  selectedValue={selectOrder}
                  style={{fontSize: 16, color: '#235A5C', width: 130}}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectOrder(itemValue)
                  }> 
                    <Picker.Item key={'Ordernar'} label={'Ordernar'} value={'Ordernar'} />                                                    
                    <Picker.Item key={'Descrição'} label={'Descrição'} value={'Descrição'} />
                    <Picker.Item key={'Data'} label={'Data'} value={'Data'} />
                    <Picker.Item key={'Preço'} label={'Preço'} value={'Preço'} />
                  </Picker>
                </BoxOrder>
                <Filters>
                  <ButtonFilters onPress={openFilters}>
                    <FilterTitle>Filtros</FilterTitle>
                  </ButtonFilters>              
                </Filters>
              </BoxFilters>
              {filterVisible ? (
                <>
                  <BoxSelectFilters>
                  <ScrollView horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                    {/*<BoxButtonFilter>
                    <Picker
                    selectedValue={selectOrder}
                    style={{fontSize: 16, color: '#235A5C', width: 130}}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectOrder(itemValue)
                    }> 
                      <Picker.Item key={'Marca'} label={'Marca'} value={'Marca'} />                                                    
                      <Picker.Item key={'Descrição'} label={'Descrição'} value={'Descrição'} />
                      <Picker.Item key={'Data'} label={'Data'} value={'Data'} />
                      <Picker.Item key={'Preço'} label={'Preço'} value={'Preço'} />
                    </Picker>
                  </BoxButtonFilter>*/}
                    <BoxButtonFilter>
                      <Picker
                      selectedValue={selectCategory}
                      style={{fontSize: 16, color: '#235A5C', width: 140}}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectCategory(itemValue)
                      }> 
                        <Picker.Item key={'Todos'} label={'Categoria'} value={'Todos'} />                                                       
                        {categories.map(item => (
                          <Picker.Item key={item.description} label={item.description} value={item.description} /> 
                        ))}
                    </Picker>
                    </BoxButtonFilter>
                    <BoxButtonFilter>
                      <Picker
                        selectedValue={selectUnit}
                        style={{fontSize: 16, color: '#235A5C', width: 130}}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectUnit(itemValue)
                        }> 
                          <Picker.Item key={'Todos'} label={'Unidade'} value={'Todos'} />                                                       
                          {units.map(item => (
                          <Picker.Item key={item.description} label={item.description} value={item.description} /> 
                        ))}
                      </Picker>
                    </BoxButtonFilter>
                  </ScrollView>
                </BoxSelectFilters>
                <Line />
                </>
              ) : (
                <></>
              )}                  
              {loadingOrder ? (
                <BoxLoading>
                <ActivityIndicator color="#000" size="large" />
              </BoxLoading>
              ) : (
                <ContainerProducts> 
              <SafeAreaView >
                <FlatList
                    ListFooterComponent={handleLoading}
                    onEndReached={loadPage}
                    onEndReachedThreshold={0.01}
                    data={products}
                    style={{width: '100%', height: '100%', flexDirection: 'column'}}
                    renderItem={({ item }) => 
                      <Product key={item.id}>
                        <ImageProduct source={{uri: item.url}}/>
                        <ProductDescription>{item.product.description}</ProductDescription>
                        <ProductPrice>R$ {item.product.cash_price}</ProductPrice>
                        <ButtonViewProduct onPress={() => {handleViewPrduct(item.product.id)}}>Ver Produto</ButtonViewProduct>
                      </Product>
                    }
                    keyExtractor={item => item.id}
                    />  
                </SafeAreaView>                                                                                       
              </ContainerProducts>
              )}               
          </>
        )}                               
      </Container>
  );
}

export default withNavigationFocus(MyStore);