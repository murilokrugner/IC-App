import React, {useState, useEffect} from 'react';
import { ScrollView, SafeAreaView, ActivityIndicator, FlatList, View } from 'react-native';

import { BoxLoading, Container, BoxTitle, TitleText, 
  BoxFilters, BoxOrder, OrderFilterTitle, 
  Filters, FilterTitle, BoxSelectFilters, 
  BoxButtonFilter, ButtonFilter, ButtonFilters, Line,
  ContainerProducts, Product, ImageProduct, 
  ProductDescription, ProductPrice, ButtonViewProduct
} from './styles';

import { useAuth } from '../../../../hooks/auth';

import api from '../../../../services/api';

const MyStore = () => {
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [products, setProducts] = useState();

  const { dataAuth } = useAuth();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get(`mainProduct?provider=${dataAuth.id}`);
      
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    }

    loadProducts();
  }, []);
  

  function openFilters() {
    if (filterVisible === true) {
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  }

  function handlelLoading() {
    if(products) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                
            </View>
        );
    } else {
        return (
            <ActivityIndicator style={{marginBottom: 20}} size="small" color="#000"/>
        )
    }
  }

  function loadPage() {
    
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
              <SafeAreaView style={{flex: 1}}>
                <FlatList
                  ListFooterComponent={handlelLoading}
                  onEndReached={loadPage}
                  onEndReachedThreshold={0.01}
                  style={{ flex: 1}}
                  data={products}
                  renderItem={({ item }) => 
                    <Product>
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

export default MyStore;