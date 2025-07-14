function Item(name, sell_in, quality) {
  this.name    = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

// clamp between min and max
function clamp(q, min, max) {
  return q < min ? min : q > max ? max : q;
}

var items = [];

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    // 1. Legendary items never change
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      continue;
    }

    // 2. Decrement sell_in
    item.sell_in--;

    // 3. Figure out how quality should change
    var change;
    var isConjured = item.name.toLowerCase().startsWith('conjured');

    if (item.name === 'Aged Brie') {
      change = 1 + (item.sell_in < 0 ? 1 : 0);
    }
    else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.sell_in < 0) {
        item.quality = 0;
        continue;
      }
      change = 1 + (item.sell_in < 10 ? 1 : 0) + (item.sell_in < 5 ? 1 : 0);
    }
    else {
      // normal degrade is -1 before, -2 after
      change = item.sell_in < 0 ? -2 : -1;
      if (isConjured) change *= 2;  // -2 or -4
    }

    // 4. Apply and clamp between 0 and 50
    item.quality = clamp(item.quality + change, 0, 50);
  }
}
