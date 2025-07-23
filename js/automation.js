addLayer("a", {
  name: "automation", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0),
      auto1: new Decimal(0),
      auto2: new Decimal(0),
      auto3: new Decimal(0),
      auto4: new Decimal(0),
      auto5: new Decimal(0),
      auto6: new Decimal(0),
      auto7: new Decimal(0),
      auto8: new Decimal(0),
      lost: new Decimal(0),
    };
  },
  color: "#a0a0a0",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "automation power", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 1, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  tabFormat: {
    "Automations": {
      content: [
      "main-display",
      "prestige-button",
      "resource-display",
      ["display-text", function() { return "You are losing " + format(player.a.lost) + " AP per second. Also (almost) all automations are based on AP.<br>Automations! Control the automations in this tab. However, all automations cost Automation Power (AP) to operate. Later automations cost more AP per second so start grinding AP!" }],
      "blank",
      "clickables",
      "blank"
      ],
    },
  },
  prestigeButtonText() {

    return (

      "Sacrifice all your points to AP, but divided by 10."

    );

  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: "side", // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "a",
      description: "A: Reset for AP",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return hasUpgrade("p", 13) || player.a.unlocked;
  },
  auto1(){
    if (player.a.points.lt(0)) {
      return new Decimal(0)
    } else {
      return player.a.points.add(1).log10().add(1)
    }
  },
  auto3(){
    if (player.a.points.lt(0)) {
      return new Decimal(0)
    } else {
      return player.a.points.add(1).log10().add(1).times(0.2)
    }
  },
  auto4(){
    if (player.a.points.lt(0)) {
      return new Decimal(0)
    } else {
      return player.a.points.add(1).log10().add(1).times(0.08)
    }
  },
  auto5(){
    if (player.a.points.lt(0)) {
      return new Decimal(0)
    } else {
      return player.a.points.add(1).log10().add(1).times(0.02)
    }
  },
  auto2(){
    if (player.a.points.lt(0)) {

      return new Decimal(0)

    } else {

      return player.a.points.add(1).log10().add(1).times(2)

    }
  },
  branches: ["p"],
  clickables: {

    11: {

        display() {
          let or = 'OFF'
          if (player.a.auto1.eq(0)) {
            or = 'OFF'
          } else {
            or = 'ON'
          }
          return format(tmp.a.auto1) + "% PP gain per second.<br>Cost: 1 AP per second.<br><h2>" + or 
        },
        canClick(){ return player.a.points.gte(1) },
        onClick(){
          if (player.a.auto1.eq(0)) {
            player.a.auto1 = new Decimal(1)
          } else {
            player.a.auto1 = new Decimal(0)
          }
        },
    },
    
    12: {
        unlocked(){ return hasUpgrade('p', 15) },
        display() {
          let or = 'OFF'
          if (player.a.auto2.eq(0)) {
            or = 'OFF'
          } else {
            or = 'ON'
          }
          return format(tmp.a.auto2) + "% Prestige Power gain per second.<br>Cost: 10 AP per second.<br><h2>" + or 
        },
        canClick(){ return player.a.points.gte(1) },      
        onClick(){
          if (player.a.auto2.eq(0)) {
            player.a.auto2 = new Decimal(1)
          } else {
            player.a.auto2 = new Decimal(0)
          }
        },
    },
    13: {
        unlocked(){ return hasMilestone('l', 2) },
        display() {
          let or = 'OFF'
          if (player.a.auto3.eq(0)) {
            or = 'OFF'
          } else {
            or = 'ON'
          }
          return "Automate Prestige Upgrades.<br>Cost: 1e12 AP per second.<br><h2>" + or 
        },
        canClick(){ return player.a.points.gte(1e12) },      
        onClick(){
          if (player.a.auto3.eq(0)) {
            player.a.auto3 = new Decimal(1)
          } else {
            player.a.auto3 = new Decimal(0)
          }
        },
    },
    14: {
        unlocked(){ return hasMilestone('l', 5) },
        display() {
          let or = 'OFF'
          if (player.a.auto4.eq(0)) {
            or = 'OFF'
          } else {
            or = 'ON'
          }
          return "Automate first 3 Prestige Buyables.<br>Cost: 1e20 AP per second.<br><h2>" + or 
        },
        canClick(){ return player.a.points.gte(1e20) },      
        onClick(){
          if (player.a.auto4.eq(0)) {
            player.a.auto4 = new Decimal(1)
          } else {
            player.a.auto4 = new Decimal(0)
          }
        },
    },
    21: {
        unlocked(){ return hasUpgrade('u', 12) },
        display() {
          let or = 'OFF'
          if (player.a.auto5.eq(0)) {
            or = 'OFF'
          } else {
            or = 'ON'
          }
          return "Automate Levels, they reset nothing and you can buy max them.<br>Cost: 1e45 AP per second.<br><h2>" + or 
        },
        canClick(){ return player.a.points.gte(1e45) },      
        onClick(){
          if (player.a.auto5.eq(0)) {
            player.a.auto5 = new Decimal(1)
          } else {
            player.a.auto5 = new Decimal(0)
          }
        },
    },
    22: {
        unlocked(){ return hasUpgrade('u', 12) },
        display() {
          let or = 'OFF'
          if (player.a.auto6.eq(0)) {
            or = 'OFF'
          } else {
            or = 'ON'
          }
          return format(tmp.a.auto3) + "% SP gain per second, and autobuy SP upgrades and keep its challenges.<br>Cost: 1e50 AP per second.<br><h2>" + or 
        },
        canClick(){ return player.a.points.gte(1e50) },      
        onClick(){
          if (player.a.auto6.eq(0)) {
            player.a.auto6 = new Decimal(1)
          } else {
            player.a.auto6 = new Decimal(0)
          }
        },
    },
    31: {
        unlocked(){ return hasUpgrade('fo', 12) },
        display() {
          let or = 'OFF'
          if (player.a.auto7.eq(0)) {
            or = 'OFF'
          } else {
            or = 'ON'
          }
          return format(tmp.a.auto4) + "% UP gain per second.<br>Cost: 1e125 AP per second.<br><h2>" + or 
        },
        canClick(){ return player.a.points.gte(1e125) },      
        onClick(){
          if (player.a.auto7.eq(0)) {
            player.a.auto7 = new Decimal(1)
          } else {
            player.a.auto7 = new Decimal(0)
          }
        },
    },
    32: {
        unlocked(){ return hasUpgrade('fo', 33) },
        display() {
          let or = 'OFF'
          if (player.a.auto8.eq(0)) {
            or = 'OFF'
          } else {
            or = 'ON'
          }
          return format(tmp.a.auto5) + "% Damage to Enemy per second. and defeating a Enemy increases the Enemy Stage by 1.<br>Cost: 1e400 AP per second.<br><h2>" + or 
        },
        canClick(){ return player.a.points.gte("e400") },      
        onClick(){
          if (player.a.aut8.eq(0)) {
            player.a.auto8 = new Decimal(1)
          } else {
            player.a.auto8 = new Decimal(0)
          }
        },
    },
},
    update(diff) {
      if (player.a.points.lt(0)) {

          player.a.points = new Decimal(0)

          player.a.auto1 = new Decimal(0)
          player.a.auto2 = new Decimal(0)
          player.a.auto3 = new Decimal(0)
          player.a.auto4 = new Decimal(0)
          player.a.auto5 = new Decimal(0)
          player.a.auto6 = new Decimal(0)
          player.a.auto7 = new Decimal(0)
          player.a.auto8 = new Decimal(0)
      }
      
      let spend = new Decimal(0)
      if (player.a.auto1.eq(1)) spend = spend.add(1)
      if (player.a.auto2.eq(1)) spend = spend.add(10)
      if (player.a.auto3.eq(1)) spend = spend.add(1e12)
      if (player.a.auto4.eq(1)) spend = spend.add(1e20)
      if (player.a.auto5.eq(1)) spend = spend.add(1e45)
      if (player.a.auto6.eq(1)) spend = spend.add(1e50)
      if (player.a.auto7.eq(1)) spend = spend.add(1e125)
      if (player.a.auto8.eq(1)) spend = spend.add("e400")
      player.a.lost = spend
      spend = spend.times(diff)
      player.a.points = player.a.points.sub(spend)
    },
});
