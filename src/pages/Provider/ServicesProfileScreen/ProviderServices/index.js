import React from 'react';
import { ActivityIndicator, Text } from 'react-native';

import { Container, BoxTextServices, TextServices, BoxButtonAdd, 
    ButtonAdd, BoxContainerServices, BoxLoading, BoxContainerService, 
    BoxService, Service, NameService, 
    ButtonEdit, ImageEdit } from './styles';

const ProviderServices = () => {
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

export default ProviderServices;