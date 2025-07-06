addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    prestigePower: new Decimal(0),
    }},
    passiveGeneration(){
      let p = new Decimal(0)
      if (player.a.auto1.eq(1)) p = p.add(tmp.a.auto1.div(100))
      return p
    },
    onPrestige(){
      if (hasUpgrade('p', 15)) {
        player.p.prestigePower = player.p.prestigePower.add(player.points.pow(0.2))
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

      "blank",

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

      ["display-text", function() { return "You have <h2>" + format(player.p.prestigepower) + " Prestige Power"]

      "blank",

      "prestige-button",

      "resource-display",

      ["display-text", function() { return "Prestige Power. This new currency can boost other prestige upgrades!" }],

      "blank",

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

        description(){ return "Why do we keep on adding new features this early?" },

        cost: new Decimal(35),

        unlocked(){ return hasUpgrade('p', 14) },

      },
    },
})
