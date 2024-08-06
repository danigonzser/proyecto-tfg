/// <reference types="cypress" />

import {User} from '../../../src/Implementation/User';
import {Meme} from '../../../src/Implementation/User/Catalogue/Meme';
import {Comment} from '../../../src/Implementation/User/Catalogue/Meme/Comment';
import {Label} from '../../../src/Implementation/User/Catalogue/Meme/Label';
import {Reaction} from '../../../src/Implementation/User/Catalogue/Meme/Reaction';

describe('Unit Testing for meme class', () => {
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

  const meme = new Meme('Meme', false, userted, 'contenido', true);

  const label = new Label('Label 1', userted, 'description', '#000000');

  const comment = new Comment('Comment 1', usercris);

  const reaction = new Reaction('😜', usercris);

  describe('accessMemeData', () => {
    it('should access meme data without error', done => {
      expect(meme).to.have.property('id');
      expect(meme).to.have.property('creator');
      expect(meme).to.have.property('title');
      expect(meme).to.have.property('isPrivate');
      expect(meme).to.have.property('content');
      expect(meme).to.have.property('creationDate');
      expect(meme).to.have.property('lastModificationDate');
      expect(meme).to.have.property('labels');
      expect(meme).to.have.property('comments');
      expect(meme).to.have.property('likes');
      expect(meme).to.have.property('reactions');
      expect(meme).to.have.property('edits');

      console.log(meme.title, meme.creator, meme.title, meme.isPrivate);

      expect(meme.title).to.has.string('Meme');
      expect(meme.isPrivate).to.be.true;
      done();
    });
  });

  describe('add labels', () => {
    it('should access label data without error', done => {
      meme.labels.push(label);
      expect(meme.labels).to.have.length(1);
      meme.labels.forEach(label => {
        expect(label).to.have.property('name');
        expect(label).to.have.property('owner');
        expect(label).to.have.property('description');
        expect(label).to.have.property('colour');
        console.log(label);
      });
      done();
    });
  });

  describe('add edits', () => {
    it('should edit a meme without error', done => {
      meme.edits.push({id: crypto.randomUUID()});
      expect(meme.edits).to.have.length(1);
      done();
    });
  });

  describe('add allowed users&roles', () => {
    it('should allowed a user with a role without error', done => {
      meme.allowedUserRoles.set(usercris, 'Viewer');
      expect(meme.allowedUserRoles).to.have.length(1);
      console.log(
        'Allowed user role ' +
          meme.allowedUserRoles.entries().next().value[1] +
          ' of ' +
          meme.allowedUserRoles.entries().next().value[0].name
      );
      done();
    });
  });

  describe('add comments', () => {
    it('should add comments without error', done => {
      meme.comments.push(comment);
      expect(meme.comments).to.have.length(1);

      console.log(
        'User: ' +
          meme.comments[0].creator.name +
          ' commented: ' +
          meme.comments[0].content
      );

      done();
    });
  });

  describe('add likes', () => {
    it('should add likes to meme without error', done => {
      meme.likes.push(usercris);
      expect(meme.likes).to.have.length(1);
      console.log('User: ' + meme.likes[0].name + ' liked this meme');
      done();
    });
  });

  describe('add reactions', () => {
    it('should react to meme without error', done => {
      meme.reactions.push(reaction);
      expect(meme.reactions).to.have.length(1);
      console.log(
        'User ' +
          meme.reactions[0].whoReact.name +
          ' reacted with: ' +
          meme.reactions[0].emoji
      );
      done();
    });
  });
});
