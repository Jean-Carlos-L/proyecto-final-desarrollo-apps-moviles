function handleCreateUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  createUser({ email, password, username });
}

document
  .getElementById("button-sign-up")
  .addEventListener("click", handleCreateUser);

function createUser({ email, password, username }) {
  createUserService({ email, password, username });
}

const createUserService = async ({ email, password, username }) => {
  try {
    const URL = "http://localhost:3050/api/v1/users";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });
    const { message } = await response.json();
    console.log("message", message);
    if (message === "User created successfully") {
      alert("User created successfully");
    }
  } catch (error) {
    console.log("error", error);
    alert(`${error.response.data.message}`);
  }
};
