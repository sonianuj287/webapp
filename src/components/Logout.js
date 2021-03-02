import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '860148619906-m9gupeh8hpvrifhpgkiivlqc0a9antco.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
