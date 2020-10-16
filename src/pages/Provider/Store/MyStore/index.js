import React, {useState, useEffect} from 'react';
import { ScrollView, SafeAreaView, ActivityIndicator, FlatList, View, Alert } from 'react-native';
import { BoxLoading, Container, BoxTitle, TitleText, 
  BoxFilters, BoxOrder, OrderFilterTitle, 
  Filters, FilterTitle, BoxSelectFilters, 
  BoxButtonFilter, ButtonFilter, ButtonFilters, Line,
  ContainerProducts, Product, ImageProduct, 
  ProductDescription, ProductPrice, ButtonViewProduct, BoxButtonAdd, ButtonAdd, ButtonAddImage
} from './styles';

import Add from '../../../../assets/add2.png';

import { useNavigation } from '@react-navigation/native';
import { withNavigationFocus } from '@react-navigation/compat';
import { useAuth } from '../../../../hooks/auth';

import api from '../../../../services/api';

const MyStore = ({isFocused}) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [products, setProducts] = useState();
  const [page, setPage] = useState(2);

  const { dataAuth } = useAuth();

  useEffect(() => {
    if (isFocused) {
      async function load() {
        const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}`);
  
        setProducts(response.data);
  
        setLoading(false);
      };
  
      load();
    }
    
  }, [isFocused]);

  useEffect(() => {
    if (page !== 1) {
      async function load() {
        const response = await api.get(`mainProduct?id=${dataAuth.id}&page=${page}`);
  
        setProducts(response.data);
  
        setLoading(false);
      };
  
      load();
    }
    
  }, [page]);
  

  function openFilters() {
    if (filterVisible === true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  }

  function handleLoading() {
    return (
      <ActivityIndicator style={{marginBottom: 20}} size="small" color="#000"/>
    )
  }

  function loadPage() {
    setPage(page + 2);
  }

  function openAddProduct() {
    navigation.navigate('CreateProduct')
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
                  <OrderFilterTitle>Ordenação</OrderFilterTitle>
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
                    <BoxButtonFilter>
                      <ButtonFilter>Marcas</ButtonFilter>
                    </BoxButtonFilter>
                    <BoxButtonFilter>
                      <ButtonFilter>Categoria</ButtonFilter>
                    </BoxButtonFilter>
                    <BoxButtonFilter>
                      <ButtonFilter>Preço</ButtonFilter>
                    </BoxButtonFilter>
                    <BoxButtonFilter>
                      <ButtonFilter>Unidade</ButtonFilter>
                    </BoxButtonFilter>
                  </ScrollView>
                </BoxSelectFilters>
                <Line />
                </>
              ) : (
                <></>
              )}                  
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
                        <ProductPrice>{item.product.cash_price}</ProductPrice>
                        <ButtonViewProduct>Ver Produto</ButtonViewProduct>
                      </Product>
                    }
                    keyExtractor={item => item.id}
                    />  
                </SafeAreaView>                                                                                       
              </ContainerProducts>               
          </>
        )}                               
      </Container>
  );
}

export default withNavigationFocus(MyStore);