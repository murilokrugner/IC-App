import React, {useEffect, useState} from 'react';
import { View } from 'react-native';

import { Container, BoxLoading, Box, BoxService, Service, NameService, ButtonEdit, ImageEdit } from './styles';
import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Edit from '../../../assets/edit.png';

import { showMessage } from "react-native-flash-message";

const CompleteServices = () => {
    const { dataAuth } = useAuth();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        showMessage({
            message: "Complete o cadastro dos seus serviços, adicionando algumas informações",
            type: "info",
            duration: 5000,        
            titleStyle: {
                fontSize: 17,
                fontWeight: 'bold',
            },
            backgroundColor: '#f08080',
          });  

        async function loadServices() {
            setLoading(true);
            const response = await api.get(`/serviceProvider?provider=${dataAuth.id}`);

            setData(response.data);
            setLoading(false);
        }

        loadServices();
    }, []);

    function handleEdit(id) {
        navigation.navigate('EditCompleteServices', {id});
    }

  return (
      <Container>
          {loading ? (
              <BoxLoading>
                  <ActivityIndicator color="#000" size="small" />
              </BoxLoading>
            ) : (
                <Box>
                    <>
                        {data.map(item => (
                            <BoxService key={item.id} style={item.complete ? {borderColor: '#15754A'} : {borderColor: '#F01F02'}}>
                                <Service>
                                    <NameService>{item.service.description}</NameService>
                                    <ButtonEdit onPress={() => {handleEdit(item.id)}}>
                                        <ImageEdit source={Edit}></ImageEdit>
                                    </ButtonEdit>
                                </Service>
                            </BoxService>
                        ))}
                    </>
                </Box>
            )}          
      </Container>
  )
}

export default CompleteServices;