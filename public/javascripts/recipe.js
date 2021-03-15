// const divRecipes = document.querySelector("#recipes");
// const createForm = document.querySelector("#formCreate");

// function renderRecipe(recipe) {
//   const divR = document.createElement("div");
//   divR.className = "col-xs-12 col-md-4 col-sm-6 recipe";

//   const divName = document.createElement("div");
//   divName.textContent = recipe.title;
//   divR.appendChild(divName);

//   const divMaterial = document.createElement("div");
//   divMaterial.setAttribute("style", "color:red");
//   divMaterial.textContent = "cailiaoqingdan..." + recipe.materials;
//   divR.appendChild(divMaterial);

//   const divContent = document.createElement("div");
//   divContent.textContent = recipe.content;
//   divR.appendChild(divContent);

//   if (typeof recipe.img === "string" || recipe.img instanceof String) {
//     const imgF = document.createElement("img");
//     imgF.setAttribute("src", recipe.img);
//     imgF.setAttribute("style", "width:200px");
//     imgF.className = "fileImg";
//     divR.appendChild(imgF);
//   }

//   const comments = document.createElement("div");
//   const comment_form = document.createElement("form");
//   const comment_input_box = document.createElement("input");
//   const post_btn = document.createElement("button");
//   //const reviewer = document.createElement("div");

//   // display existing comments
//   if (recipe.comments !== undefined) {
//     for (let comment of recipe.comments) {
//       const new_comment = document.createElement("div");
//       const name = document.createElement("div");
//       const body = document.createElement("div");
//       name.innerHTML = comment.username + ":";
//       body.innerHTML = comment.comment_body;
//       new_comment.appendChild(name);
//       new_comment.appendChild(body);
//       new_comment.classList.add(
//         "d-flex",
//         "m-2",
//         "align-self-center",
//         "position-relative"
//       );
//       body.classList.add("align-self-center");
//       name.classList.add("me-2", "align-self-center");
//       comments.appendChild(new_comment);
//     }
//   }
//   // set comment form

//   // post a new comment
//   comment_form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     console.log("aa");
//     const comment_body = comment_input_box.value;
//     if (comment_body === "") {
//       alert("Comment cannot be empty");
//       return;
//     }
//     comment_form.reset();
//     console.log(comment_body);
//     const resRaw = await fetch("/writeComment", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         comment: comment_body,
//         recipeId: recipe._id,
//       }),
//     });

//     const res = await resRaw.text();
//     console.log("?", resRaw, resRaw.ok);
//     if (!resRaw.ok) {
//       //alert(res);
//       window.location.href = "/index.html";
//     } else {
//       location.reload();
//       // const name = document.createElement("div");
//       // const body = document.createElement("div");
//       // const new_comment = document.createElement("div");
//       // name.innerHTML = res + ":";
//       // body.innerHTML = comment_body;
//       // new_comment.appendChild(name);
//       // new_comment.appendChild(body);
//       // // new_comment.classList.add(
//       // //   "d-flex",
//       // //   "m-2",
//       // //   "align-self-center",
//       // //   "position-relative"
//       // // );
//       // body.classList.add("align-self-center");
//       // name.classList.add("me-2", "align-self-center");

//       // comments.appendChild(new_comment);
//       // comments.classList.remove("d-none");
//     }
//   });

//   // set comment form properties
//   comment_input_box.setAttribute("placeholder", "Add a comment...");
//   comment_input_box.setAttribute("type", "text");
//   comment_input_box.setAttribute("name", "comment");

//   post_btn.innerText = "post";
//   post_btn.setAttribute("type", "submit");

//   comment_form.appendChild(comment_input_box);
//   comment_form.appendChild(post_btn);

//   divR.append(comments);
//   divR.append(comment_form);

//   divRecipes.append(divR);
//   return divRecipes;
// }

// async function reloadRecipes() {
//   const resRaw = await fetch("./getRecipes");
//   // debugger;
//   if (!resRaw.ok) {
//     //showError("Error <strong>getting</strong> Recipes");
//     window.location.href = "/index.html";
//     console.log(resRaw);
//     return;
//   }
//   const res = await resRaw.json();

//   if (res.error) {
//     showError(res.error);
//     return;
//   }
//   console.log("got recipes", res);

//   //divRecipes.innerHTML = "";
//   res.recipes.forEach(renderRecipe);
// }

// reloadRecipes();
const divRecipes = document.querySelector("#recipes");
const createForm = document.querySelector("#formCreate");


function renderRecipe(recipe) {
  const divR = document.createElement("div");
  divR.className = "col-xs-12 col-md-4 col-sm-6 recipe";

  const divName = document.createElement("div");
  divName.textContent = recipe.title;
  divR.appendChild(divName);

  const divMaterial = document.createElement("div");
  divMaterial.setAttribute('style', 'color:red');
  divMaterial.textContent = "Ingredients:" + recipe.materials;
  divMaterial.textContent.fontsize="5px";
  //divMaterial.classList.add('text-transform: capitalize');
  divR.appendChild(divMaterial);

  const divContent = document.createElement("div");
  divContent.textContent = recipe.content;
  divR.appendChild(divContent);


  if (typeof recipe.img === 'string' || recipe.img instanceof String) {
    const imgF = document.createElement("img");
    imgF.setAttribute("src", recipe.img);
    imgF.setAttribute( 'style', 'width:200px');
    imgF.className = "fileImg";
    divR.appendChild(imgF);
  }
  


  const comments = document.createElement("div");
  const comment_form = document.createElement("form");
  const comment_input_box = document.createElement("input");
  const post_btn = document.createElement("button");
  

  if (recipe.comments !== undefined) {
    for (let comment of recipe.comments) {
      const new_comment = document.createElement("div");
      const name = document.createElement("div");
      const body = document.createElement("div");
      name.innerHTML = comment.username + ":";
      body.innerHTML = comment.comment_body;
      new_comment.appendChild(name);
      new_comment.appendChild(body);
      new_comment.classList.add(
        "d-flex",
        "m-2",
        "align-self-center",
        "position-relative"
      );
      body.classList.add("align-self-center");
      name.classList.add("me-2", "align-self-center");
      comments.appendChild(new_comment);
    }
  }
  // set comment form

  // post a new comment
  comment_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("aa");
    const comment_body = comment_input_box.value;
    if (comment_body === "") {
      alert("Comment cannot be empty");
      return;
    }
    comment_form.reset();
    console.log(comment_body);
    const resRaw = await fetch("/writeComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment_body,
        recipeId: recipe._id,
      }),
    });

    const res = await resRaw.text();
    console.log("?", resRaw, resRaw.ok);
    if (!resRaw.ok) {
      window.location.href = "/index.html";
    } else {
      location.reload(); 
    }
  });

  // set comment form properties
  comment_input_box.setAttribute("placeholder", "Add a comment...");
  comment_input_box.setAttribute("type", "text");
  comment_input_box.setAttribute("name", "comment");

  post_btn.innerText = "post";
  post_btn.setAttribute("type", "submit");

  comment_form.appendChild(comment_input_box);
  comment_form.appendChild(post_btn);

  divR.append(comments);
  divR.append(comment_form);

  divRecipes.append(divR);
  return divRecipes;
}

async function reloadRecipes() {
  const resRaw = await fetch("./getRecipes");

  if (!resRaw.ok) {
    window.location.href = "/index.html";
    console.log(resRaw);
    return;
  }
  const res = await resRaw.json();

  if (res.error) {
    showError(res.error);
    return;
  }
  console.log("got recipes", res);

  //divRecipes.innerHTML = "";
  res.recipes.forEach(renderRecipe);
}

reloadRecipes();