import React, {useState, useEffect} from 'react';
import { ActivityIndicator, Text } from 'react-native';

import { Container, BoxTextServices, TextServices, BoxButtonAdd, 
    ButtonAdd, BoxContainerServices, BoxLoading, BoxContainerService, 
    BoxService, Service, NameService, 
    ButtonEdit, ImageEdit } from './styles';

import { useNavigation } from '@react-navigation/native';
import { withNavigationFocus } from '@react-navigation/compat';
import { useAuth } from '../../../../hooks/auth';
import Add from '../../../../assets/add.png';
import Edit from '../../../../assets/edit.png';
import api from '../../../../services/api';

const ProviderServices = ({isFocused}) => {
  const { dataAuth } = useAuth();
    const navigation = useNavigation();

    const [loadingServices, setLoadingService] = useState(false);
    const [data, setData] = useState();

    const userId = dataAuth.id;

    useEffect(() => {
      async function loadServices() {
        setLoadingService(true);
        const response = await api.get(`/serviceProvider?provider=${dataAuth.id}`);

        setData(response.data);
        setLoadingService(false);
    }

      loadServices(); 
    }, []);

    useEffect(() => {
      if (isFocused) {
          

        async function loadServices() {
          setLoadingService(true);
          const response = await api.get(`/serviceProvider?provider=${dataAuth.id}`);

          setData(response.data);
          setLoadingService(false);
      }

        loadServices();          
      }
    }, [isFocused])

  function handleEdit(id) {
    navigation.navigate('EditCompleteServices', {id});
  } 

  function handleAddService() {
    navigation.navigate('AddTypesServices');
  }

  return (
      <Container>
          <BoxTextServices>
          <TextServices>Adicionar serviço</TextServices>
          <BoxButtonAdd onPress={handleAddService}>
            <ButtonAdd source={Add}></ButtonAdd>
          </BoxButtonAdd>
        </BoxTextServices>  
      <BoxContainerServices>           
        {loadingServices ? (
              <BoxLoading>
                  <ActivityIndicator color="#000" size="small" />
              </BoxLoading>
            ) : (
                <BoxContainerService>           
                  {data !== undefined ? (
                        <>
                          {data.map(item => (
                            <BoxService  key={item.id} style={item.complete ? {borderColor: '#15754A'} : {borderColor: '#F01F02'}}>
                                <Service>
                                    <NameService>{item.service.description}</NameService>
                                    <ButtonEdit onPress={() => {handleEdit(item.id)}}>
                                        <ImageEdit source={Edit}></ImageEdit>
                                    </ButtonEdit>
                                </Service>
                            </BoxService>
                          ))}
                        </>                                                   
                        ) : (
                          <Text>Nenhum serviço adicionado</Text>
                        )}                        
                </BoxContainerService>
                )}                              
      </BoxContainerServices> 
      </Container>
  );
}

export default withNavigationFocus(ProviderServices);