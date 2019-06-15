import sequelize from 'sequelize';
import models from '@models';

const { User, Rating } = models;


const articlePayload = {
  where: {},
  attributes: [
    'id',
    'slug',
    'title',
    'body',
    'image',
    'createdAt',
    'updatedAt',
    'deletedAt',
    [sequelize.fn('AVG', sequelize.col('articleRatings.ratings')), 'averageRating']
  ],
  include: [
    {
      model: Rating,
      as: 'articleRatings',
      required: false,
      attributes: []
    },
    {
      model: User,
      as: 'author',
      attributes: [
        'id',
        'username',
        'email'
      ]
    }
  ],
  group: [
    'Article.id',
    'author.id'
  ]
};

export default articlePayload;
