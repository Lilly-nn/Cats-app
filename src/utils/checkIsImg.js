export function checkIfImage(file) {
    if (file && file.type && !file.type.startsWith('image/')) {
      alert('File is not an image.');
      return false;
    } 
    return true;
  }