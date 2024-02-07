import { Expose } from 'class-transformer';

export class Sort {
  @Expose()
  key: string;

  @Expose()
  type: 'ASC' | 'DESC';
}

export class SearchOptions {
  @Expose()
  sort?: Sort;

  @Expose()
  categories?: string[];
}
