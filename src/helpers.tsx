
export const asset = (pathAsset: string) : string => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/${pathAsset}`;
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

export const URLS = Object.freeze({
  terms: 'https://www.beamsuntory.com/en/terms-and-conditions',
  privacity: 'https://www.beamsuntory.com/en/privacy-policy',
  cookies: 'https://www.beamsuntory.com/en/cookie-policy',
  drink: 'https://www.drinksmart.com/',
  marketing: 'https://www.beamsuntory.com/sites/default/files/BSI-Marketing-Code-of-Practice.pdf',
  transparency: 'https://www.beamsuntory.com/en/supply-chain-transparency ',
});
