export const configReplacerSecret = (obj: any) => {
  function recursiveReplace(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        if (obj[key].match(/<\{(.+?)\}>/)) {
          const secretMatch = obj[key].match(/<\{(.+?)\}>/);
          if (secretMatch) {
            const secretName = secretMatch[1];
            if (process.env[secretName]) {
              obj[key] = obj[key].replace(secretMatch[0], process.env[secretName]);
            } else {
              console.error(`Environment variable ${secretName} not found.`);
            }
          }
        }
      } else if (typeof obj[key] === 'object') {
        recursiveReplace(obj[key]);
      }
    }
  }
  recursiveReplace(obj);
}