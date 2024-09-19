/// <reference types="cypress" />

import {Meme} from '../../src/Implementation/Catalogue/Meme';

describe('Unit Testing for meme class', () => {
  const meme = new Meme('Meme', 'contenido', true);

  describe('accessMemeData', () => {
    it('should access meme data without error', done => {
      expect(meme).to.have.property('id');
      expect(meme).to.have.property('title');
      expect(meme).to.have.property('isPrivate');
      expect(meme).to.have.property('content');
      expect(meme).to.have.property('creationDate');
      expect(meme).to.have.property('lastModificationDate');
      expect(meme).to.have.property('edits');

      console.log(meme.title, meme.title, meme.isPrivate);

      expect(meme.title).to.has.string('Meme');
      expect(meme.isPrivate).to.be.true;
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
});
