import { defaultConfig } from './default.config';
import { validateData } from '../../utils';
import * as io from 'io-ts';
import { isRight } from "fp-ts/lib/Either";

const freezeObject = (obj) => obj;

/**
 * Merge default configuration with fetched
 * @param obj fetched configuration object
 */
export const defaultConfigProcessor = <T>(obj: T extends Partial<Config> & { error: boolean } ? T : any) => {
  const def = {
    error: obj.error,
    ...defaultConfig,
  }


  const rootValidator = io.partial({
    simpleString: io.string,
    simpleNumber: io.number,
    simpleBoolean: io.boolean,
    simpleShouldBeString: io.union([io.string, io.null]),
    optionalString: io.union([io.string, io.null]),
    arrayOfStrings: io.array(
      io.string
    )
  });

  const decoded = rootValidator.decode(obj);

  const isDataValid = validateData(rootValidator, obj);
  if(!isDataValid || obj.error) {
    return freezeObject({
      ...def,
    })
  }

  return freezeObject({
    ...def,
    ...obj,
  })
}
