import models from '@models';

const { Rating, User, Profile } = models;

const findRatings = articleId => Rating.findAll({
  where: { articleId },
  attributes: ['ratings', 'createdAt', 'updatedAt', 'deletedAt'],
  include: [
    {
      model: User,
      as: 'rater',
      attributes: [
        'id',
        'username'
      ],
      include: [{
        model: Profile,
        as: 'profile',
        attributes: ['firstname', 'lastname', 'bio', 'avatar']
      }]
    }
  ]
});

export default findRatings;
