import {User} from '../../../src/Implementation/User';

describe('Unit Testing for reaction class', () => {
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

  describe('accessUserData', () => {
    it('should access user data without error', done => {
      expect(userted).to.have.property('id');
      expect(userted).to.have.property('name');
      expect(userted).to.have.property('nickname');
      expect(userted).to.have.property('email');
      expect(userted).to.have.property('birthDate');
      expect(userted).to.have.property('gender');
      expect(userted).to.have.property('creationDate');
      expect(userted).to.have.property('lastModificationDate');
      expect(userted).to.have.property('catalogues');
      expect(userted).to.have.property('followers');
      expect(userted).to.have.property('following');
      expect(userted).to.have.property('avatar');
      expect(userted).to.have.property('password');

      console.log(
        userted.name,
        userted.nickname,
        userted.email,
        userted.birthDate
      );

      done();
    });
  });
});
