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

    const service = route.params;

    const provider = route.params.id.provider;

    const name = route.params.id.name;

    const priceString = service.id.price.toString();
    const price = priceString.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const [loadingPreview, setLoadingPreview] = useState(false);
    const [loadingPreviewCover, setLoadingPreviewCover] = useState(false);
    const [preview, setPreview] = useState('');
    const [previewCover, setPreviewCover] = useState('');
    const [imageCover, setImageCover] = useState();
    const [imagePhoto, setImagePhoto] = useState();

    const [loadingImagesServices, setLoadingImagesServices] = useState(true);
    const [imagesServices, setImagesServices] = useState({});

    const userId = dataAuth.id;

    useEffect(() => {
        if (service.id.provider.cover.url !== null) {
            setImageCover(service.id.provider.cover.url);
        }

        if (service.id.provider.avatar.url !== null) {
            setImagePhoto(service.id.provider.avatar.url);
        }

        async function loadImagesServices() {
            const response = await api.get(`files_services?id=${provider.id}`);

            console.log(response.data);

            setImagesServices(response.data);

            setLoadingImagesServices(false);
        }

        loadImagesServices();
    });

    function handleMaps() {
        navigation.navigate('Maps', { provider, name });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <ScrollView style={{ flex: 1 }}>
                    <Box>
                        <BoxImageCover>
                            {loadingPreviewCover ? (
                                <ActivityIndicator
                                    style={{ marginBottom: 130 }}
                                    color="#000"
                                    size="small"
                                />
                            ) : (
                                <>
                                    {previewCover ? (
                                        <ImageCover source={previewCover} />
                                    ) : (
                                        <ImageCover
                                            source={{
                                                uri:
                                                    imageCover !== undefined
                                                        ? imageCover
                                                        : `https://ui-avatars.com/api/?name=${dataAuth.name}&size=395&background=random&color=000`,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </BoxImageCover>
                        <BoxPhoto>
                            {loadingPreview ? (
                                <ActivityIndicator
                                    style={{ marginTop: 130 }}
                                    color="#000"
                                    size="small"
                                />
                            ) : (
                                <>
                                    {preview ? (
                                        <ImagePhoto source={preview} />
                                    ) : (
                                        <ImagePhoto
                                            source={{
                                                uri:
                                                    imagePhoto !== undefined
                                                        ? imagePhoto
                                                        : `https://ui-avatars.com/api/?name=${dataAuth.name}&size=220&background=random&color=000`,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </BoxPhoto>
                        <BoxName>
                            <Name>{service.id.provider.name}</Name>
                            <Stars source={StarsIcon} />
                        </BoxName>
                    </Box>
                    <TitleService>
                        Serviços de {service.id.service.description}
                    </TitleService>
                    <BoxInformation>
                        <Price>Preço médio: R$ {price}</Price>
                        <Time>Tempo médio: {service.id.time} min</Time>
                    </BoxInformation>
                    <Line />
                    <Images>
                        {loadingImagesServices ? (
                            <ActivityIndicator color="#000" size="small" />
                        ) : (
                            <BoxImages>
                                {imagesServices.map((item) => (
                                    <ImageService source={{ uri: item.url }} />
                                ))}
                            </BoxImages>
                        )}
                    </Images>
                    <BoxButtonMap>
                        <ButtonMap
                            onPress={() => {
                                handleMaps(provider);
                            }}
                        >
                            Ver no mapa
                        </ButtonMap>
                    </BoxButtonMap>
                </ScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default ViewService;
