import { Expose } from 'class-transformer';

export class ImageDto {
  @Expose()
  src: string;

  @Expose()
  alt: string;
}
