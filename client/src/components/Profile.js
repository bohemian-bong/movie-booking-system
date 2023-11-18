import React, { useEffect } from 'react'

const Profile = (props) => {
    useEffect(()=>{
        const userDetails = async ()=>{
            const response = await fetch("http://localhost:5000/api/v1/users/showMe", {
                method: "GET",
                headers: {
                    credentials: 'include'
                },
            });
            const json = await response.json();
            console.log(json)
        }
        userDetails();
    },[])
  return (
    <div className='container mt-4'>
      <h3>Welcome </h3>

    </div>
  )
}

export default Profile
