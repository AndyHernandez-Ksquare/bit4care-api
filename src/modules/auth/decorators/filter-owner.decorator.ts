import { SetMetadata } from '@nestjs/common';

export const FilterOwner = (key: string) => SetMetadata('key', key);
