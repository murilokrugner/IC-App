import React, { useState, useRef } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import {
    Container,
    Preview,
    Capture,
    BoxButtons,
    ImageCapture,
    Flash,
    ImageFlash,
    BoxCapture,
    BoxFlash,
    Box,
    TextBox,
    BoxLoading,
    ContainerTypeCamera,
    ButtonTypeCamera,
    IconTypeCamera
} from './styles';

import { RNCamera } from 'react-native-camera';

import CameraIcon from '../../../assets/camera2.png';
import FlashIcon from '../../../assets/flash.png';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import ImagePicker from 'react-native-image-picker';

import typeCameraIcon from '../../../assets/typeCamera.png';

const TakeYourPhoto = () => {
    const { dataAuth } = useAuth();
    const navigation = useNavigation();

    let [flash, setFlash] = useState('off');
    let cameraRef = useRef(null);

    const userId = dataAuth.id;

    const [loading, setLoading] = useState(false);
    const [cameraType, setCameraType] = useState('back');

    function toggleFlash() {
        //setFlash(flashModeOrder[flash]);
        if (flash === 'off') {
            setFlash('on');
        } else {
            setFlash('off');
        }
    }

    async function takePicture() {
        setLoading(true);
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.takePictureAsync(options);

            const uri = `data:image/jpeg;base64,${data.base64}`;

            let prefix;
            let ext;

            const name = data.uri.split('/');

            console.log(name);

            if (data.fileName) {
                [prefix, ext] = name[9];
                ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
            } else {
                prefix = new Date().getTime();
                ext = 'jpg';
            }

            const imageData = {
                uri: data.uri,
                type: 'jpg/jpge',
                name: `${prefix}.${ext}`,
            };

            const image = new FormData();

            image.append('file', imageData);

            navigation.navigate('VerifyDocumentYour', { uri, image });

            setLoading(false);
        }
    }

    function handleTypeCamera() {
        if (cameraType === 'back') {
            setCameraType('front');
        } else {
            setCameraType('back');
        }
    }

    return (
        <Container>
            <RNCamera
                ref={(ref) => {
                    cameraRef = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={flash}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                type={cameraType}
            />
            <Box>
                <TextBox>Sua foto com o documento</TextBox>
            </Box>
            <BoxButtons>
                {loading ? (
                    <BoxLoading>
                        <ActivityIndicator color="#fff" size="large" />
                    </BoxLoading>
                ) : (
                    <BoxCapture>
                        <Capture onPress={takePicture}>
                            <ImageCapture source={CameraIcon} />
                        </Capture>
                    </BoxCapture>
                )}

                {!loading && (
                    <ContainerTypeCamera>
                        <ButtonTypeCamera onPress={handleTypeCamera}>
                            <IconTypeCamera source={typeCameraIcon} />
                        </ButtonTypeCamera>
                    </ContainerTypeCamera>
                )}
            </BoxButtons>


        </Container>
    );
};

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default TakeYourPhoto;
