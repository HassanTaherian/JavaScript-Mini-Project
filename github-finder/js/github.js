class GitHub {
  constructor(username) {
    this.username = username;
    this.clientID = '1ddabbd6180710fa1a0e';
    this.clientSecret = 'c143007683eefe6012f00e699e4953d5b87d2a6d';
  }

  async getUser() {
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.username}?client_id=${this.clientID}&client_secret=${this.clientSecret}`
      );

      if (res.status === 404) {
        throw new NotFoundError();
      }

      const profile = await res.json();
      console.log(profile);
      return profile;
    } catch (e) {

      if (e instanceof TypeError) {
        throw new NetworkError();
      } else {
        throw e;
      }

    }
  }

  async getRepos(limit = 5) {
    const res = await fetch(
      `https://api.github.com/users/${this.username}/repos?per_page=${limit}&client_id=${this.clientID}&client_secret=${this.clientSecret}`
    );

    if (res.status === 404) {
      throw new NotFoundError();
    }


    const data = await res.json();

    return data;
  }

}