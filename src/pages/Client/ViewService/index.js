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

    const image = route.params.image;

    const [loadingPreview, setLoadingPreview] = useState(false);
    const [loadingPreviewCover, setLoadingPreviewCover] = useState(false);
    const [preview, setPreview] = useState('');
    const [previewCover, setPreviewCover] = useState('');
    const [imageCover, setImageCover] = useState();
    const [imagePhoto, setImagePhoto] = useState();

    const [loadingImagesServices, setLoadingImagesServices] = useState(true);
    const [imagesServices, setImagesServices] = useState({});

    const userId = dataAuth.id;

    const [providerData, setProviderData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [coverUrl, setCoverUrl] = useState();

    useEffect(() => {
        async function loadProvider() {
            const response = await api.get(`/serviceProvider?provider=${id}`);

            const responseCover = await api.get(`getImages?id=${id}`);

            setProviderData(response.data);
            setCoverUrl(responseCover.data.user.cover.url);

            setLoadingData(false);
        }

        async function loadImagesServices() {
            const response = await api.get(`files_services?id=${id}`);

            setImagesServices(response.data);

            setLoadingImagesServices(false);
        }

      loadImagesServices();
      loadProvider();
    }, []);

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
                                                coverUrl !== undefined
                                                        ? coverUrl
                                                        : `https://ui-avatars.com/api/?name=${'service.id.provider.name'}&size=395&background=random&color=000`,
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
                                                image !== undefined
                                                        ? image
                                                        : `https://ui-avatars.com/api/?name=${'service.id.provider.name'}&size=220&background=random&color=000`,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </BoxPhoto>
                        </Box>
                        {!loadingData && (
                            <>
                                <BoxName>
                            <Name>{name}</Name>
                            <Stars source={StarsIcon} />
                        </BoxName>

                    <TitleService>
                        Serviços de {providerData[0].service.description}
                    </TitleService>
                    <BoxInformation>
                        <Price>Preço médio: R$ {providerData[0].price} reais</Price>
                        <Time>Tempo médio: {providerData[0].time} min</Time>
                    </BoxInformation>
                            </>
                        )}

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
                </ScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default ViewService;
