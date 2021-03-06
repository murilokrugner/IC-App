import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';

import { Container, BoxLoading, Box, BoxService, Service, 
    NameService, ButtonEdit, ImageEdit, BoxButtonFinished, ButtonFinished } from './styles';
import { useAuth } from '../../../hooks/auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../services/api';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Edit from '../../../assets/edit.png';
import { withNavigationFocus } from '@react-navigation/compat';
import { showMessage } from "react-native-flash-message";

function CompleteServices({isFocused}) {
    const { dataAuth } = useAuth();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const [stateService, setStateService] = useState(true);
    const [loadingFinished, setLoadingFinished] = useState(false);

    useEffect(() => {
        showMessage({
            message: "Complete o cadastro dos seus serviços, adicionando algumas informações",
            type: "info",
            duration: 5000,        
            titleStyle: {
                fontSize: 17,
                fontWeight: 'bold',
            },
            backgroundColor: '#235A5C',
          });  

        if (isFocused) {
            async function loadServices() {
                setLoading(true);
                const response = await api.get(`/serviceProvider?provider=${dataAuth.id}`);
    
                setData(response.data);
                setLoading(false);
            }
    
            loadServices();
    
            async function verifyServices() {
                setStateService(true); 
                const response = await api.get(`verifyservices?provider=${dataAuth.id}`);
    
                const services = response.data.map(item => {
                    if (item.complete === false) {
                        setStateService(false);          
                        return          
                    };
                })
            }
    
            verifyServices();
        }
    }, [isFocused]);

    function handleEdit(id) {
        navigation.navigate('EditCompleteServices', {id});
    }

    async function handleSubmit() {
        setLoadingFinished(true);
        if (stateService === false) {
            Alert.alert('Por favor, complete o cadastro de todos os serviços');
            setLoadingFinished(false);
            return;
        } else {
            const response = await api.put(`firstaccessconfirm?id=${dataAuth.id}`)

            await AsyncStorage.multiSet([
                ['@App:first_access', "1"],
            ]);

            if (response.data.ok === "ok") {
                setLoadingFinished(false);
                navigation.navigate('RoutesProviderAll');
            }            
        }
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
            {loading !== true && (
                <BoxButtonFinished>                    
                    <ButtonFinished loading={loadingFinished} onPress={handleSubmit}>Concluir</ButtonFinished>
                </BoxButtonFinished> 
            )}                   
      </Container>
  )
}

export default withNavigationFocus(CompleteServices);