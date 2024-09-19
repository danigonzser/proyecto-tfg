/// <reference types="cypress" />

import {Catalogue} from '../../src/Implementation/Catalogue';
import {Meme} from '../../src/Implementation/Catalogue/Meme';

describe('Unit Test for memes catalogue', () => {
  const memeCatalogue = new Catalogue(
    'Memes',
    'Catalogue of memes',
    'cover.jpg',
    false
  );

  console.log(memeCatalogue);

  describe('#addMeme()', () => {
    it('should add a meme to catalogue without error', done => {
      const meme = new Meme('Meme 1', 'content', true, []);

      memeCatalogue.memes.push(meme);

      expect(memeCatalogue.memes).to.have.length(1);

      console.log(memeCatalogue.memes);

      done();
    });
  });

  describe('#removeMeme(),#getMemes()', () => {
    it('should remove a meme from the catalogue without error', done => {
      const meme2 = new Meme('Meme 2', 'content', true, []);

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

  describe('#changeTitle(),#changeDescription(),#changeCover(),#changeVisibility()', () => {
    it('should change properties of the catalogue without error', done => {
      memeCatalogue.title = 'Memes 2';

      expect(memeCatalogue.title).to.equal('Memes 2');

      memeCatalogue.description = 'Catalogue of memes 2';

      expect(memeCatalogue.description).to.equal('Catalogue of memes 2');

      memeCatalogue.cover = 'cover2.jpg';

      expect(memeCatalogue.cover).to.equal('cover2.jpg');

      memeCatalogue.isPrivate = true;

      expect(memeCatalogue.isPrivate).to.equal(true);

      done();
    });
  });
});
