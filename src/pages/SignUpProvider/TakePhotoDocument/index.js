import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import { Container } from './styles';

import { RNCamera } from 'react-native-camera';

const TakePhotoDocument = () => {
    let [flash, setFlash] = useState('off');
    let [zoom, setZoom] = useState(0);
    let cameraRef = useRef(null);

    function toggleFlash() {
        setFlash(flashModeOrder[flash]);
    }

    function zoomOut() {
        setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1);
    }
    function zoomIn() {
        setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
    }

    async function takePicture() {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.takePictureAsync(options);
            console.log(data.uri);
        }
    }

    return (
        <View style={styles.container}>
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
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity onPress={takePicture} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> TIRAR </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.teste}>
                <Text style={{ color: '#fff' }}>TESTE</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    teste: {},
});

export default TakePhotoDocument;
