import React, { useState, useEffect, Fragment } from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import Search from './Search';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Directions from './Directions';
import Geolocation from '@react-native-community/geolocation';
import Details from './Details';
import Button from '../../../components/ButtonAuth';

import {
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall,
    Back,
} from './styles';

import markerImage from '../../../assets/marker.png';
import backImage from '../../../assets/back.png';

import { useNavigation, useRoute } from '@react-navigation/native';

import { getPixelSize } from '../../../util/utils';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        flex: 1,
        backgroundColor: '#235A5C',
        alignItems: 'center',
        justifyContent: 'center',
    },

    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
});

Geocoder.init('AIzaSyBIuZDy_cKsPTBfD2VG5XNV6Ty_SlsNlwk');

function Maps() {
    const navigation = useNavigation();

    const route = useRoute();

    const provider = route.params.provider;
    const name = route.params.name;

    const [loading, setLoading] = useState(true);
    const [coordinates, setCoordinates] = useState({});
    const [destination, setDestination] = useState(null);
    const [mapView, setMapView] = useState();
    const [duration, setDuration] = useState();
    const [location, setLocation] = useState();

    useEffect(() => {
        Geolocation.getCurrentPosition(
            async ({ coords }) => {
                setCoordinates(coords);
            },
            (error) => {
                console.log('Map' + error);
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));

                setLocation(location);
                setLoading(false);
            },
            (error) => {
                console.log('Map' + error);
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );

        const latitude = parseFloat(provider.location_x);
        const longitude = parseFloat(provider.location_y);
        const title = name;

        setDestination({ latitude, longitude, title });
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#FFF" />
            ) : (
                <>
                    <MapView
                        initialRegion={{
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                            latitudeDelta: 0.0068,
                            longitudeDelta: 0.0068,
                        }}
                        style={styles.map}
                        showsUserLocation
                        ref={(el) => setMapView(el)}
                        loadingEnabled
                    >
                        {destination && (
                            <Fragment>
                                <Directions
                                    origin={coordinates}
                                    destination={destination}
                                    onReady={(result) => {
                                        setDuration(
                                            Math.floor(result.duration)
                                        ),
                                            mapView.fitToCoordinates(
                                                result.coordinates,
                                                {
                                                    edgePadding: {
                                                        right: getPixelSize(50),
                                                        left: getPixelSize(50),
                                                        top: getPixelSize(50),
                                                        bottom: getPixelSize(
                                                            350
                                                        ),
                                                    },
                                                }
                                            );
                                    }}
                                />
                                <Marker
                                    coordinate={destination}
                                    anchor={{ x: 0, y: 0 }}
                                    image={markerImage}
                                >
                                    <LocationBox>
                                        <LocationText>
                                            {destination.title}
                                        </LocationText>
                                    </LocationBox>
                                </Marker>
                                <Marker
                                    coordinate={coordinates}
                                    anchor={{ x: 0, y: 0 }}
                                >
                                    <LocationBox>
                                        <LocationTimeBox>
                                            <LocationTimeText>
                                                {duration}
                                            </LocationTimeText>
                                            <LocationTimeTextSmall>
                                                MIN
                                            </LocationTimeTextSmall>
                                        </LocationTimeBox>
                                        <LocationText>{location}</LocationText>
                                    </LocationBox>
                                </Marker>
                            </Fragment>
                        )}
                    </MapView>
                </>
            )}
        </View>
    );
}

export default Maps;
