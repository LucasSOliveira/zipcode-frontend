/* eslint-disable */
export const serialize = (obj: any): string =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

export const getQueryParams = (url: string) => {
  const paramArr = url.slice(url.indexOf("?") + 1).split("&");
  const params: any = {};
  paramArr.map((param) => {
    const [key, val] = param.split("=");
    params[key] = decodeURIComponent(val);
  });
  return params;
};

export const classname = (obj: any): string => {
  let classAvailible = "";
  const keys = Object.keys(obj);

  keys.forEach((item: string) => {
    if (item && obj[item]) {
      classAvailible = `${classAvailible} ${item}`;
    }
  });
  return classAvailible;
};

export const getIcon = (icoName: string): string | any => icoName ? require(`../icons/${icoName}`) : null