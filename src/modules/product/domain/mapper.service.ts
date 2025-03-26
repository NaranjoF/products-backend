import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
  dtoToClass<T>(dtoObject: any, classObject: T): T {
    for (const property in dtoObject) {
      if (
        dtoObject.hasOwnProperty(property) &&
        typeof dtoObject[property] !== 'function'
      ) {
        classObject[property] = dtoObject[property];
      }
    }

    return classObject;
  }
}
