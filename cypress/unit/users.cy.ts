import {User} from '../../src/Implementation/User';
import {Users} from '../../src/Implementation/Users';

describe('Unit testing for users class', () => {
  const userted = new User(
    new Date(),
    new Date(),
    'Ted Johson González',
    '@teddy',
    'tedjg@gmail.com',
    new Date('1985-05-15'),
    'male',
    'avatar.jpg',
    '12345'
  );

  const usercris = new User(
    new Date(),
    new Date(),
    'Cristina Contreras Márquez',
    '@crisinfo',
    'criscm@gmail.com',
    new Date('2001-08-22'),
    'female',
    'avatar.jpg',
    '12345'
  );

  const usermarketing = new User(
    new Date(),
    new Date(),
    'Empleado Corporate Solutions',
    '@corporatesolutions',
    'empleado@corporatesolutions.com',
    new Date('1995-05-12'),
    'male',
    'avatar.jpg',
    '12345'
  );

  describe('accessUsers', () => {
    it('should access users data without error', done => {
      const users = new Users([userted, usercris, usermarketing]);

      expect(users).to.have.property('users');

      expect(users.users).to.have.length(3);

      users.users.forEach(user => {
        console.log(user.name, user.nickname, user.email, user.birthDate);
      });

      done();
    });
  });
});
