import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Text,
} from 'react-native';

import {
    Container,
    LoadingLocation,
    BoxFilters,
    BoxLocation,
    Icon,
    Location,
    ButtonFilter,
    TitleButtonFilter,
    BoxPicker,
    Line,
    BoxServices,
    Service,
    ImageService,
    NameService,
    Stars,
    ButtonView,
} from './styles';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { Picker } from '@react-native-community/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ecanador from '../../../assets/encanador.jpg';
import Startss from '../../../assets/starts.png';

import api from '../../../services/api';
import apiServices from '../../../services/api-services';
import apiCity from '../../../services/api-ibge-city';
import apiMicrorregiao from '../../../services/api-ibge-microrregiao';

Geocoder.init('AIzaSyBIuZDy_cKsPTBfD2VG5XNV6Ty_SlsNlwk');

const Services = () => {
    const navigation = useNavigation();

    const route = useRoute();

    const typeService = route.params.type;

    const [latitude, setLatitude] = useState('');
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [loading, setLoading] = useState(true);
    const [longitude, setLongitude] = useState('');
    const [coordinates, setCoordinates] = useState({});
    const [location, setLocation] = useState();
    const [getMessorregiao, setGetMessorregiao] = useState(0);
    const [getMicrorregiao, setGetMicrorregiao] = useState(0);
    const [page, setPage] = useState(5);
    const [count, setCount] = useState(0);

    const [servicesMicrorregiao, setServicesMicrorregiao] = useState({});

    const [order, setOrder] = useState('Ordenar por: ');

    useEffect(() => {
        Geolocation.getCurrentPosition(
            async ({ coords }) => {
                setCoordinates(coords);
                setLatitude(coords.latitude);
                setLongitude(coords.longitude);
            },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const locationSplit = address.split(',');

                const numberIbge = await apiServices.get(
                    `${locationSplit[3].trim()}/json/`
                );

                const Getregiao = await apiCity.get(`${numberIbge.data.ibge}`);

                const microrregiao = Getregiao.data.microrregiao.id;

                const mesorregiao = Getregiao.data.microrregiao.mesorregiao.id;

                setGetMicrorregiao(microrregiao);
                setGetMessorregiao(mesorregiao);

                setLocation(locationSplit[1].split('-')[1]);
                setLoadingLocation(false);

                const responseServices = await api.get(
                    `services-microrregiao?microrregiao=${microrregiao}&description=${typeService}&order${order}`
                );

                setServicesMicrorregiao(responseServices.data);
                setLoading(false);
            },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true, maximumAge: 20000, timeout: 20000 }
        );
    }, []);

    async function loadServices() {
        setLoading(true);
        const responseServices = await api.get(
            `services-microrregiao?microrregiao=${microrregiao}&description=${typeService}&order${order}`
        );

        console.tron.log(responseServices.data);

        setServicesMicrorregiao(responseServices.data);

        setLoading(false);
    }

    useEffect(() => {
        if (order !== 'Ordenar por: ') {

            loadServices();
        }
    }, [order]);

    function handleFilters() {
        navigation.navigate('Filters');
    }

    function handleViewService(id) {
        navigation.navigate('ViewService', { id });
    }

    function handleLoading() {
        if (page >= count) {
            return <Text></Text>;
        } else {
            return (
                <ActivityIndicator
                    style={{ marginBottom: 20 }}
                    size="small"
                    color="#000"
                />
            );
        }
    }

    function loadPage() {
        setPage(page + 5);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <Container>
                    {loadingLocation ? (
                        <LoadingLocation>
                            <ActivityIndicator color="#000" size="small" />
                        </LoadingLocation>
                    ) : (
                        <BoxLocation>
                            <Icon name="map-pin" size={20} />
                            <Location>{location}</Location>
                        </BoxLocation>
                    )}
                  {/**  <BoxFilters>
                        <BoxPicker>
                            <Picker
                                selectedValue={order}
                                style={{
                                    height: 20,
                                    width: 158,
                                    color: '#235A5C',
                                }}
                                onValueChange={(itemValue, itemIndex) =>
                                    setOrder(itemValue)
                                }
                            >
                                <Picker.Item
                                    key={'Ordenar por: '}
                                    label={'Ordenar por: '}
                                    value={'Ordenar por: '}
                                />
                                <Picker.Item
                                    key={'Nome'}
                                    label={'Nome'}
                                    value={'Nome'}
                                />
                                <Picker.Item
                                    key={'Avaliação'}
                                    label={'Avaliação'}
                                    value={'Avaliação'}
                                />
                                <Picker.Item
                                    key={'Preço'}
                                    label={'Preço'}
                                    value={'Preço'}
                                />
                            </Picker>
                        </BoxPicker>
                        <ButtonFilter onPress={handleFilters}>
                            <TitleButtonFilter>Filtros</TitleButtonFilter>
                        </ButtonFilter>
                    </BoxFilters>
                     */}
                    <Line />
                    <BoxServices>
                        {loading ? (
                            <ActivityIndicator color="#000" size="small" />
                        ) : (
                            <SafeAreaView>
                                <FlatList
                                    ListFooterComponent={handleLoading}
                                    onEndReached={loadPage}
                                    onEndReachedThreshold={0.01}
                                    data={servicesMicrorregiao}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        flexDirection: 'column',
                                    }}
                                    renderItem={({ item }) => (
                                        <Service>
                                            <ImageService
                                                source={{
                                                    uri: item.provider.avatar
                                                        ? item.provider.avatar
                                                              .url
                                                        : `https://ui-avatars.com/api/?name=${item.provider.name}&size=395&background=random&color=000`,
                                                }}
                                            />
                                            <NameService>
                                                {item.provider.name}
                                            </NameService>
                                           {/**  <Stars source={Startss} />*/}
                                            <ButtonView
                                                onPress={() => {
                                                    handleViewService(item.provider.id);
                                                }}
                                            >
                                                Ver
                                            </ButtonView>
                                        </Service>
                                    )}
                                    keyExtractor={(item) => item.id}
                                />
                            </SafeAreaView>
                        )}
                    </BoxServices>
                </Container>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Services;
