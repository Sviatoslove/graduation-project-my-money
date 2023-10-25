export default function getDate() {
  const yourDate = new Date();
  return yourDate.toISOString().split('T')[0];
};