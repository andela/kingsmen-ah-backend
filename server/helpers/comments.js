import models from '@models';
import Sequelize from 'sequelize';

const { Comment } = models;

export const comments = async (value) => {
  const payload = await Comment.findAll({
    attributes: ['id', 'createdAt', 'updatedAt', 'body',
      [Sequelize.fn('COUNT', Sequelize.col('CommentLikes.userId')), 'likeCount']],
    where: {
      articleId: value
    },
    order: ['createdAt'],
    include: [{
      model: models.User,
      as: 'author',
      attributes: ['username'],
      include: [{
        model: models.Profile,
        as: 'profile',
        attributes: ['bio', 'avatar']
      }]
    },
    {
      model: models.CommentLike,
      attributes: []
    }],
    group: ['Comment.id', 'author.id', 'author->profile.id']
  });

  return payload;
};

export const singleComment = async (id) => {
  const payload = await Comment.findOne({
    attributes: ['id', 'createdAt', 'updatedAt', 'body', [Sequelize.fn('COUNT', Sequelize.col('CommentLikes.userId')), 'likeCount']],
    where: { id },
    include: [{
      model: models.User,
      as: 'author',
      attributes: ['username'],
      include: [{
        model: models.Profile,
        as: 'profile',
        attributes: ['bio', 'avatar']
      }]
    },
    {
      model: models.CommentLike,
      attributes: [],
    }],
    group: ['Comment.id', 'author.id', 'author->profile.id']
  });

  return payload;
};
