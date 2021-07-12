class Snippet {

  constructor(baseUrl, name, expires_in, snippet) {
    this.url = baseUrl + "/" + name;
    this.name = name;
    this.expires_at = Date.now() + (expires_in*1000);
    this.snippet = snippet;
  }

  getCreateResponse() {
    return this;
  }

  hasExpired() {
    if (Date.now() > this.expires_at) {
      return true;
    } else {
      return false;
    }
  }

}

module.exports = Snippet;
