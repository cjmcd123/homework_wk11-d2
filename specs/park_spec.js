const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {

  var park;

  beforeEach(function () {
    park = new Park("Jurassic Park", 20.00);
    park2 = new Park("Jurassic Park the Second", 25.00);
    dino = new Dinosaur('t-rex', 'carnivore', 50);
    park2.add(dino);
    dino2 = new Dinosaur('raptor', 'onmivore', 75);
    park2.add(dino2);
    dino3 = new Dinosaur('raptor', 'onmivore', 75);
    park2.add(dino3);
  })

  it('should have a name', function(){
    assert.strictEqual(park.name, "Jurassic Park");
  });

  it('should have a ticket price', function(){
    assert.strictEqual(park.price, 20.00);
  });

  it('should have a collection of dinosaurs', function() {
    assert.deepStrictEqual(park.dinosaurs, []);
  });

  it('should be able to add a dinosaur to its collection', function() {
    dino = new Dinosaur('t-rex', 'carnivore', 50);
    park.add(dino);
    assert.deepStrictEqual(park.dinosaurs.length, 1);
  });

  it('should be able to remove a dinosaur from its collection', function() {
    dino = new Dinosaur('t-rex', 'carnivore', 50);
    park.add(dino);
    park.remove(dino);
    assert.deepStrictEqual(park.dinosaurs.length, 0);
  });

  it('should be able to find the dinosaur that attracts the most visitors', function() {
    dino = new Dinosaur('t-rex', 'carnivore', 50);
    park.add(dino);
    dino2 = new Dinosaur('raptor', 'onmivore', 75);
    park.add(dino2);
    assert.strictEqual(park.greatestDino(), dino2);
  });

  it('should be able to find all dinosaurs of a particular species', function() {
    assert.deepStrictEqual(park2.findAllOfSpecies("raptor"), [dino2, dino3]);
  });

  it('should be able to remove all dinosaurs of a particular species', function() {
    park2.removeAllOfSpecies("raptor");
    assert.deepStrictEqual(park2.dinosaurs.length, 1);
  });

  it('Calculate the total number of visitors per day', function() {
    assert.strictEqual(park2.totalVisitorsPerDay(), 200);
  });

  it('Calculate the total number of visitors per year', function() {
    assert.strictEqual(park2.totalVisitorsPerYear(), 73000);
  });

  it('Calculate the total revenue from ticket sales for one year', function() {
    assert.strictEqual(park2.totalRevenuePerYear(), 1825000);
  });

  it('Provide an object containing each of the diet types and the number of dinosaurs in the park of that diet type', function() {
    dino = new Dinosaur('Ankylosaurus', 'herbivore', 30);
    park2.add(dino);
    let outcome = new Map();
    outcome.set("carnivore", 1);
    outcome.set("herbivore", 1);
    outcome.set("omnivore", 2);
    assert.deepStrictEqual(park2.countTypes(), outcome);
  });

});
