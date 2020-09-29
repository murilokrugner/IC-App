import React, {useEffect, useState} from 'react';
import { View } from 'react-native';

import { Container, BoxLoading, Box, BoxService, Service, NameService, ButtonEdit, ImageEdit } from './styles';
import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';
import { ActivityIndicator, Button } from 'react-native-paper';

import Edit from '../../../assets/edit.png';

const CompleteServices = () => {
const { dataAuth } = useAuth();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

    useEffect(() => {
        async function loadServices() {
            setLoading(true);
            const response = await api.get(`/serviceProvider?provider=${dataAuth.id}`);

            setData(response.data);
            setLoading(false);
        }

        loadServices();
    }, []);

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
                            <BoxService>
                                <Service>
                                    <NameService>{item.service.description}</NameService>
                                    <ButtonEdit>
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