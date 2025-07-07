addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    prestigePower: new Decimal(0),
    pPowerGain: new Decimal(0),
    }},
    passiveGeneration(){
      let p = new Decimal(0)
      if (player.a.auto1.eq(1)) p = p.add(tmp.a.auto1.div(100))
      return p
    },
    onPrestige(){
      let gain = player.points.pow(0.25)
      if (hasUpgrade('p', 15)) {
        player.p.prestigePower = player.p.prestigePower.add(gain)
      }
    },
    color: "#00aaff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    tabFormat: {

    "Main": {

      content: [

      "main-display",

      "prestige-button",

      "resource-display",

      ["display-text", function() { return "Prestige. The first start of the game." }],

      "blank",

      "upgrades",

      "blank"

      ],

    },
    "Prestige Power": {
      unlocked(){ return hasUpgrade('p', 15) },
      content: [

      ["display-text", function() { return "You have <span style=\" color: rgb(0, 200, 255); text-shadow: rgb(0, 200, 255) 0px 0px 10px\"><h2>" + format(player.p.prestigePower) + "</h2></span> Prestige Power"}],

      "blank",

      "prestige-button",

      "resource-display",
      ["display-text", function() { return "You will gain " + format(player.p.pPowerGain) + " Prestige Power on reset."}],

      ["display-text", function() { return "Prestige Power. This new currency can buy Prestige Buyables, boosting progression!"}],

      "blank",

      "buyables",
        
      "blank"

      ],

    },

  },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
      11: {
        title: "The first upgrade (1)",
        description: "Basically doubles your point gain.",
        cost: new Decimal(1)
      },
      12: {

        title: "An ordinary upgrade (2)",

        description(){ return "x2.5 your point gain? No, Triple it." },

        cost: new Decimal(3),
        
        unlocked(){ return hasUpgrade('p', 11) },
      },
      13: {

        title: "What? (3)",

        description(){ return "Unlock Automation this early? With something new." },

        cost: new Decimal(10),

        unlocked(){ return hasUpgrade('p', 12) },

      },
      14: {

        title: "Based (4)",

        description(){ return "Add 1 to base point gain." },

        cost: new Decimal(15),

        unlocked(){ return hasUpgrade('p', 13) },

      },
      15: {

        title: "Prestige power (5)",

        description(){ return "Why do we keep on adding new features this early? And unlock a new automation." },

        cost: new Decimal(35),

        unlocked(){ return hasUpgrade('p', 14) },

      },
      21: {

        title: "Based 2 (6)",

        description(){ return "Add 2 to base point gain." },

        cost: new Decimal(300),

        unlocked(){ return hasUpgrade('p', 15) },

      },
      22: {

        title: "Growing? (7)",

        description(){ return "Boost points based on b11 purchases." },

        cost: new Decimal(750),

        unlocked(){ return hasUpgrade('p', 21) },

        effect(){ return getBuyableAmount('p', 11).add(1).pow(0.5) },
        effectDisplay(){ return "x"+format(upgradeEffect('p', 22)) },
      },
      23: {

        title: "Growing. (8)",

        description(){ return "Boost points based on prestige points." },

        cost: new Decimal(3500),

        unlocked(){ return hasUpgrade('p', 22) },

        effect(){ return player.p.points.add(1).pow(0.2) },

        effectDisplay(){ return "x"+format(upgradeEffect('p', 23)) },

      },
      24: {

        title: "Growing! (9)",

        description(){ return "Boost points based on points." },

        cost: new Decimal(6000),

        unlocked(){ return hasUpgrade('p', 23) },

        effect(){ return player.points.add(1).pow(0.1) },

        effectDisplay(){ return "x"+format(upgradeEffect('p', 24)) },

      },
    },
    update(diff) {
        player.p.pPowerGain = player.points.pow(0.25)
        if (player.a.auto2.eq(1)) {
            player.p.prestigePower = player.p.prestigePower.add(player.p.pPowerGain.times(diff).times(tmp.a.auto2).div(100))
        }
    },
    buyables: {

    11: {
        title: "b11",
      
        cost(x) { return new Decimal(1.25).pow(x.pow(x.div(250).add(1))) },

        display() { return "x1.25 Points per level.<br>Cost: " + format(this.cost()) + " Prestige Power<br>Bought: " + format(getBuyableAmount('p', 11)) + "<br>Effect: x" + format(buyableEffect('p', 11)) + " Points"},

        canAfford() { return player[this.layer].prestigePower.gte(this.cost()) },

        buy() {

            player[this.layer].prestigePower = player[this.layer].prestigePower.sub(this.cost())

            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))

        },
        effect(x) {
          let base1 = new Decimal(1.25)
          let base2 = x
          let expo = new Decimal(1)
          return base1.pow(Decimal.pow(base2, expo))
        },
    },

},
})
