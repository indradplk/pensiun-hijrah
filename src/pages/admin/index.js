import React from 'react';
import { Helmet } from 'react-helmet';
import SignInAdmin from '../../components/Admin/Login';

const SignInPageAdmin = () => {
  return (
    <>
      <Helmet>
        <title>Login Admin | DPLK Syariah Muamalat</title>
      </Helmet>
      <SignInAdmin />
    </>
  );
};

export default SignInPageAdmin;
