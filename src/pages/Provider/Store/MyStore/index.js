import React, {useState, useEffect} from 'react';
import { ScrollView, SafeAreaView, ActivityIndicator, FlatList, View, Alert } from 'react-native';
import { BoxLoading, Container, BoxTitle, TitleText, 
  BoxFilters, BoxOrder, OrderFilterTitle, 
  Filters, FilterTitle, BoxSelectFilters, 
  BoxButtonFilter, ButtonFilter, ButtonFilters, Line,
  ContainerProducts, Product, ImageProduct, 
  ProductDescription, ProductPrice, ButtonViewProduct, BoxButtonAdd, ButtonAdd, ButtonAddImage
} from './styles';

import Add from '../../../../assets/add.png';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../../../hooks/auth';

import api from '../../../../services/api';

const MyStore = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [products, setProducts] = useState();

  const { dataAuth } = useAuth();

  useEffect(() => {
    async function load() {
      const response = await api.get(`mainProduct?id=${dataAuth.id}`);

      setProducts(response.data);
      console.log(response.data);

      setLoading(false);
    };

    load();

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
                    ListFooterComponent={handlelLoading}
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

export default MyStore;