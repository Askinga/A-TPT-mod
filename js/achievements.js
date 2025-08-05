addLayer("achievements", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏆", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "yellow",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "achievements", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    boost(){
      return new Decimal(1.1).pow(player.achievements.achievements.length)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: [
      ["display-text", function(){ return "You have " + format(player.achievements.achievements.length) + "/54 achievements, giving you a x" + format(tmp.achievements.boost) + " point boost" }],
      "blank",
      "achievements"
    ],
    tooltip(){
      return ''+format(player.achievements.points)+"/54 achievements"
    },
    update(diff) {
      player.achievements.points = player.a.achievements.length
    },
    achievements: {
      11: {
        name: "Ach. 1",
        done() { return player.points.gte(1) },
        tooltip: "Get your first point"
      },
      12: {
        name: "Ach. 2",
        done() { return hasUpgrade('p', 11) },
        tooltip: "Buy the first prestige upgrade"
      },
      13: {
        name: "Ach. 3",
        done() { return hasUpgrade('p', 12) },
        tooltip: "Buy the second prestige upgrade"
      },
      14: {
        name: "Ach. 4",
        done() { return hasUpgrade('p', 13) },
        tooltip: "Buy the third prestige upgrade"
      },
      15: {
        name: "Ach. 5",
        done() { return hasUpgrade('p', 14) },
        tooltip: "Buy the fourth prestige upgrade"
      },
      16: {
        name: "Ach. 6",
        done() { return hasUpgrade('p', 15) },
        tooltip: "Unlock Prestige Power by buying the fifth prestige upgrade"
      },
      21: {
        name: "Ach. 7",
        done() { return hasUpgrade('p', 25) },
        tooltip: "Buy the tenth prestige upgrade"
      },
      22: {
        name: "Ach. 8",
        done() { return hasUpgrade('p', 35) },
        tooltip: "Buy the fifteenth prestige upgrade"
      },
      23: {
        name: "Ach. 9",
        done() { return hasUpgrade('p', 45) },
        tooltip: "Unlock Levels by buying the twentieth prestige upgrade"
      },
    },
})
