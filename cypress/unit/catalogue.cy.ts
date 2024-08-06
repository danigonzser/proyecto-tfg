/// <reference types="cypress" />

import {User} from '../../src/Implementation/User';
import {Catalogue} from '../../src/Implementation/User/Catalogue';
import {Meme} from '../../src/Implementation/User/Catalogue/Meme';
import {Label} from '../../src/Implementation/User/Catalogue/Meme/Label';

describe('Unit Test for memes catalogue', () => {
  const userWithCatalogue = new User(
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

  console.log(userWithCatalogue);

  const memeCatalogue = new Catalogue(
    'Memes',
    'Catalogue of memes',
    'cover.jpg',
    false,
    userWithCatalogue
  );

  console.log(memeCatalogue);

  describe('#addMeme()', () => {
    it('should add a meme to catalogue without error', done => {
      const meme = new Meme(
        'Meme 1',
        false,
        userWithCatalogue,
        'content',
        true,
        [],
        []
      );

      memeCatalogue.memes.push(meme);

      expect(memeCatalogue.memes).to.have.length(1);

      console.log(memeCatalogue.memes);

      done();
    });
  });

  describe('#addAllowedUser()', () => {
    it('should add an allowed user without error', done => {
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

      memeCatalogue.allowedUserRoles.set(usercris, 'Admin');

      expect(memeCatalogue.allowedUserRoles).to.have.length(1);

      console.log(memeCatalogue.allowedUserRoles);

      done();
    });
  });

  describe('#addLabel()', () => {
    it('should add a label to the catalog', done => {
      const label = new Label(
        'Label 1',
        userWithCatalogue,
        'description',
        '#000000'
      );

      memeCatalogue.labels.push(label);

      expect(memeCatalogue.labels).to.have.length(1);

      console.log(memeCatalogue.labels);

      done();
    });
  });

  describe('#removeMeme(),#getMemes()', () => {
    it('should remove a meme from the catalogue without error', done => {
      const meme2 = new Meme(
        'Meme 2',
        true,
        userWithCatalogue,
        'content',
        true,
        [],
        []
      );

      memeCatalogue.memes.push(meme2);

      memeCatalogue.memes.pop();

      console.log('Memes after removing meme 2');

      console.log(memeCatalogue.memes);

      expect(memeCatalogue.memes).to.have.length(1);

      memeCatalogue.memes.pop();

      expect(memeCatalogue.memes).to.have.length(0);

      console.log('Memes after removing meme 1');

      console.log(memeCatalogue.memes);

      done();
    });
  });

  describe('#removeAllowedUser(),#getAllowedUserRoles ', () => {
    it('should remove an allowed user from the catalogue without error', done => {
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

      expect(memeCatalogue.allowedUserRoles).to.have.length(1);

      memeCatalogue.allowedUserRoles.set(usermarketing, 'Viewer');

      expect(memeCatalogue.allowedUserRoles).to.have.length(2);

      memeCatalogue.allowedUserRoles.delete(usermarketing);

      expect(memeCatalogue.allowedUserRoles).to.have.length(1);

      const allowedusers = memeCatalogue.allowedUserRoles;

      console.log('Allowed users after removing usermarketing');
      console.log(allowedusers);

      console.log(
        'Allowed user role ' +
          allowedusers.entries().next().value[1] +
          ' of ' +
          allowedusers.entries().next().value[0].name
      );

      memeCatalogue.allowedUserRoles.delete(
        allowedusers.entries().next().value[0]
      );

      expect(memeCatalogue.allowedUserRoles).to.have.length(0);

      console.log('Memes after removing meme 2');

      console.log(memeCatalogue.memes);

      done();
    });
  });

  describe('#getLabels(),#removeLabel()', () => {
    it('should remove an allowed user from the catalogue without error', done => {
      console.log(memeCatalogue.labels);

      expect(memeCatalogue.labels).to.have.length(1);

      expect(memeCatalogue.labels.length).to.equal(memeCatalogue.labels.length);

      const labels = memeCatalogue.labels;

      expect(labels).to.have.length(1);

      memeCatalogue.labels.pop();

      expect(memeCatalogue.labels).to.have.length(0);

      expect(memeCatalogue.labels.length).to.equal(memeCatalogue.labels.length);

      done();
    });
  });

  describe('#changeTitle(),#changeDescription(),#changeCover(),#changeVisibility()', () => {
    it('should change properties of the catalogue without error', done => {
      memeCatalogue.title = 'Memes 2';

      expect(memeCatalogue.title).to.equal('Memes 2');

      memeCatalogue.description = 'Catalogue of memes 2';

      expect(memeCatalogue.description).to.equal('Catalogue of memes 2');

      memeCatalogue.cover = 'cover2.jpg';

      expect(memeCatalogue.cover).to.equal('cover2.jpg');

      memeCatalogue.private = true;

      expect(memeCatalogue.private).to.equal(true);

      done();
    });
  });
});
