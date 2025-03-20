import { useEffect, useState } from "react";

const TrendingPosts = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        const fetchTrendingPosts = async () => {
            try {
                // Fetch all posts first
                const postsResponse = await fetch("http://20.244.56.144/test/posts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "clientID": process.env.REACT_APP_CLIENT_ID,
                        "clientSecret": process.env.REACT_APP_CLIENT_SECRET,
                    },
                });
                const postsData = await postsResponse.json();

                if (!postsData.posts || postsData.posts.length === 0) return;

                // Fetch comments for each post
                const commentsCountMap = {};
                for (const post of postsData.posts) {
                    const commentsResponse = await fetch(`http://20.244.56.144/test/posts/${post.id}/comments`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "clientID": process.env.REACT_APP_CLIENT_ID,
                            "clientSecret": process.env.REACT_APP_CLIENT_SECRET,
                        },
                    });

                    const commentsData = await commentsResponse.json();
                    commentsCountMap[post.id] = commentsData.comments.length;
                }

                // Find posts with the maximum comment count
                const maxComments = Math.max(...Object.values(commentsCountMap));
                const trending = postsData.posts.filter(post => commentsCountMap[post.id] === maxComments);

                setTrendingPosts(trending);
            } catch (error) {
                console.error("Error fetching trending posts:", error);
            }
        };

        fetchTrendingPosts();
    }, []);

    return (
        <div>
            <h2>Trending Posts</h2>
            <ul>
                {trendingPosts.map(post => (
                    <li key={post.id}>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingPosts;
