

const isEmpty = (data) => {
  if (data === undefined || data === "" || data === null || data === 'undefined') {
    return true;
  } 
  return false;
}

export { isEmpty };