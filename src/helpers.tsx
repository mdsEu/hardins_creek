
export const asset = (pathAsset: string) => {
  let env = process.env.NEXT_PUBLIC_ENV;
  return `${env === 'local' ? '' : process.env.NEXT_PUBLIC_APP_URL }/${pathAsset}`;
}


export const getLocalStorageByKey = (key: any, defValue = '') => {
  if(typeof(window) === 'undefined' || !window || !window.localStorage) {
    return defValue;
  }
  const val = window.localStorage.getItem(key);
  if(!val) {
    return defValue;
  }
  return val;
}

export const setLocalStorageByKey = (key: any, val: any) => {
  if(typeof(window) === 'undefined' || !window || !window.localStorage) {
    return;
  }
  window.localStorage.setItem(key, val);
}
