const GB = 1024 * 1024 * 1024;
const MB = 1024 * 1024;
const KB = 1024;

const getReadableSize = function f(size) {
  if (size / GB > 1) {
    return `${(size / GB).toFixed()} GB`;
  }
  if (size / MB > 1) {
    return `${(size / MB).toFixed()} MB`;
  }
  if (size / KB > 1) {
    return `${(size / KB).toFixed()} KB`;
  }
  return `${size} bytes`;
};

export default getReadableSize;
