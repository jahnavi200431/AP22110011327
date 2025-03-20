import { useEffect, useState } from "react";

function TopUsers() {
    const [users, setUsers] = useState([]);
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        // Step 1: Authenticate to get token
        fetch("http://20.244.56.144/test/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                companyName: "AFFORDMED",
                clientID: "bafe47dd-72f8-41f4-b970-c7199aa23fc2",
                clientSecret: "jTVXoneTgqiIuHjA",
                ownerName: "JAHNAVI MALLELA",
                ownerEmail: "jahnavi_mallela@srmap.edu.in",
                rollNo: "AP22110011327"
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log("Auth Token:", data.access_token);
            setAuthToken(data.access_token);
        })
        .catch(err => console.error("Error getting auth token:", err));
    }, []);

    useEffect(() => {
        if (!authToken) return;  // Wait until token is available

        // Step 2: Fetch users with the auth token
        fetch("http://20.244.56.144/test/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`, // Attach token here
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log("Users Data:", data);
            setUsers(data);
        })
        .catch(err => console.error("Error fetching users:", err));
    }, [authToken]); // Runs when authToken is updated

    return (
        <div>
            <h1>Top Users</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading users...</p>
            )}
        </div>
    );
}

export default TopUsers;




