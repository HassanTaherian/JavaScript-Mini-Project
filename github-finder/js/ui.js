function checkIfNull(...args) {
  args = args.map(arg =>
    arg === null ? 'N/A' : arg
  )

  console.log(args);
  return args;
}

class UI {
  constructor() {
    this.searchUsers = document.getElementById('search-users');
    this.userInput = document.querySelector('#search-users-form input');
    this.repos = document.querySelector('#latest-repos .repos');

    this.userAvatar = document.querySelector('.user-avatar');
    this.profileLink = document.querySelector('.profile-link');
    this.publicRepos = document.querySelector('.public-repos');
    this.publicGists = document.querySelector('.public-gists');
    this.followers = document.querySelector('.followers');
    this.following = document.querySelector('.following');
    this.company = document.querySelector('.company');
    this.blog = document.querySelector('.blog');
    this.location = document.querySelector('.location');
    this.memberSince = document.querySelector('.member-since');

    this.repoLink = document.querySelectorAll('.repo-link');
    this.stars = document.querySelectorAll('.stars');
    this.watchs = document.querySelectorAll('.watchs');
    this.forks = document.querySelectorAll('.forks');
  }

  paintUserProfile(userProfile) {
    let {
      avatar_url: avatarURL,
      public_repos: publicRepos,
      public_gists: publicGists,
      followers,
      following,
      company,
      blog,
      location,
      html_url: htmlURL,
      created_at: createdAt
    } = userProfile;

    [company, blog, location] = checkIfNull(company, blog, location);
    this.userAvatar.setAttribute('src', avatarURL);

    this.publicRepos.textContent = `Public Repos: ${publicRepos}`;
    this.publicGists.textContent = `Public Gists: ${publicGists}`;
    this.followers.textContent = `Followers: ${followers}`;
    this.following.textContent = `Following: ${following}`;

    this.company.textContent = `Company: ${company}`;

    this.blog.innerHTML = `Blog: <a href="${blog}" class="btn btn-link p-0 text-lowercase">${blog}</a>`;

    this.location.textContent = `Location: ${location}`;
    this.memberSince.textContent = `Member Since: ${createdAt}`;

    this.profileLink.setAttribute('href', htmlURL);
    this.profileLink.textContent = 'View Profile';
  }

  paintRepos(repos) {
    console.log(repos)
    repos.forEach(repo => {
      let { name, forks, stargazers_count: stars, watchers, html_url: htmlUrl, description } = repo;
      [description] = checkIfNull(description);
      const template = `          
      <div class="list-group-item repo">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <a href="${htmlUrl}" class="btn btn-link btn-lg repo-link p-0">${name}</a>

        <div class="repo-info d-flex align-items-center">
          <div class="stars badge badge-warning p-2 badge-pill mr-3">
            Stars: ${stars}
          </div>

          <div class="watchs badge badge-success p-2 badge-pill mr-3">
            Watchs: ${watchers}
          </div>
          <div class="forks badge badge-info p-2 badge-pill">
            Forks: ${forks}
          </div>
        </div>
      </div>
      <p>
      ${description}
      </p>
    </div>
    `;

      this.repos.innerHTML += template;
    })
  }

  toggleInfo() {
    const info = document.querySelector('#results');
    info.classList.toggle('d-none');
  }

  clearInfo() {
    this.repos.innerHTML = '';
  }

  displayAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger';
    alert.textContent = message;
    ui.searchUsers.querySelector('.container').insertAdjacentElement('afterbegin', alert);
    setTimeout(() => {
      ui.searchUsers.querySelector('.alert').remove();
    }, 3000);
  }
}