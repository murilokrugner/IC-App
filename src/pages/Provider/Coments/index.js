import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';

import { Container, Box, BoxComment, UserAvatar, BoxName, Name, Comment, Line, ComentsText } from './styles';

import UserImage from '../../../assets/user.png';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

function Coments() {
    const { dataAuth } = useAuth();
    const [loading, setLoading] = useState(false);

    /*useEffect(() => {

    }, []);*/

  return (
      <Container>
          <Box>
              <BoxComment>
                  <UserAvatar source={UserImage}/>                  
                  <BoxName>
                    <Name>Murilo Krugner</Name>
                    <Comment>
                        <ComentsText>Aqui ficara todos os comentarios, e esse é um comentario de teste</ComentsText>
                    </Comment>
                  </BoxName>                  
              </BoxComment>
              <Line />              
          </Box>
      </Container>
  )
}

export default Coments;