const { Post, Comment, Like, User } = require('../models');

exports.getFeed = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;

        const posts = await Post.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id', 'name', 'avatar'] },
                { model: Like, as: 'likes' },
                {
                    model: Comment,
                    as: 'comments',
                    include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        const feed = posts.map(post => {
            const p = post.toJSON();
            return {
                id: p.id,
                user: p.user,
                location: p.location,
                image: p.image,
                caption: p.caption,
                likes: p.likes.length,
                commentsCount: p.comments.length,
                isLiked: userId ? p.likes.some(like => like.userId === userId) : false,
                timestamp: p.createdAt,
                comments: p.comments.slice(0, 3)
            };
        });

        res.json(feed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { caption, location } = req.body;
        const userId = req.user.id;

        const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

        const post = await Post.create({
            caption,
            location,
            image,
            userId
        });

        const fullPost = await Post.findByPk(post.id, {
            include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }]
        });

        res.status(201).json(fullPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const existingLike = await Like.findOne({
            where: { postId: id, userId }
        });

        let isLiked = false;

        if (existingLike) {
            await existingLike.destroy();
            isLiked = false;
        } else {
            await Like.create({ postId: id, userId });
            isLiked = true;
        }

        const likesCount = await Like.count({ where: { postId: id } });

        res.json({ message: 'Success', isLiked, likes: likesCount });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.findAll({
            where: { postId: id },
            include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }],
            order: [['createdAt', 'ASC']]
        });

        res.json(comments.map(c => ({
            id: c.id,
            text: c.text,
            user: c.user.name,
            avatar: c.user.avatar,
            timestamp: c.createdAt
        })));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        const comment = await Comment.create({
            text,
            postId: id,
            userId
        });

        const fullComment = await Comment.findByPk(comment.id, {
            include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }]
        });

        res.status(201).json({
            id: fullComment.id,
            text: fullComment.text,
            user: fullComment.user.name,
            avatar: fullComment.user.avatar,
            timestamp: fullComment.createdAt
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
