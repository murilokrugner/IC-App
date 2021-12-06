import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Alert,
} from 'react-native';

import {
    Container,
    Box,
    BoxImageCover,
    ImageCover,
    BoxPhoto,
    Line,
    ImagePhoto,
    BoxName,
    Stars,
    Name,
    TitleService,
    BoxInformation,
    Price,
    Time,
    Images,
    BoxImages,
    ImageService,
    BoxButtonMap,
    ButtonMap,
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';

import StarsIcon from '../../../assets/starts.png';
import EncanadorIcon from '../../../assets/encanador.jpg';

const ViewService = () => {
    const { dataAuth } = useAuth();
    const navigation = useNavigation();

    const route = useRoute();

    const id = route.params.id;

    const name = route.params.name;

    const [loadingPreview, setLoadingPreview] = useState(false);
    const [image, setImage] = useState(null);
    const [loadingImagesServices, setLoadingImagesServices] = useState(false);
    const [imagesServices, setImagesServices] = useState(null);


    const [providerData, setProviderData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [coverUrl, setCoverUrl] = useState(null);

    async function loadProvider() {
        const response = await api.get(`serviceProvider?provider=${id}`);

        const responseCover = await api.get(`getImages?id=${id}`);

        if (response.data.length !== 0) {
            setProviderData(response.data);
        }

        if (responseCover.data.user.avatar) {
            setImage(responseCover.data.user.avatar.url)
        }

        if (responseCover.data.user.cover) {
            setCoverUrl(responseCover.data.user.cover.url);
        }

        setLoadingData(false);
    }

    async function loadImagesServices() {
        const response = await api.get(`files_services?id=${id}`);

        if (response.data.length !== 0) {
            setImagesServices(response.data);
        }

        setLoadingImagesServices(false);
    }

    useEffect(() => {
    //  loadImagesServices();
      loadProvider();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <ScrollView style={{ flex: 1 }}>
                        {!loadingData && (
                            <>
                            <Box>
                        <BoxImageCover>
                            <ImageCover
                                source={{
                                    uri:
                                    coverUrl !== null
                                            ? coverUrl
                                            : `https://ui-avatars.com/api/?name=${providerData[0].provider.name}&size=395&background=random&color=000`,
                                }}
                            />
                        </BoxImageCover>
                        <BoxPhoto>
                            <ImagePhoto
                                source={{
                                    uri: image !== null
                                            ? image
                                            : `https://ui-avatars.com/api/?name=${providerData[0].provider.name}&size=220&background=random&color=000`,
                                   }}
                                 />

                        </BoxPhoto>
                        </Box>
                        <BoxName>
                            <Name>{name ? name : providerData[0].provider.name}</Name>
                            <Stars source={StarsIcon} />
                        </BoxName>

                    <TitleService>
                        Serviços de {providerData[0].service.description}
                    </TitleService>
                    <BoxInformation>
                        <Price>Preço médio: R$ {providerData[0].price} reais</Price>
                        <Time>Tempo médio: {providerData[0].time} hora(s)</Time>
                        <Time>Telefone: {providerData[0].provider.phone} </Time>
                        <Time>Celular: {providerData[0].provider.mobile_phone} </Time>
                        <Time>E-mail: {providerData[0].provider.email} </Time>
                        <Time>Endereço: {providerData[0].provider.address + ' ' + providerData[0].provider.number_address} </Time>
                        <Time>Bairro: {providerData[0].provider.neighborhood_address} </Time>
                        <Time>CEP: {providerData[0].provider.cep_address} </Time>
                        <Time>Cidade: {providerData[0].provider.city + ' ' + providerData[0].provider.state_address} </Time>
                    </BoxInformation>
                            </>
                        )}

                    <Line />
                    {/**
                     *
                     * <Images>
                        {loadingImagesServices ? (
                            <ActivityIndicator color="#000" size="small" />
                        ) : (
                            <>
                                {imagesServices !== null || imagesServices !== undefined && (
                                    <BoxImages>
                                        {imagesServices.map((item) => (
                                            <ImageService source={{ uri: item.url }} />
                                        ))}
                                    </BoxImages>
                                )}
                            </>
                        )}
                    </Images>
                     *
                     *
                     */}
                </ScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default ViewService;
