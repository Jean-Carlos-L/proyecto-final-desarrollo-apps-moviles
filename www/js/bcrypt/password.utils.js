const SALT_ROUNDS = 10;

async function encryptPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode("123");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
