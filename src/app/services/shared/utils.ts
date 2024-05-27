export { checkJSONDiff, sortJSON } from "./jsondiff";

export const zones = () => {
  const zonelist = ['PST', 'CST', 'IST', 'EST'];
  let list = Intl.supportedValuesOf('timeZone');
  list.push(...zonelist);
  if (!(list.includes('UTC') || list.includes('utc'))) {
    list.push('UTC');
  }
  return list.map(zone => ({
    abbr: new Date().toLocaleTimeString('en-us', { timeZoneName: 'short', timeZone: zone }).split(' ')[2],
    zone
  }));
};
