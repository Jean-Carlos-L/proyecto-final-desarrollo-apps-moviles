const verifySession = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "/pages/login.html";
  }
};
