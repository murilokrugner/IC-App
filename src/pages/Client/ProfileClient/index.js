import React from 'react';
import {Container, BoxMenu} from './styles';
import { useAuth } from '../../../hooks/auth';

import Profile from '../../../components/Profile';

function ProfileClient() {
    const { signOut } = useAuth();


    async function handleExit() {
        signOut();
    }

    return(
        <Container>
            <Profile />
            <BoxMenu>
                
            </BoxMenu>
        </Container>
    )
}

export default ProfileClient;