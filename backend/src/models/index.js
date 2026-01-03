const User = require('./user.model');
const Trip = require('./trip.model');
const Section = require('./section.model');
const Activity = require('./activity.model');
const Post = require('./post.model');
const Comment = require('./comment.model');
const Like = require('./like.model');

// Trip Associations
User.hasMany(Trip, { foreignKey: 'userId', as: 'trips' });
Trip.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Trip.hasMany(Section, { foreignKey: 'tripId', as: 'sections', onDelete: 'CASCADE' });
Section.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

Trip.hasMany(Activity, { foreignKey: 'tripId', as: 'activities', onDelete: 'CASCADE' });
Activity.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

// Community Associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'userComments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Post.hasMany(Like, { foreignKey: 'postId', as: 'likes', onDelete: 'CASCADE' });
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
User.hasMany(Like, { foreignKey: 'userId', as: 'userLikes' });
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
    User,
    Trip,
    Section,
    Activity,
    Post,
    Comment,
    Like
};
