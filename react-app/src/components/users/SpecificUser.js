import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


function SpecificUser({id}) {
  const [user, setUser] = useState({});

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
    <>

      <div className='userName'>
        <NavLink to={`/pictures/user/${id}`} exact={true}>
          {user.username}
        </NavLink>
      </div>

    </>
  );
}
export default SpecificUser;
