export const timestampToDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

export const unixToJsTime = time => time * 1000;
export const jsToUnixTime = time => Math.floor(time / 1000);