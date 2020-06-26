let dataService = {
  getField(name) {
    return localStorage.hasOwnProperty(name) ? localStorage.getItem(name) : null;
  },

  setField(name, value) {
    localStorage.setItem(name, value);
  }
}

export default dataService;