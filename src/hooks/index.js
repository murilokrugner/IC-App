import React from 'react';

import { AuthUser } from './auth';

function AppUser({ children }) {
    return(
        <AuthUser>
            {children}
        </AuthUser>
    )
}

export default AppUser;