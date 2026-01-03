// Mock Data
const posts = [
    {
        id: 1,
        user: { name: "Sarah Miller", avatar: "https://via.placeholder.com/50" },
        location: "Santorini, Greece",
        image: "https://via.placeholder.com/400",
        caption: "Sunset views! 🌅",
        likes: 234,
        commentsCount: 42,
        isLiked: false,
        timestamp: "2026-01-02T10:00:00Z",
        comments: [
            { id: 101, user: "John", text: "Wow!" }
        ]
    },
    {
        id: 2,
        user: { name: "Mike Ross", avatar: "https://via.placeholder.com/50" },
        location: "Kyoto, Japan",
        image: "https://via.placeholder.com/400",
        caption: "Temple run today.",
        likes: 120,
        commentsCount: 10,
        isLiked: true,
        timestamp: "2026-01-01T15:30:00Z",
        comments: []
    }
];

exports.getFeed = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    // Pagination logic can be added, for now return all
    res.json(posts);
};

exports.likePost = (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id == id);
    if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        res.json({ message: 'Success', isLiked: post.isLiked, likes: post.likes });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

exports.getComments = (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id == id);
    if (post) {
        res.json(post.comments || []);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

exports.addComment = (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const post = posts.find(p => p.id == id);
    if (post) {
        const comment = { id: Date.now(), user: "Me", text };
        post.comments = post.comments || [];
        post.comments.push(comment);
        post.commentsCount++;
        res.status(201).json(comment);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};
