import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { Container } from './styles';


import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


import ProfileScreen from '../ProfileScreen';
import Coments from '../Coments';


const ProfileRoute = () => (
    <ProfileScreen />
  );
  const ComentsRoute = () => (
    <Coments />
  );

  const initialLayout = { width: Dimensions.get('window').width };

function Profile(props) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'profile', title: 'Perfil' },
        { key: 'coments', title: 'Comentários' },
    ]);

    const renderScene = SceneMap({
        profile: ProfileRoute,
        coments: ComentsRoute,
    });

    const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'blue' }}          
          style={{ backgroundColor: 'white' }}
          labelStyle={{
            color: "#000"
          }}
        />
      );   
    
  return (
    <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}    
        renderTabBar={renderTabBar}
    />
  )
}

const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
  });

export default Profile;