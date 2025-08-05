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
      24: {
        name: "Ach. 10",
        done() { return player.l.points.gte(1) },
        tooltip: "Get your first level"
      },
      25: {
        name: "Ach. 11",
        done() { return player.l.points.gte(2) },
        tooltip: "Get your second level"
      },
      26: {
        name: "Ach. 12",
        done() { return player.l.points.gte(5) },
        tooltip: "Get your fifth level"
      },
      31: {
        name: "Ach. 13",
        done() { return player.l.points.gte(10) },
        tooltip: "Get your tenth level"
      },
      32: {
        name: "Ach. 14",
        done() { return player.s.points.gte(1) },
        tooltip: "Get your first super prestige point"
      },
      33: {
        name: "Ach. 15",
        done() { return hasUpgrade('s', 12) },
        tooltip: "Buy the second super prestige upgrade"
      },
      34: {
        name: "Ach. 16",
        done() { return hasChallenge('s', 11) },
        tooltip: "Beat the first super prestige challenge"
      },
      35: {
        name: "Ach. 17",
        done() { return hasChallenge('s', 12) },
        tooltip: "Beat the second super prestige challenge"
      },
      36: {
        name: "Ach. 18",
        done() { return player.f.unlocked },
        tooltip: "Unlock Fighting"
      },
      41: {
        name: "Ach. 19",
        done() { return hasUpgrade('f', 13) },
        tooltip: "Buy the third fighting upgrade"
      },
      42: {
        name: "Ach. 20",
        done() { return hasUpgrade('f', 15) },
        tooltip: "Buy the fifth fighting upgrade"
      },
      43: {
        name: "Ach. 21",
        done() { return hasUpgrade('f', 15) },
        tooltip: "Buy the fifth fighting upgrade"
      },
      44: {
        name: "Ach. 22",
        done() { return hasUpgrade('f', 25) },
        tooltip: "Buy the tenth fighting upgrade"
      },
      45: {
        name: "Ach. 23",
        done() { return hasUpgrade('f', 33) },
        tooltip: "Buy the thirteenth fighting upgrade"
      },
      46: {
        name: "Ach. 24",
        done() { return player.u.unlocked },
        tooltip: "Unlock Ultra Prestige"
      },
      51: {
        name: "Ach. 25",
        done() { return hasUpgrade('u', 12) },
        tooltip: "Buy the second ultra prestige upgrade"
      },
      52: {
        name: "Ach. 26",
        done() { return hasUpgrade('u', 14) },
        tooltip: "Buy the fourth ultra prestige upgrade"
      },
      53: {
        name: "Ach. 27",
        done() { return hasUpgrade('u', 21) },
        tooltip: "Buy the sixth ultra prestige upgrade"
      },
      54: {
        name: "Ach. 28",
        done() { return hasUpgrade('u', 22) },
        tooltip: "Buy the seventh ultra prestige upgrade"
      },
      55: {
        name: "Ach. 29",
        done() { return hasUpgrade('u', 23) },
        tooltip: "Buy the eighth ultra prestige upgrade"
      },
      56: {
        name: "Ach. 30",
        done() { return player.fo.unlocked },
        tooltip: "Unlock the Formula"
      },
      61: {
        name: "Ach. 31",
        done() { return player.fo.stage.eq(1) },
        tooltip: "Reach Formula Stage 1"
      },
      62: {
        name: "Ach. 32",
        done() { return hasUpgrade('fo', 11) },
        tooltip: "Buy the first formula upgrade"
      },
      63: {
        name: "Ach. 33",
        done() { return hasUpgrade('fo', 13) },
        tooltip: "Buy the third formula upgrade"
      },
      64: {
        name: "Ach. 34",
        done() { return hasUpgrade('fo', 14) },
        tooltip: "Buy the fourth formula upgrade"
      },
      65: {
        name: "Ach. 35",
        done() { return player.fo.stage.eq(2) },
        tooltip: "Reach Formula Stage 2"
      },
      66: {
        name: "Ach. 36",
        done() { return hasUpgrade('fo', 15) },
        tooltip: "Buy the fifth formula upgrade"
      },
      71: {
        name: "Ach. 37",
        done() { return hasUpgrade('fo', 22) },
        tooltip: "Buy the seventh formula upgrade"
      },
      72: {
        name: "Ach. 38",
        done() { return hasUpgrade('fo', 25) },
        tooltip: "Buy the tenth formula upgrade"
      },
      73: {
        name: "Ach. 39",
        done() { return player.fo.stage.eq(3) },
        tooltip: "Reach Formula Stage 3"
      },
      74: {
        name: "Ach. 40",
        done() { return hasUpgrade('fo', 32) },
        tooltip: "Buy the twelfth formula upgrade"
      },
      75: {
        name: "Ach. 41",
        done() { return hasUpgrade('fo', 34) },
        tooltip: "Buy the fourteenth formula upgrade"
      },
      76: {
        name: "Ach. 42",
        done() { return player.i.unlocked },
        tooltip: "Unlock Formula Boosters"
      },
      81: {
        name: "Ach. 43",
        done() { return hasUpgrade('i', 11) },
        tooltip: "Buy the first formula booster upgrade"
      },
      82: {
        name: "Ach. 44",
        done() { return hasUpgrade('i', 13) },
        tooltip: "Buy the third formula booster upgrade"
      },
      83: {
        name: "Ach. 45",
        done() { return hasUpgrade('i', 21) },
        tooltip: "Buy the sixth formula booster upgrade"
      },
      84: {
        name: "Ach. 46",
        done() { return hasUpgrade('i', 25) },
        tooltip: "Buy the tenth formula booster upgrade"
      },
      85: {
        name: "Ach. 47",
        done() { return hasUpgrade('i', 34) },
        tooltip: "Buy the fourteenth formula booster upgrade"
      },
      86: {
        name: "Ach. 48",
        done() { return player.st.unlocked },
        tooltip: "Unlock the Star"
      },
      91: {
        name: "Ach. 49",
        done() { return hasUpgrade('st', 11) },
        tooltip: "Buy the first star upgrade"
      },
      92: {
        name: "Ach. 50",
        done() { return hasChallenge('st', 11) },
        tooltip: "Beat the first star challenge"
      },
      93: {
        name: "Ach. 51",
        done() { return hasUpgrade('st', 15) },
        tooltip: "Buy the fifth star upgrade"
      },
      94: {
        name: "Ach. 52",
        done() { return hasUpgrade('st', 22) },
        tooltip: "Buy the seventh star upgrade"
      },
      95: {
        name: "Ach. 53",
        done() { return hasUpgrade('st', 23) },
        tooltip: "Buy the eighth star upgrade"
      },
      96: {
        name: "Ach. 54",
        done() { return hasUpgrade('st', 25) },
        tooltip: "Buy Upgrade 100!"
      },
    },
})
