const ui = new UI(),
  searchUserForm = document.getElementById('search-users-form');

searchUserForm.addEventListener('submit', async e => {
  e.preventDefault();

  const info = document.querySelector('#results');

  const username = ui.userInput.value;
  let userProfile, userRepos;
  const github = new GitHub(username);

  try {
    if (!username) {
      throw new EmptyField('username');
    }

    userProfile = await github.getUser();
    userRepos = await github.getRepos(5);
    if (info.classList.contains('d-none')) {
      ui.toggleInfo();
    }

    ui.clearInfo();
    ui.paintUserProfile(userProfile);
    ui.paintRepos(userRepos);
  } catch (e) {
    ui.displayAlert(e.message);
  }
});