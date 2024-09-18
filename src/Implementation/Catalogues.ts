import {Catalogue} from '../Model/Catalogue';
import {Catalogues as CataloguesDefinition} from '../Model/Catalogues';

export class Catalogues implements CataloguesDefinition {
  catalogues: Catalogue[];

  constructor(catalogues: Catalogue[]) {
    this.catalogues = catalogues;
  }
}
