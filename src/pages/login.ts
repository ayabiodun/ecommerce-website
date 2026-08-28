import "../style.css";

const form = document.querySelector("form") as HTMLFormElement;
const registerBtn = document.querySelector(
  "#register-btn",
) as HTMLButtonElement;
const loginBtn = document.querySelector("#login-btn") as HTMLButtonElement;

const formMessage = document.querySelector(
  "#form-message",
) as HTMLParagraphElement;

let arrUser: User[] = JSON.parse(localStorage.getItem("Login") || "[]");

interface User {
  username: string;
  password: string;
}

function showMessage(message: string, type: "success" | "error"): void {
  formMessage.innerText = message;

  if (type === "success") {
    formMessage.className =
      "mt-4 text-center text-sm font-medium text-green-600";
  } else {
    formMessage.className =
      "mt-4 text-center text-sm font-medium text-red-500";
  }
}

function registerF(e: Event): void {
  e.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === "" || password === "") {
    showMessage("Please enter a username and password.", "error");
    return;
  }

  const userExist = arrUser.some(
    (user) => user.username === username,
  );

  if (userExist) {
    showMessage("This username already exists.", "error");
    form.reset();
    return;
  }

  const user: User = {
    username,
    password,
  };

  arrUser.push(user);

  const userJson = JSON.stringify(arrUser);
  localStorage.setItem("Login", userJson);

  showMessage("Account created successfully! You can now log in.", "success");

  form.reset();
}

function loginF(e: Event): void {
  e.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === "" || password === "") {
    showMessage("Please enter a username and password.", "error");
    return;
  }

  const loginUser = arrUser.find(
    (user) => user.username === username,
  );

  if (!loginUser) {
    showMessage("Username not found. Please register first.", "error");
    form.reset();
    return;
  }

  if (loginUser.password !== password) {
    showMessage("Incorrect password. Please try again.", "error");
    form.reset();
    return;
  }

  const storedLogs = JSON.stringify({ loggedIn: true });
  localStorage.setItem("logged", storedLogs);

  showMessage("Login successful! Redirecting...", "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

registerBtn.addEventListener("click", (e: Event) => registerF(e));

loginBtn.addEventListener("click", (e: Event) => loginF(e));