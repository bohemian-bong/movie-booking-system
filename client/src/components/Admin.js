import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/users", {
          method: "GET",
          credentials: "include"
        });
        const json = await response.json();
        setAllUsers(json.users);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    // Call getAllUsers only once when the component mounts
    getAllUsers();
  }, []); // Empty dependency array means this effect runs once after mount

  return (
    <div>
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-5">
            <div className="card-body">
            <div className="mt-4">
                <h5 className="card-title">All Users ({allUsers.length})</h5>
                {allUsers.length > 0 ? (
                  <ul className="list-group">
                    {allUsers.map((user, index) => (
                      <li key={index} className="list-group-item">
                        <strong>Name: </strong>{user.name}<strong> Email: </strong>{user.email}<strong> UserId: </strong>{user._id}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews available.</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Admin;

