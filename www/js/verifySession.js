const veriySession = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  if (!user) {
    window.location.href = "/pages/login.html";
  }
};

export default veriySession;
