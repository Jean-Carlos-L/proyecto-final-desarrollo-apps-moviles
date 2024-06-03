const verifySession = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  if (!user) {
    return false;
  }

  return true;
};
