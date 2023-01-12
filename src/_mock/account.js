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
        console.log(data);
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
      email: `${firstName}${lastName}@gmail.com`,
      photoURL: '/assets/images/avatars/avatar_default.jpg',
    };
    return accountData;
}

export default Account;