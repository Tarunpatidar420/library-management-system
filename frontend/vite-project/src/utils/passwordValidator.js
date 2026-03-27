export const passwordRuleText = [
  "Password length must be 8 to 16 characters.",
  "Password must start with a capital letter.",
  "Numbers are allowed.",
  "Only these special characters are allowed: @ # $ % &",
  "Password must contain 1 to 3 special characters.",
  "Valid examples: Tarun@2805, Patidar@#2805",
];

export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < 8 || password.length > 16) {
    return "Password length must be between 8 and 16 characters";
  }

  if (!/^[A-Z]/.test(password)) {
    return "Password must start with a capital letter";
  }

  if (!/^[A-Za-z0-9@#$%&]+$/.test(password)) {
    return "Only letters, numbers, and @ # $ % & are allowed";
  }

  const specialChars = password.match(/[@#$%&]/g) || [];

  if (specialChars.length < 1 || specialChars.length > 3) {
    return "Password must contain 1 to 3 special characters from @ # $ % &";
  }

  return "";
};