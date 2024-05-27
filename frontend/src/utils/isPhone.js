export function isPhone(phone) {
  const phoneRegex = /^\d{10}$/;

  if (phone.match(phoneRegex)) return true;
  else return false;
}
