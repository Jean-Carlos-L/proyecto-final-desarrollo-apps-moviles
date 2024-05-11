async function login(event) {
  //   event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = await findUserByEmail({ email, password });

  if (user) {
    console.log("user", user);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/index.html";
  }
}

document.getElementById("button-sign-in").addEventListener("click", login);

async function findUserByEmail({ email, password }) {
  try {
    const URL = "http://localhost:3050/api/v1/users/login";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const { user, message, token } = await response.json();
    console.log("message", message);
    if (message === "Incorrect password" || message === "Incorrect email") {
      alert("Incorrect email or password");
      return null;
    }

    return { ...user, token };
  } catch (error) {
    console.log("error", error);
    alert(`${error.response.data.message}`);
  }
}

function navigateToRegister() {
  window.location.href = "/pages/register.html";
}

document
  .getElementById("button-sign-up")
  .addEventListener("click", navigateToRegister);
