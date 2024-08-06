/// <reference types="cypress" />

import {User} from '../../../src/Implementation/User';
import {Label} from '../../../src/Implementation/User/Catalogue/Meme/Label';

describe('Unit Testing for labels', () => {
  const userlabel = new User(
    new Date(),
    new Date(),
    'Ted Johson González',
    'tedjg@gmail.com',
    new Date('1985-05-15'),
    'male',
    'avatar.jpg',
    '12345'
  );

  const label = new Label('Label 1', userlabel, 'description', '#000000');

  describe('accessLabelData', () => {
    it('should access label data without error', done => {
      expect(label).to.have.property('id');
      expect(label).to.have.property('owner');
      expect(label).to.have.property('name');
      expect(label).to.have.property('description');
      expect(label).to.have.property('creationDate');
      expect(label).to.have.property('lastModificationDate');
      expect(label).to.have.property('colour');

      expect(label.name).to.has.string('Label 1');
      expect(label.description).to.has.string('description');
      expect(label.colour).to.has.string('#000000');

      console.log(
        'This label ' + label.colour + ' is owned by: ' + label.owner.name
      );

      done();
    });
  });
});
