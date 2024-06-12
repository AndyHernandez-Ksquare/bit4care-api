import { ValidationOptions, registerDecorator } from 'class-validator';
import { validTypes } from '../constants';

export function IsCorrectType(options?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(type: string) {
          const fileType = validTypes.some((ext) => type.endsWith(ext));
          if (!fileType) {
            return false;
          }
          return true;
        },
        defaultMessage() {
          return 'Invalid type received. Valid types are: jpg, jpeg, png';
        },
      },
    });
  };
}
