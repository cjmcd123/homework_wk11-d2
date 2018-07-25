const Park = function(name, price) {
  this.name = name;
  this.price = price;
  this.dinosaurs = [];
}

Park.prototype.add = function(dinosaur) {
  this.dinosaurs.push(dinosaur);
}

Park.prototype.remove = function(dinosaur) {
  let index = this.dinosaurs.indexOf(dinosaur);
  this.dinosaurs.splice(index, 1);
}

Park.prototype.greatestDino = function() {
  let popularity = 0;
  let result = null;
  for (let dinosaur of this.dinosaurs) {
    if (dinosaur.guestsAttractedPerDay > popularity) {
      result = dinosaur;
      popularity = dinosaur.guestsAttractedPerDay;
    }
  }
  return result;
}

Park.prototype.findAllOfSpecies = function(search) {
  let result = [];
  for (let dinosaur of this.dinosaurs) {
    if (dinosaur.species === search) {
      result.push(dinosaur);
    }
  }
  return result;
}

Park.prototype.removeAllOfSpecies = function(search) {
  let newDinosaurs = [];
  newDinosaurs = this.dinosaurs.filter(dino => dino.species != search);
  this.dinosaurs = newDinosaurs;
}

Park.prototype.totalVisitorsPerDay = function() {
  let result = 0;
  for (let dino of this.dinosaurs) {
    result += dino.guestsAttractedPerDay;
  }
  return result;
}

Park.prototype.totalVisitorsPerYear = function() {
  let visitorsPerDay = this.totalVisitorsPerDay();
  let result = 365 * visitorsPerDay;
  return result;
}

Park.prototype.totalRevenuePerYear = function() {
  let totalVisitors = this.totalVisitorsPerYear();
  let result = this.price * totalVisitors;
  return result;
}

Park.prototype.countTypes = function() {
  let carnivore = 0;
  let herbivore = 0;
  let omnivore = 0;
  for (let dino of this.dinosaurs) {
    if (dino.diet === "carnivore") {
      carnivore ++;
    } else if (dino.diet === "herbivore") {
      herbivore ++;
    } else {
      omnivore ++;
    }
  }
  let result = new Map();
  result.set("carnivore", carnivore);
  result.set("herbivore", herbivore);
  result.set("omnivore", omnivore);
  return result;
}

module.exports = Park;
