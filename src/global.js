String.prototype.capitalize = function() {
  return this.split('-').map(e => capitalizeWord(e)).join('-');
}

const capitalizeWord = word => word.charAt(0).toUpperCase() + word.slice(1);