/* eslint-disable import/no-anonymous-default-export */

// Returns a URL according to the current environment
const getUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost';
  }

  return `https://hsc.devmds.com`;
}


export default {
  getUrl,
}
