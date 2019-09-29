export default function generateId() {
  return (
    '_' +
    Math.random()
      .toString()
      .substr(2, 9)
  );
}
