declare type Config = {
  simpleString: string;
  simpleNumber: number;
  simpleBoolean: boolean;
  simpleShouldBeString: string | null;
  optionalString?: string;
  arrayOfStrings?: Config.StringArray
}

declare namespace Config {
  type StringArray = Array<string>;

  namespace _ {
    type URL = string;

    type ConfigMap = {
      [configKey: string]: URL
    }

    type Result<Key> = {
      [key in keyof Key]: {
        error: boolean,
        [configKey: string]: any
      }
    }
}
}
