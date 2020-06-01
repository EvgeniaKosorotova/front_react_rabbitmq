let dataService = {
  getField(name) {
    return localStorage.getItem(name);
  },

  setField(name, value) {
    localStorage.setItem(name, value);
  }
}

export default dataService;