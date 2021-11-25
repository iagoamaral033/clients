export function randomKey() {
  let charsetAll = 'abc123456789';
  let size = 10;

  let pass = '';
  for(let i = 0, n = charsetAll.length; i < size; i++){
    pass += charsetAll.charAt(Math.floor(Math.random() * n))
  };

  return pass;
};