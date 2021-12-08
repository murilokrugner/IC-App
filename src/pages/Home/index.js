import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {
    Container,
    BoxTitle,
    Hello,
    Name,
    BoxMsg,
    Msg,
    BoxServices,
    BoxServicesMain,
    ButtonServiceMain,
    ServiceMain,
    ButtonService,
    ImageService,
    TitleService,
    Service,
    BoxMsgFilter,
    BoxPicker,
    ImageServiceMain,
    BoxTextServiceMain,
    NameProvider,
    TitleServiceMain,
    PriceServiceMain,
} from './styles';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
//import Icon from 'react-native-vector-icons/Ionicons';
//import ActionButton from 'react-native-action-button';
import InputSearch from '../../components/InputSearch';
import ElectrialIcon from '../../assets/electrical.jpg';
import CelularesIcon from '../../assets/celulares.jpg';
import DiaristaIcon from '../../assets/diarista.jpg';
import EncanadorIcon from '../../assets/encanador.jpg';
import FretesIcon from '../../assets/fretes.jpg';
import InformaticaIcon from '../../assets/informatica.jpg';
import JardineiroIcon from '../../assets/jardineiro.jpg';
import PedreiroIcon from '../../assets/pedreiro.jpg';
import PintorIcon from '../../assets/pintor.jpg';
import FilterIcon from '../../assets/filter.png';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyBIuZDy_cKsPTBfD2VG5XNV6Ty_SlsNlwk');

function Home() {
    const { dataAuth } = useAuth();

    const navigation = useNavigation();

    const [search, setSearch] = useState();
    const [filters, setFilters] = useState();

    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState(null);


    function handleServices(type) {
        navigation.navigate('Services', { type });
    }

    async function loadServices(cityLocation) {
        try {

            const responseServices = await api.get(`services-providers?city=${cityLocation.trim()}`);

            if (responseServices.data.length !== 0) {
                setServices(responseServices.data);
                console.tron.log(responseServices.data)
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function getLocation() {
        Geolocation.getCurrentPosition(
            async ({coords: {latitude, longitude}}) => {
              const response = await Geocoder.from({latitude, longitude});
              const address = response.results[0].formatted_address;

              const locationSplit = address.split(',');

              loadServices(locationSplit[1].split('-')[1]);
            },
            (error) => {
              console.log('Map' + error);
            },
            {enableHighAccuracy: true, maximumAge: 10000, timeout: 10000},
          );
    }

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <Container>
            <ScrollView>
                <BoxTitle>
                    <Hello>Olá</Hello>
                    <Name>{dataAuth.name}</Name>
                </BoxTitle>
                <BoxMsg>
                    <Msg>Os mais populares</Msg>
                </BoxMsg>
                <BoxServices>
                    <ScrollView
                        style={{ flex: 1 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <ButtonService
                            onPress={() => {
                                handleServices('Eletricista');
                            }}
                        >
                            <Service>
                                <ImageService source={ElectrialIcon} />
                                <TitleService>Eletricista</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Técnico de celulares');
                            }}
                        >
                            <Service>
                                <ImageService source={CelularesIcon} />
                                <TitleService>Concertos</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Diarista');
                            }}
                        >
                            <Service>
                                <ImageService source={DiaristaIcon} />
                                <TitleService>Diarista</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService onPress={() => {
                                handleServices('Encanador');
                            }}>
                            <Service>
                                <ImageService source={EncanadorIcon} />
                                <TitleService>Encanador</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Fretes');
                            }}
                        >
                            <Service>
                                <ImageService source={FretesIcon} />
                                <TitleService>Fretes</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Técnico de informática');
                            }}
                        >
                            <Service>
                                <ImageService source={InformaticaIcon} />
                                <TitleService>Informatica</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Jardineiro');
                            }}
                        >
                            <Service>
                                <ImageService source={JardineiroIcon} />
                                <TitleService>Jardineiro</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Pedreiro');
                            }}
                        >
                            <Service>
                                <ImageService source={PedreiroIcon} />
                                <TitleService>Pedreiro</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Pintor');
                            }}
                        >
                            <Service>
                                <ImageService source={PintorIcon} />
                                <TitleService>Pintor</TitleService>
                            </Service>
                        </ButtonService>
                    </ScrollView>
                </BoxServices>
                <BoxMsgFilter>
                    <Msg>Serviços</Msg>
                    <BoxPicker>
                        <Picker
                            selectedValue={filters}
                            style={{ height: 20, width: 150, color: '#235A5C' }}
                            onValueChange={(itemValue, itemIndex) =>
                                setFilters(itemValue)
                            }
                        >
                            <Picker.Item
                                key={'Novos'}
                                label={'Novos'}
                                value={'Novos'}
                            />
                        </Picker>
                    </BoxPicker>
                </BoxMsgFilter>

                    <BoxServicesMain>
                        {loading ? (
                            <ActivityIndicator size="small" color="#000" />
                        ) : (
                            <>
                                {services === null ? (
                                    <></>
                                ) : (
                                    <>
                                        {services.map(item => (
                                            <ButtonServiceMain key={item.id}>
                                            <ServiceMain>
                                                <ImageServiceMain source={{uri: item.provider.avatar ? item.provider.avatar.url : `https://ui-avatars.com/api/?name=${item.provider.title}&size=220&background=random&color=000`}} />
                                                <BoxTextServiceMain>
                                                    <NameProvider>
                                                        {item.provider.title}
                                                    </NameProvider>
                                                    <TitleServiceMain>
                                                        {item.service.description}
                                                    </TitleServiceMain>
                                                    <PriceServiceMain>R$ {item.price.toFixed(2)}</PriceServiceMain>
                                                </BoxTextServiceMain>
                                            </ServiceMain>
                                        </ButtonServiceMain>
                                        ))}
                                    </>
                                )}
                            </>
                        )}


                    </BoxServicesMain>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default Home;
