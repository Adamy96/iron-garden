document.addEventListener('DOMContentLoaded', () => {

  const profileAboutPen = document.querySelector('.user-profile__about-header--edit');
  const profileProjectsPlus = document.querySelector('.user-profile__projects-header--edit');

  const userAbout = document.querySelector('.user-profile__about--text');
  const userAboutTexta = document.querySelector('.user-profile__about--textarea');
  const userUpdateBtns = document.querySelectorAll('.btn__edit-container');
  const aboutIcon = document.querySelector('.user-profile__about-header--edit');

  let editingAbout = false;

  profileAboutPen.addEventListener('click', () => {
    editingAbout = !editingAbout;

    // Trocando o display entre o About atual e o TextArea p/ edicação
    userAbout.classList.toggle('no-display');
    userAboutTexta.classList.toggle('no-display');
    userAboutTexta.classList.toggle('display-block');
    userAboutTexta.value = userAbout.innerHTML.trim();

    // Mostrando o botão para salvar o update
    userUpdateBtns[0].classList.toggle('no-display');

    //
    if (editingAbout) {
      aboutIcon.src = "../images/x.svg";
    } else {
      aboutIcon.src = "../images/edit_pencil.svg";
    }
    
  });



  profileProjectsPlus.addEventListener('click', () => {
    console.log('clicked plus');

    location.href="profile/newProject";
    
  });

  console.log('IronGenerator JS imported successfully!');

}, false);
