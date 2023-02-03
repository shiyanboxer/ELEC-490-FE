// ----------------------------------------------------------------------
import { useContext, useState, useEffect } from 'react'
import UserContext from '../components/response/UserContext'

const Account = () => {
  const [userResponse, setUserResponse] = useState({});

  useEffect(() => {
    // fetch('http://127.0.0.1:5000/user')
    fetch('https://elec49x.herokuapp.com/user')
      .then(response => response.json())
      .then(data => {
        setUserResponse(data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []); // the empty array is to make sure the request only runs on page load
    // eslint-disable-next-line dot-notation
    const firstName = userResponse['first_name'];
    // eslint-disable-next-line dot-notation
    const lastName = userResponse['last_name'];

    const accountData = {
      firstName: `${firstName}`,
      displayName: `${firstName} ${lastName}`,
      email: `${firstName}${lastName}@gmail.com`.toLowerCase(),
      photoURL: '/assets/images/avatars/avatar_default.jpg',
      // eslint-disable-next-line dot-notation
      recommendation: userResponse['recommendation'],
      // eslint-disable-next-line dot-notation
      recovery: userResponse['recovery'],
      // eslint-disable-next-line dot-notation
      heart_rate: userResponse['heart_rate'],
      // eslint-disable-next-line dot-notation
      weekly_training: userResponse['weekly_training'],
    };
    return accountData;
}

export default Account;