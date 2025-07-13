// Placeholder layer
addLayer("f", {
    name: "fighting", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    damage: new Decimal(1),
    enemyHP: new Decimal(100),
    coins: new Decimal(0),
    enemyStartHP: new Decimal(100),
    stage: new Decimal(0),
    coinGet: new Decimal(0),
    }},
    resetsNothing(){ return true },
    color: "#cc0000",
    requires() {
	let r = new Decimal("e30"), 
	if (player.f.points.gte(1)) req = new Decimal("10^^e300")
	return r
    }, // Can be a function that takes requirement increases into account
    resource: "???", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    coin(){
      let c = new Decimal(1)
      c = c.times(new Decimal(1.25).pow(player.f.stage))
      return c
    },
    prestigeButtonText(){ return "Unlock Fighting: 1.00e30 points" },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row
    layerShown(){return (hasUpgrade('s', 22) || player.f.unlocked) },
    damage(){
      let d = new Decimal(1)
      return d
    },
    branches: ["s", "l", "p"],
    tabFormat: [
        ["display-text", function(){ return "You have " + format(player.f.coins) + "Coins" }],
        "blank",
        ["bar", "hpBar"],
        "blank",
        "clickables",
        "buyables",
	"blank",
	"prestige-button",
    ],
    bars: {
    hpBar: {
        direction: RIGHT,
        baseStyle(){ return {
          "color": "red"
        }},
        fillStyle(){ return {
          "color": "green"
        }},
        width: 300,
        height: 70,
        progress() { return player.f.enemyHP.div(player.f.enemyStartHP) },
        display(){ return "Enemy HP: " + format(player.f.enemyHP) + "/" + format(player.f.enemyStartHP) },
    },
    },
    clickables: {
    11: {
        title: "Previous Stage",
        display() {return "Go back 1 stage"},
        canClick(){ return player.f.stage.gte(1) },
        onClick(){ 
          player.f.stage = player.f.stage.sub(1)
          player.f.enemyStartHP = new Decimal(1.1).pow(player.f.stage.pow(1.2))
          player.f.enemyHP = player.f.enemyStartHP
        },
    },
    12: {
        title: "Attack!",
        display() {return "Deals Damage to the Enemy"},
        canClick(){ return player.f.unlocked },
        onClick(){ 
          player.f.enemyHP = player.f.enemyHP.sub(player.f.damage)
        },
    },
    13: {
        title: "Next Stage",
        display() {return "Go to the next stage"},
        canClick(){ return true },
        onClick(){ 
          player.f.stage = player.f.stage.add(1)
          player.f.enemyStartHP = new Decimal(1.1).pow(player.f.stage.pow(1.2))
          player.f.enemyHP = player.f.enemyStartHP
        },
    },
    },
    update(diff) {
      player.f.enemyStartHP = new Decimal(1.1).pow(player.f.stage.pow(1.2)) 
      player.f.damage = tmp.f.damage
      player.f.coinGet = tmp.f.coin

      if (player.f.enemyHP.lte(0)) {
        player.f.enemyHP = player.f.enemyStartHP
        player.f.coins = player.f.coins.add(player.f.coinGet)
      }
    },
})
