import React, { useState, useEffect } from 'react';

function SpecificUser({id}) {
  const [user, setUser] = useState({});
//   const { userId }  = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [id]);

  if (!user) {
    return null;
  }


  return (
    <ul>
      {/* <li>
        <strong>User Id</strong> {id}
      </li> */}
      <li>
        <strong>Username</strong> {user.username}
      </li>
      {/* <li>
        <strong>Email</strong> {user.email}
      </li> */}
    </ul>
  );
}
export default SpecificUser;
