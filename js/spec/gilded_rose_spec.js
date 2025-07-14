describe("Gilded Rose", function() {

  beforeEach(function() {
    // reset the *global* items array before each test
    items = [];
  });

  function updateOnce(item) {
    // overwrite the global items with just our test item
    items = [ item ];
    update_quality();
    return items[0];
  }

  it("degrades normal items by 1 before sell date", function() {
    var updated = updateOnce(new Item("Normal Item", 5, 10));
    expect(updated.sell_in).toBe(4);
    expect(updated.quality).toBe(9);
  });

  it("degrades normal items twice as fast after sell date", function() {
    var updated = updateOnce(new Item("Normal Item", 0, 10));
    expect(updated.sell_in).toBe(-1);
    expect(updated.quality).toBe(8);
  });

  it("never lets quality go negative", function() {
    var updated = updateOnce(new Item("Normal Item", 5, 0));
    expect(updated.quality).toBe(0);
  });

  it("increases Aged Brie quality over time", function() {
    var updated = updateOnce(new Item("Aged Brie", 2, 0));
    expect(updated.sell_in).toBe(1);
    expect(updated.quality).toBe(1);
  });

  it("increases Aged Brie quality twice as fast after sell date", function() {
    var updated = updateOnce(new Item("Aged Brie", 0, 0));
    expect(updated.sell_in).toBe(-1);
    expect(updated.quality).toBe(2);
  });

  it("never increases quality above 50 for any item except Sulfuras", function() {
    var brie = new Item("Aged Brie", 5, 50);
    var pass = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50);

    items = [ brie ];
    update_quality();
    expect(brie.quality).toBe(50);

    items = [ pass ];
    update_quality();
    expect(pass.quality).toBe(50);
  });

  it("Sulfuras never alters sell_in or quality", function() {
    var updated = updateOnce(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    expect(updated.sell_in).toBe(0);
    expect(updated.quality).toBe(80);
  });

  describe("Backstage passes", function() {

    it("increases quality by 1 when sell_in > 10", function() {
      var updated = updateOnce(new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20));
      expect(updated.quality).toBe(21);
    });

    it("increases quality by 2 when 6 <= sell_in <= 10", function() {
      var updated = updateOnce(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20));
      expect(updated.quality).toBe(22);
    });

    it("increases quality by 3 when 1 <= sell_in <= 5", function() {
      var updated = updateOnce(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20));
      expect(updated.quality).toBe(23);
    });

    it("drops quality to 0 after the concert", function() {
      var updated = updateOnce(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
      expect(updated.quality).toBe(0);
    });

  });

  it("conjured items degrade in quality twice as fast before sell date", function() {
    var updated = updateOnce(new Item("Conjured Mana Cake", 3, 6));
    expect(updated.sell_in).toBe(2);
    expect(updated.quality).toBe(4);
  });

  it("conjured items degrade in quality four times as fast after sell date", function() {
    var updated = updateOnce(new Item("Conjured Mana Cake", 0, 6));
    expect(updated.sell_in).toBe(-1);
    expect(updated.quality).toBe(2);
  });

});
