import React, { useEffect, useState } from "react";

const Feed = () => {
    const [posts, setPosts] = useState([]);

    const fetchFeed = async () => {
        try {
            const response = await fetch("http://localhost:5000/test/posts");
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error("Error fetching feed:", error);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        <div>
            <h2>Feed</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Feed;

