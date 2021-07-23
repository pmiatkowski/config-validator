/**
 * Fetch config files
 * @param {Config.ConfigUtilities.ConfigMap} configMaps can handle multiple configuration files
 * @example
 * { mainConfig: "/config.json", otherConfig: "/config/otherConfig.json" }
 * @returns {Config._.Result} Config._.Result
 */
export const readConfigs = async (configMaps: Config._.ConfigMap) => {
  const results: Config._.Result<typeof configMaps> = {}

  for(const configKey in configMaps) {
    const url = configMaps[configKey];

    results[configKey] = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if(!response.ok) {
        throw new Error(`Unable to fetch config type: "${configKey}" from "${url}" `);
      }

      return response.json();
    })
    .then(json => {

      console.warn('WHAT IS JSON', json)
      return {
        ...json,
      };
    })
    .catch(ex => {
      console.error('An error occured reading configuration file. Application will fall back to the default configuration. Some things may not work as expected.', ex);

      return {
        error: true
      }
    })
  }

  return results;
}
