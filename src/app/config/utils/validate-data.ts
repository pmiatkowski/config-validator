import { isRight } from "fp-ts/lib/Either";
import * as io from 'io-ts';
type Params = {
  throw?: boolean;
  logType?: 'warn' | 'log' | 'error';
}

/**
 * Checks if provided model is valid - show errors
 * @param obj any io object
 */
export const validateData = <T>(model: io.Type<T>, obj: T, params: Params = {}): boolean => {
  const opts: Params = {
    throw: false,
    logType: 'error',
    ...params
  }

  try {
    const decoded = model.decode(obj);
    const result = isRight(decoded);

    if(decoded._tag === 'Right') {
      return true;
    }

    const errors = decoded.left.reduce((err, nextErr) => {
      const ctx = nextErr.context[1];
      err.push({
        field: ctx.key,
        value: ctx.actual,
        expected: ctx.type.name,
        _raw: nextErr
      })

      return err;
    }, []) || [];

    if(opts.logType) {
      errors.forEach(err => {
        console[opts.logType](`Detected invalid data in "${err.field}". Expected type: ${err.expected}. Received value:`, err.value);
      })
    }

    if(opts.throw) {}

  } catch (error) {
    console.error('Data validation error', error);

    return false;
  }

}
