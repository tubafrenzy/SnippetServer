var dateFormat = require('dateformat');

class Snippet {

  constructor(baseUrl, name, expires_in, snippet) {
    this.url = baseUrl + "/" + name;
    this.name = name;
    this.expires_at = Date.now() + (expires_in*1000);
    this.snippet = snippet;
  }

  getFormattedResponse() {
    const formattedSnippet = new Object();
    formattedSnippet.url = this.url;
    formattedSnippet.name = this.name;
    formattedSnippet.expires_at = dateFormat(this.expires_at, "yyyy-MM-dd'T'HH:mm:ssZ");
    formattedSnippet.snippet = this.snippet;
    return formattedSnippet;
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
