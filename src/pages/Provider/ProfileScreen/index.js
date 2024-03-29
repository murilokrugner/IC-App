import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Alert,
    Text,
} from 'react-native';

import {
    Container,
    BoxLoading,
    Box,
    BoxImageCover,
    ImageCover,
    BoxPositionSelectPhoto,
    BoxImageSelectPhoto,
    BoxSelectPhoto,
    SelectPhoto,
    BoxPhoto,
    ImagePhoto,
    BoxName,
    Name,
    BoxStars,
    ImageStar,
    ButtonNext,
    BoxTextServices,
    TextServices,
    BoxContainerServices,
    BoxButtonAdd,
    ButtonAdd,
    BoxServices,
    BoxContainerService,
    BoxService,
    Service,
    NameService,
    ButtonEdit,
    ImageEdit,
    BoxButtonExit,
    ButtonExit,
    BoxMenu,
    BoxOption,
    BoxSelect,
    TitleOption,
    Icon,
    Line,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import ImagePicker from 'react-native-image-picker';
import { useAuth } from '../../../hooks/auth';
import { withNavigationFocus } from '@react-navigation/compat';
import Camera from '../../../assets/camera.png';
import Stars from '../../../assets/starts.png';
import api from '../../../services/api';

function ProfileScreen({ isFocused }) {
    const { dataAuth, signOut } = useAuth();
    const navigation = useNavigation();

    function handleNext() {
        navigation.navigate('AddTypesServices');
    }

    const [loadingPreview, setLoadingPreview] = useState(false);
    const [loadingPreviewCover, setLoadingPreviewCover] = useState(false);
    const [preview, setPreview] = useState('');
    const [previewCover, setPreviewCover] = useState('');
    const [imageCover, setImageCover] = useState();
    const [imagePhoto, setImagePhoto] = useState();

    const userId = dataAuth.id;
    const user = dataAuth;

    useEffect(() => {
        async function loadImages() {
            setLoadingPreview(true);
            setLoadingPreviewCover(true);

            const response = await api.get(`getImages?id=${userId}`);

            if (response.data.user.avatar === null) {
                setImagePhoto();
                setLoadingPreview(false);
                setLoadingPreviewCover(false);
            } else {
                setImagePhoto(response.data.user.avatar.url);
                setLoadingPreview(false);
                setLoadingPreviewCover(false);
            }

            if (response.data.user.cover === null) {
                setImageCover();
                setLoadingPreview(false);
                setLoadingPreviewCover(false);
            } else {
                setImageCover(response.data.user.cover.url);
                setLoadingPreview(false);
                setLoadingPreviewCover(false);
            }
        }

        loadImages();
    }, []);

    useEffect(() => {
        if (isFocused) {
            async function loadServices() {
                setLoadingService(true);
                const response = await api.get(
                    `/serviceProvider?provider=${dataAuth.id}`
                );

                setData(response.data);
                setLoadingService(false);
            }

            loadServices();
        }
    }, [isFocused]);

    function handleUpCover() {
        setLoadingPreviewCover(true);
        ImagePicker.showImagePicker(
            {
                title: 'Selecionar imagem',
                cancelButtonTitle: 'cancelar',
                mediaType: 'photo',
                takePhotoButtonTitle: 'Tirar uma foto',
                chooseWhichLibraryTitle: 'Selecionar imagem',
                chooseFromLibraryButtonTitle: 'Selecionar',
                //maxWidth: 220,
                //maxHeight: 220,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            },
            (upload) => {
                if (upload.didCancel) {
                    setLoadingPreviewCover(false);
                    setPreviewCover();
                }

                if (upload.uri) {
                    const previewData = {
                        uri: `data:image/jpeg;base64,${upload.data}`,
                    };

                    let prefix;
                    let ext;

                    if (upload.fileName) {
                        [prefix, ext] = upload.fileName.split('.');
                        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
                    } else {
                        prefix = new Date().getTime();
                        ext = 'jpg';
                    }

                    const imageData = {
                        uri: upload.uri,
                        type: upload.type,
                        name: `${prefix}.${ext}`,
                    };

                    const data = new FormData();

                    data.append('file', imageData);

                    setPreviewCover(previewData);
                    handleUploadCover(data);
                }
            }
        );
    }

    async function handleUploadCover(data) {
        Alert.alert(
            'Atualizar imagem de perfil',
            'Deseja alterar a imagem de perfil com a imagem selecionada?',
            [
                {
                    text: 'Não',
                    onPress: () => {
                        setPreviewCover();
                        setLoadingPreviewCover(false);
                        return;
                    },
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        setLoadingPreviewCover(true);
                        try {
                            async function loadImages() {
                                const response = await api.get(
                                    `getImages?id=${userId}`
                                );

                                setImagePhoto(response.data.user.cover.url);

                                setLoadingPreviewCover(false);
                            }

                            const response = await api.post(
                                `files_cover?id=${userId}`,
                                data,
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                }
                            );

                            loadImages();
                        } catch (error) {
                            setLoadingPreviewCover(false);
                            setPreviewCover();
                        }
                    },
                },
            ]
        );

        setLoadingPreviewCover(false);
    }

    function handleUpImage() {
        setLoadingPreview(true);

        ImagePicker.showImagePicker(
            {
                title: 'Selecionar imagem',
                cancelButtonTitle: 'cancelar',
                mediaType: 'photo',
                takePhotoButtonTitle: 'Tirar uma foto',
                chooseWhichLibraryTitle: 'Selecionar imagem',
                chooseFromLibraryButtonTitle: 'Selecionar',
                // maxWidth: 220,
                // maxHeight: 220,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            },
            (upload) => {
                if (upload.didCancel) {
                    setLoadingPreview(false);
                    setPreview();
                }

                if (upload.uri) {
                    const previewData = {
                        uri: `data:image/jpeg;base64,${upload.data}`,
                    };

                    let prefix;
                    let ext;

                    if (upload.fileName) {
                        [prefix, ext] = upload.fileName.split('.');
                        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
                    } else {
                        prefix = new Date().getTime();
                        ext = 'jpg';
                    }

                    const imageData = {
                        uri: upload.uri,
                        type: upload.type,
                        name: `${prefix}.${ext}`,
                    };

                    const data = new FormData();

                    data.append('file', imageData);

                    setPreview(previewData);
                    handleUploadPhoto(data);
                }
            }
        );
    }

    async function handleUploadPhoto(data) {
        Alert.alert(
            'Atualizar imagem de perfil',
            'Deseja alterar a imagem de perfil com a imagem selecionada?',
            [
                {
                    text: 'Não',
                    onPress: () => {
                        setPreview();
                        setLoadingPreview(false);
                        return;
                    },
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        setLoadingPreview(true);
                        try {
                            async function loadImages() {
                                const response = await api.get(
                                    `getImages?id=${userId}`
                                );

                                setImagePhoto(response.data.user.avatar.url);

                                setLoadingPreview(false);
                            }

                            const response = await api.post(
                                `files?id=${userId}`,
                                data,
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                }
                            );

                            loadImages();
                        } catch (error) {
                            setLoadingPreview(false);
                            setPreview();
                        }
                    },
                },
            ]
        );

        setLoadingPreview(false);
    }

    function handleProviderData() {
        navigation.navigate('ProviderData');
    }

    function handleServices() {
        navigation.navigate('ProviderServices');
    }

    async function handleExit() {
        signOut();
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <Container>
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
                                                        : `https://ui-avatars.com/api/?name=${user.name}&size=220&background=random&color=000`,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                            <BoxPositionSelectPhoto
                                style={{ width: 390, height: 260 }}
                            >
                                <BoxSelectPhoto onPress={handleUpCover}>
                                    <BoxImageSelectPhoto>
                                        <SelectPhoto source={Camera} />
                                    </BoxImageSelectPhoto>
                                </BoxSelectPhoto>
                            </BoxPositionSelectPhoto>
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
                                                        : `https://ui-avatars.com/api/?name=${user.name}&size=220&background=random&color=000`,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                            <BoxPositionSelectPhoto>
                                <BoxSelectPhoto onPress={handleUpImage}>
                                    <BoxImageSelectPhoto>
                                        <SelectPhoto source={Camera} />
                                    </BoxImageSelectPhoto>
                                </BoxSelectPhoto>
                            </BoxPositionSelectPhoto>
                        </BoxPhoto>
                    </Box>
                    <BoxName>
                        <Name>{dataAuth.name}</Name>
                    </BoxName>
                    <BoxStars>
                        <ImageStar source={Stars} />
                    </BoxStars>
                    <BoxMenu>
                        <BoxOption onPress={handleProviderData}>
                            <BoxSelect>
                                <TitleOption>Meus dados</TitleOption>
                                <Icon
                                    name={'edit-2'}
                                    size={20}
                                    color="#666360"
                                />
                            </BoxSelect>
                        </BoxOption>
                        <Line />
                        <BoxOption onPress={handleServices}>
                            <BoxSelect>
                                <TitleOption>Serviços</TitleOption>
                                <Icon name={'grid'} size={20} color="#666360" />
                            </BoxSelect>
                        </BoxOption>
                        <Line />
                     {/**   <BoxOption>
                            <BoxSelect>
                                <TitleOption>Minhas avaliações</TitleOption>
                                <Icon name={'star'} size={20} color="#666360" />
                            </BoxSelect>
                        </BoxOption>
                        <Line />*/}
                        <BoxOption onPress={handleExit}>
                            <BoxSelect>
                                <TitleOption>Sair</TitleOption>
                                <Icon
                                    name={'log-out'}
                                    size={20}
                                    color="#666360"
                                />
                            </BoxSelect>
                        </BoxOption>
                        <Line />
                    </BoxMenu>
                </Container>
            </ScrollView>
        </SafeAreaView>
    );
}

export default withNavigationFocus(ProfileScreen);
