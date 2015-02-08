function AddLookup() {
  setTimeout(this.mount.bind(this), 3000);
}

AddLookup.prototype.mount = function () {
  this.el = document.getElementById('addressBox');
  this.savedEl = document.getElementById('savedAddresses');
  this.submitBtn = document.getElementById('submitAddress');
  this.numVisitsEl = document.getElementById('numVisits');
  new google.maps.places.Autocomplete(this.el);
  console.log('Autocomplete mounted');
  this.submitBtn.onclick = this.appendAddress.bind(this);
};

AddLookup.prototype.appendAddress = function () {
  var addEl = document.createElement('div');
  addEl.innerHTML = this.el.value + ': ' + this.numVisitsEl.value +
    ' times per month';
  this.savedEl.appendChild(addEl);
  this.el.value = '';
  this.numVisitsEl.value = '';
};

new AddLookup();
