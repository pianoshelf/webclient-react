/**
 * Takes in a file name and turns it into a title.
 * @param {String} filename An unsanitized file name.
 * @return {String} Beautified filename.
 */
export default function beautifyFileName(filename) {
  const newFilename = filename
    .split('.')[0]
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/, ' ');

  console.log(newFilename);

  return newFilename.charAt(0).toUpperCase() + newFilename.slice(1);
}
