// document.addEventListener(
//   "DOMContentLoaded",
//   () => {
//     const profileAboutPen = document.querySelector(
//       ".user-profile__about-header--edit"
//     );
//     const profileProjectsPlus = document.querySelector(
//       ".user-profile__projects-header--edit"
//     );

//     const userAbout = document.querySelector(".user-profile__about--text");
//     const userAboutTexta = document.querySelector(
//       ".user-profile__about--textarea"
//     );
//     const userUpdateBtns = document.querySelectorAll(".btn__edit-container");
//     const aboutIcon = document.querySelector(
//       ".user-profile__about-header--edit"
//     );
//     const projectForm = document.querySelector("#project-div");

//     let editingAbout = false;

// const dropdownBars = document.querySelector(".navbar__dropdown");
// const dropdownMenu = document.querySelector(".navbar__dropdown-box");

// dropdownBars.addEventListener("click", () => {
//   console.log("bars clicked");
//   dropdownMenu.classList.toggle("no-display");
// });

//     profileAboutPen.addEventListener("click", () => {
//       editingAbout = !editingAbout;

//       // Trocando o display entre o About atual e o TextArea p/ edicação
//       userAbout.classList.toggle("no-display");
//       userAboutTexta.classList.toggle("no-display");
//       userAboutTexta.classList.toggle("display-block");
//       userAboutTexta.value = userAbout.innerHTML.trim();

//       // Mostrando o botão para salvar o update
//       userUpdateBtns[0].classList.toggle("no-display");

//       //
//       if (editingAbout) {
//         aboutIcon.src = "../images/x.svg";
//       } else {
//         aboutIcon.src = "../images/edit_pencil.svg";
//       }
//     });

//     profileProjectsPlus.addEventListener("click", () => {
//       // editingProject = !editingProject

//       projectForm.classList.toggle("no-display");
//       // console.log("clicked plus");

//       // location.href = "profile/newProject";
//     });

//     console.log("IronGenerator JS imported successfully!");
//   },
//   false
// );

document.addEventListener(
  "DOMContentLoaded",
  () => {
    // =================================== PROFILE ONLY SCRIPT ====================
    // Avatar
    // const profileImageFile = document.querySelector(
    //   ".user-profile__image-edit--input"
    // );
    // const profileImageSave = document.querySelector(
    //   ".user-profile__image-edit--save"
    // );
    // const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dtnyvpbht/upload";
    // const CLOUDINARY_UPLOAD_PRESET = "xf9gyj7q";
    // // Edit btns
    // const profileAboutPen = document.querySelector(
    //   ".user-profile__about-header--edit"
    // );
    // const profileProjectsPlus = document.querySelector(
    //   ".user-profile__projects-header--edit"
    // );
    // // About
    // const userAbout = document.querySelector(".user-profile__about--text");
    // const userAboutTexta = document.querySelector(
    //   ".user-profile__about--textarea"
    // );
    // const aboutIcon = document.querySelector(
    //   ".user-profile__about-header--edit"
    // );
    // const userUpdateBtns = document.querySelectorAll(".btn__edit-container");
    // let editingAbout = false;
    // // Projects
    // const projectForm = document.querySelector("#project-div");
    // let file;
    // let formData;
    // profileImageFile.addEventListener("change", e => {
    //   file = e.target.files[0];
    //   formData = new FormData();
    //   formData.append("file", file);
    //   formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    // });
    // profileImageSave.addEventListener("click", () => {
    //   // Adicionando a foto ao Cloudinary
    //   axios({
    //     url: CLOUDINARY_URL,
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     data: formData
    //   })
    //     .then(res => {
    //       console.log(res);
    //       // Passando a referência ao banco de dados
    //       axios
    //         .post("http://localhost:3000/profile-edit-image", {
    //           data: res.data.secure_url
    //         })
    //         .then(log => console.log(log))
    //         .catch(err => {
    //           throw new Error(err);
    //         });
    //     })
    //     .catch(err => {
    //       throw new Error(err);
    //     });
    // });
    // profileAboutPen.addEventListener("click", () => {
    //   editingAbout = !editingAbout;
    //   // Trocando o display entre o About atual e o TextArea p/ edicação
    //   userAbout.classList.toggle("no-display");
    //   userAboutTexta.classList.toggle("no-display");
    //   userAboutTexta.classList.toggle("display-block");
    //   userAboutTexta.value = userAbout.innerHTML.trim();
    //   // Mostrando o botão para salvar o update
    //   userUpdateBtns[0].classList.toggle("no-display");
    //   //
    //   if (editingAbout) {
    //     aboutIcon.src = "../images/x.svg";
    //   } else {
    //     aboutIcon.src = "../images/edit_pencil.svg";
    //   }
    // });
    // profileProjectsPlus.addEventListener("click", () => {
    //   // editingProject = !editingProject
    //   projectForm.classList.toggle("no-display");
    //   // console.log("clicked plus");
    //   // location.href = "profile/newProject";
    // });
    // ====================================================================================
  },
  false
);
