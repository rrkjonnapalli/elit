function replacer(_key: any, value: any) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}
function reviver(_key: any, value: any) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

export const zones = (() => {
  const zonelist = ['PST', 'CST', 'IST', 'EST'];
  let list = Intl.supportedValuesOf('timeZone');
  list.push(...zonelist);
  if (!(list.includes('UTC') || list.includes('utc'))) {
    list.push('UTC');
  }
  return list.map(zone => ({
    abbr: new Date().toLocaleTimeString('en-us',{timeZoneName:'short', timeZone: zone}).split(' ')[2],
    zone
  }));
  // return list;
})();
