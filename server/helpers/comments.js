import models from '@models';

const { Comment } = models;

export const comments = async (value) => {
  const payload = await Comment.findAll({
    attributes: ['id', 'createdAt', 'updatedAt', 'body'],
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
    }]
  });

  return payload;
};

export const singleComment = async (id) => {
  const payload = await Comment.findOne({
    attributes: ['id', 'createdAt', 'updatedAt', 'body'],
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
    }]
  });

  return payload;
};
