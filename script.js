async function fetchUserProfiles() { // Simulate fetching user profiles
    try {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.25) { // 25% chance of failure
                    reject(new Error("Failed to fetch user profiles."));
                } else {
                    const users = [
                        { id: 1, name: "Krishna" },
                        { id: 2, name: "Zairi" },
                        { id: 3, name: "Beth" }
                    ];
                    resolve(users);
                }
            }, 2000); // Simulates 2 seconds delay
        });
    } catch (error) {
        throw error;
    }
}


async function fetchPosts() { // Simulate fetching posts
    try {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.25) { // 25% chance of failure
                    reject(new Error("Failed to fetch posts."));
                } else {
                    const posts = [
                        { id: 1, userId: 1, title: "Post #1" },
                        { id: 2, userId: 2, title: "Post #2" },
                        { id: 3, userId: 3, title: "Post #3" }
                    ];
                    resolve(posts);
                }
            }, 2000); // Simulates 2 seconds delay
        });
    } catch (error) {
        throw error;
    }
}


async function fetchComments() { // Simulate fetching comments
    try {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.25) { // 25% chance of failure
                    reject(new Error("Failed to fetch comments."));
                } else {
                    const comments = [
                        { id: 1, postId: 1, content: "Amazing post!" },
                        { id: 2, postId: 2, content: "Very detailed, good work!" },
                        { id: 3, postId: 3, content: "Keep it up!" }
                    ];
                    resolve(comments);
                }
            }, 2000); // Simulates 2 seconds delay
        });
    } catch (error) {
        throw error;
    }
}


async function fetchSequentially() { // Fetch data sequentially
    try {
        console.log("Fetching data sequentially...");

        try {
            const users = await fetchUserProfiles();
            console.log("User Profiles:");
            users.forEach(user => {
                console.log(`ID: ${user.id}, Name: ${user.name}`);
            });
        } catch (error) {
            console.error(error.message);
        }

        try {
            const posts = await fetchPosts();
            console.log("\nPosts:");
            posts.forEach(post => {
                console.log(`UserID: ${post.userId}, Title: "${post.title}"`);
            });
        } catch (error) {
            console.error(error.message);
        }

        try {
            const comments = await fetchComments();
            console.log("\nComments:");
            comments.forEach(comment => {
                console.log(`PostID: ${comment.postId}, Content: "${comment.content}"`);
            });
        } catch (error) {
            console.error(error.message);
        }

    } catch (error) {
        console.error("Error fetching data sequentially:", error.message);
    }
}


async function fetchInParallel() { // Fetch data in parallel
    try {
        console.log("Fetching data in parallel...");

        const [users, posts, comments] = await Promise.allSettled([
            fetchUserProfiles(),
            fetchPosts(),
            fetchComments()
        ]);

        console.log("User Profiles:");
        if (users.status === "fulfilled") {
            users.value.forEach(user => {
                console.log(`ID: ${user.id}, Name: ${user.name}`);
            });
        } else {
            console.error(users.reason.message);
        }

        console.log("\nPosts:");
        if (posts.status === "fulfilled") {
            posts.value.forEach(post => {
                console.log(`UserID: ${post.userId}, Title: "${post.title}"`);
            });
        } else {
            console.error(posts.reason.message);
        }

        console.log("\nComments:");
        if (comments.status === "fulfilled") {
            comments.value.forEach(comment => {
                console.log(`PostID: ${comment.postId}, Content: "${comment.content}"`);
            });
        } else {
            console.error(comments.reason.message);
        }

    } catch (error) {
        console.error("Error fetching data in parallel:", error.message);
    }
}

async function getUserContent() {
    try {
        console.log("Starting to fetch user content...");

        const users = await fetchUserProfiles();
        console.log("User profiles retrieved:");
        users.forEach(user => {
            console.log(`ID: ${user.id}, Name: ${user.name}`);
        });

        const posts = await fetchPosts();
        console.log("\nPosts retrieved:");
        posts.forEach(post => {
            console.log(`UserID: ${post.userId}, Title: "${post.title}"`);
        });

        const comments = await fetchComments();
        console.log("\nComments retrieved:");
        comments.forEach(comment => {
            console.log(`PostID: ${comment.postId}, Content: "${comment.content}"`);
        });

        console.log("\nAll user content successfully retrieved!");

    } catch (error) {
        console.error("Error fetching user content:", error.message);
    }
}

(async () => { // Call both sequential and parallel fetching
    await fetchSequentially();
    console.log("\n--- Sequential Fetching Complete ---\n");
    await fetchInParallel();
    console.log("\n--- Parallel Fetching Complete ---");
    await getUserContent();
    console.log("\n--- User Content Fetching Complete ---");
})();

// Note: The above functions simulate fetching data and may fail randomly to demonstrate error handling.