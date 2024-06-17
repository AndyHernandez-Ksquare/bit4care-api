import { ValidationOptions, registerDecorator } from 'class-validator';
import { ValidActionsEnum, validActions, validTypes } from '../constants';

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
          return 'Invalid action received. Valid actions are: userProfilePic, clientProfilePic';
        },
      },
    });
  };
}
