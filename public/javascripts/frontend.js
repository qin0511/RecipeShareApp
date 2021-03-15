const loginForm = document.querySelector("#formLogin");
const registForm = document.querySelector("#formRegist");
const errorText = document.querySelector("#error");

if (loginForm) {
  loginForm.addEventListener("submit", handleLoginSubmit);
}
if (registForm) {
  registForm.addEventListener("submit", handleRegistSubmit);
}

function getUserInfo(form) {
  const formData = new FormData(form);

  console.log("form data", formData);

  return {
    username: formData.get("username"),
    password: formData.get("password"),
  };
};

async function handleLoginSubmit(evt) {
  evt.preventDefault();
  const userInfo = getUserInfo(loginForm);
  if (!userInfo.username || !userInfo.password) {
    errorText.innerHTML = "username and password is required!";
    return;
  }
  errorText.innerHTML = "";

  const response = await fetch("/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo), // body data type must match "Content-Type" header
  });
  const res = await response.json();
  if (res && res.success) {
    //alert("success!");
    window.location.href = "/viewRecipe.html";
    // todo redirect to other page
  } else {
    errorText.innerHTML = res.message || "sign in failed!";
  }
 
}

async function handleRegistSubmit(evt) {
  evt.preventDefault();
  const userInfo = getUserInfo(registForm);
  if (!userInfo.username || !userInfo.password) {
    errorText.innerHTML = "username and password is required!";
    return;
  }
  errorText.innerHTML = "";

  const response = await fetch("/regist", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo), // body data type must match "Content-Type" header
  });
  const res = await response.json();
  if (res && res.success) {
    //alert("success!");
    window.location.href = "/index.html";
    // todo redirect to other page
  } else {
    errorText.innerHTML = res.message || "sign up failed!";
  }
}
