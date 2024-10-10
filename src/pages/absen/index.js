import React from 'react';
import { Helmet } from 'react-helmet';
import SignInAbsen from '../../components/Absen/Login';

const SignInPageAbsen = () => {
  return (
    <>
      <Helmet>
        <title>Absen | DPLK Syariah Muamalat</title>
      </Helmet>
      <SignInAbsen />
    </>
  );
};

export default SignInPageAbsen;
