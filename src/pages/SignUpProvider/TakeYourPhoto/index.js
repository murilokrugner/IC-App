import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

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
} from './styles';

import { RNCamera } from 'react-native-camera';

import CameraIcon from '../../../assets/camera2.png';
import FlashIcon from '../../../assets/flash.png';

const TakeYourPhoto = () => {
    let [flash, setFlash] = useState('off');
    let [zoom, setZoom] = useState(0);
    let cameraRef = useRef(null);

    function toggleFlash() {
        setFlash(flashModeOrder[flash]);
    }

    async function takePicture() {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.takePictureAsync(options);
            console.log(data.uri);
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
            />
            <Box>
                <TextBox>Sua foto com o documento</TextBox>
            </Box>
            <BoxButtons>
                <BoxCapture>
                    <Capture onPress={takePicture}>
                        <ImageCapture source={CameraIcon} />
                    </Capture>
                </BoxCapture>
                <BoxFlash>
                    <Flash onPress={toggleFlash}>
                        <ImageFlash source={FlashIcon} />
                    </Flash>
                </BoxFlash>
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
