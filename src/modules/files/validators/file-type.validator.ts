import { ValidationOptions, registerDecorator } from 'class-validator';
import {
  ValidActionsEnum,
  validActions,
  validImageTypes,
  validVideoTypes,
} from '../constants';

export function IsCorrectType(options?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(type: string) {
          const fileType = [...validVideoTypes, ...validImageTypes].some(
            (ext) => type.endsWith(ext),
          );
          if (!fileType) {
            return false;
          }
          return true;
        },
        defaultMessage() {
          return 'Invalid type received. Valid types are: jpg, jpeg, png for images, and mp4, avi, mov for videos';
        },
      },
    });
  };
}

export function FileActionType(options?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(action: ValidActionsEnum) {
          const fileAction = validActions.includes(action);
          if (!fileAction) {
            return false;
          }
          return true;
        },
        defaultMessage() {
          return 'Invalid action received. Valid actions are: userProfilePic';
        },
      },
    });
  };
}
