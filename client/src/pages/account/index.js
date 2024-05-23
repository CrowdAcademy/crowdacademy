// src/pages/AccountPage.js
import React from 'react';
import AccountDetails from '../../components/AccountDetails';
import LeftMainContainer from '../../components/shared/leftmaincontainer';

const Account = () => {
    return (
        <LeftMainContainer>
            <AccountDetails />
        </LeftMainContainer>
    );
};

export default Account;
