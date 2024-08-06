import {User} from '../../../src/Implementation/User';
import {Meme} from '../../../src/Implementation/User/Catalogue/Meme';
import {Reaction} from '../../../src/Implementation/User/Catalogue/Meme/Reaction';

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

  const meme = new Meme('Meme', false, userted, 'contenido', true);

  const reaction = new Reaction('😂', usercris);
  const reaction2 = new Reaction('😍', usermarketing);

  describe('accessReactionData', () => {
    it('should access reaction data without error', done => {
      expect(reaction).to.have.property('id');
      expect(reaction).to.have.property('emoji');
      expect(reaction).to.have.property('whoReact');
      expect(reaction).to.have.property('creationDate');
      done();
    });
  });

  describe('add reactions to a meme', () => {
    it('should add reactions to a meme', done => {
      meme.reactions.push(reaction);
      meme.reactions.push(reaction2);

      expect(meme.reactions).to.have.length(2);

      console.log(
        'User ' +
          meme.reactions[0].whoReact.name +
          ' reacted with: ' +
          meme.reactions[0].emoji
      );

      console.log(
        'User ' +
          meme.reactions[1].whoReact.name +
          ' reacted with: ' +
          meme.reactions[1].emoji
      );
      done();
    });
  });
});
