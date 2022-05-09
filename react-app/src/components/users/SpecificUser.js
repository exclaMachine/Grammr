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
    <>

      <div className='userName'>
        <strong>{user.username}</strong>
      </div>

    </>
  );
}
export default SpecificUser;
