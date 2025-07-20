
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
    tooltip(){
	return "<h3>" + format(player.f.coins) + "</h3> Coins"
    },
    resetsNothing(){ return true },
    color: "#cc0000",
    requires() {
	let req = new Decimal("e30");
	if (player.f.points.gte(1)) req = req.times("10^^e300");
	return req;
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
      c = c.times(new Decimal(1.075).pow(player.f.stage))
      if (hasUpgrade('f', 12)) c = c.times(2)
      if (hasUpgrade('f', 22)) c = c.times(upgradeEffect('f', 22))
      if (hasUpgrade('f', 31)) c = c.times(upgradeEffect('f', 31))
      if (hasUpgrade('f', 32)) c = c.times(upgradeEffect('f', 32))
      if (hasUpgrade('f', 33)) c = c.times(upgradeEffect('f', 33))
      if (hasUpgrade('f', 34)) c = c.times(upgradeEffect('f', 34))
      return c
    },
    syn1() {
	return player.f.coins.add(1).pow(0.75)
    },
    syn2() {
	return player.f.coins.add(1).pow(0.5)
    },
    prestigeButtonText(){ return "Unlock Fighting: 1.00e30 points" },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row
    layerShown(){return (hasUpgrade('s', 25) || player.f.unlocked) },
    damage(){
      let dmg = new Decimal(1)
      if (hasUpgrade("f", 11)) dmg = dmg.times(2)
      if (hasUpgrade("f", 13)) dmg = dmg.times(upgradeEffect('f', 13))
      if (hasUpgrade("f", 15)) dmg = dmg.times(upgradeEffect('f', 15))
      if (hasUpgrade("f", 21)) dmg = dmg.times(upgradeEffect('f', 21))
      if (hasUpgrade("f", 23)) dmg = dmg.times(upgradeEffect('f', 23))
      if (hasUpgrade("f", 24)) dmg = dmg.times(upgradeEffect('f', 24))
      if (hasUpgrade("u", 21)) dmg = dmg.times(upgradeEffect('u', 21))
      if (hasUpgrade("f", 14)) dmg = dmg.times(3)
      dmg = dmg.times(buyableEffect('f', 11))
      return dmg
    },
    branches: ["s", "l", "p"],
    tabFormat: [
        ["display-text", function(){ return 'You have <span style=" color: rgb(255, 255, 153); text-shadow: rgb(255, 255, 153) 0px 0px 10px"><h2>' + format(player.f.coins) + '</h2></span> Coins.<br>And you will gain <span style=" color: rgb(255, 255, 153); text-shadow: rgb(255, 255, 153) 0px 0px 10px"><h3>' + format(player.f.coinGet) + ' Coins</h3></span> on enemy kill' }],
        "blank",
        ["bar", "hpBar"],
	["display-text", function(){ return 'You will deal <span style=" color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px"><h2>' + format(player.f.damage) + '</h2></span> Damage on attack<br>Stage <h3>' + format(player.f.stage) + "</h3><br>You can hold the attack clickable! :)" }],
        "blank",
        "clickables",
        "upgrades",
	"blank",
	"buyables",
	"prestige-button",
    ],
    bars: {
    hpBar: {
        direction: RIGHT,
        fillStyle: { 'background-color': "#00ff00" },
        baseStyle: { 'background-color': "#ff0000" },
	textStyle: { 'color': "#000000" },
        width: 350,
        height: 60,
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
          player.f.enemyStartHP = new Decimal(1.1).pow(player.f.stage.pow(1.2)).times(100)
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
	onHold(){ 
          player.f.enemyHP = player.f.enemyHP.sub(player.f.damage)
        },
    },
    13: {
        title: "Next Stage",
        display() {return "Go to the next stage"},
        canClick(){ return true },
        onClick(){ 
          player.f.stage = player.f.stage.add(1)
          player.f.enemyStartHP = new Decimal(1.1).pow(player.f.stage.pow(1.2)).times(100)
          player.f.enemyHP = player.f.enemyStartHP
        },
    },
    },
    upgrades: {
	11: {
	  title: "Fighting? (36)",
	  description: "Double your damage",
	  cost: new Decimal(1),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f"
	},
	12: {
	  title: "This is cool. (37)",
	  description: "Double your coin gain",
	  cost: new Decimal(3),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  unlocked(){ return hasUpgrade('f', 11) }
	},
	13: {
	  title: "Rich is better. (38)",
	  description: "Boost damage based on coins",
	  cost: new Decimal(6),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.f.coins.add(1).pow(0.35) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 13)) },
	  unlocked(){ return hasUpgrade('f', 12) }
	},
	14: {
	  title: "player.f.damage = player.f.damage.times(3). (39)",
	  description: "x3 damage",
	  cost: new Decimal(50),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  unlocked(){ return hasUpgrade('f', 13) }
	},
	15: {
	  title: "Damage boost 1 (40)",
	  description: "Boost damage based on levels",
	  cost: new Decimal(150),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.l.points.add(1).pow(0.5) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 15)) },
	  unlocked(){ return hasUpgrade('f', 14) }
	},
	21: {
	  title: "Damage boost 2 (41)",
	  description: "Boost damage based on super prestige points",
	  cost: new Decimal(1000),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.s.points.add(1).pow(0.3) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 21)) },
	  unlocked(){ return hasUpgrade('f', 15) }
	},
	22: {
	  title: "Coin boost 1 (42)",
	  description: "Boost coins based on points",
	  cost: new Decimal(2500),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.points.add(1).pow(0.015) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 22)) },
	  unlocked(){ return hasUpgrade('f', 21) }
	},
	23: {
	  title: "Damage boost 3 (43)",
	  description: "Boost damage based on points",
	  cost: new Decimal(15000),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.points.add(1).pow(0.01) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 23)) },
	  unlocked(){ return hasUpgrade('f', 22) }
	},
	24: {
	  title: "Damage boost 4 (44)",
	  description: "Boost damage based on prestige points",
	  cost: new Decimal(30000),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.p.points.add(1).pow(0.0075) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 24)) },
	  unlocked(){ return hasUpgrade('f', 23) }
	},
	25: {
	  title: "Buyable (45)",
	  description: "Unlock a new Fighting Buyable.",
	  cost: new Decimal(50000),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  unlocked(){ return hasUpgrade('f', 24) }
	},
	31: {
	  title: "Coin boost 2 (46)",
	  description: "Boost coins based on SP",
	  cost: new Decimal(75000),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.s.points.add(1).pow(0.175) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 31)) },
	  unlocked(){ return hasUpgrade('f', 25) }
	},
	32: {
	  title: "Synergy (47)",
	  description: "Boost coins based on points, and boost points based on coins",
	  cost: new Decimal(500000),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.points.add(1).pow(0.01) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 32))+", x"+format(tmp.f.syn1) },
	  unlocked(){ return hasUpgrade('f', 31) }
	},
	33: {
	  title: "Synergy 2 (48)",
	  description: "Boost coins based on PP, and boost PP based on coins",
	  cost: new Decimal(2000000),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.p.points.add(1).pow(0.0075) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 33))+", x"+format(tmp.f.syn2) },
	  unlocked(){ return hasUpgrade('f', 32) }
	},
	34: {
	  title: "Coin Coin (49)",
	  description: "Boost coins based on coins",
	  cost: new Decimal(10000000),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  effect(){ return player.f.coins.add(1).pow(0.05) },
	  effectDisplay(){ return "x"+format(upgradeEffect('f', 34)) },
	  unlocked(){ return hasUpgrade('f', 33) }
	},
	35: {
	  title: "New Layer (50)",
	  description: "Unlock a new layer",
	  cost: new Decimal(100000000),
	  currencyDisplayName: "Coins",
	  currencyInternalName: "coins",
	  currencyLayer: "f",
	  unlocked(){ return hasUpgrade('f', 34) }
	},
    },
    update(diff) {
      player.f.enemyStartHP = new Decimal(1.1).pow(player.f.stage.pow(1.2)).times(100)
      player.f.damage = tmp.f.damage
      player.f.coinGet = tmp.f.coin

      if (player.f.enemyHP.lte(0)) {
        player.f.enemyHP = player.f.enemyStartHP
        player.f.coins = player.f.coins.add(player.f.coinGet)
      }
    },
    buyables: {
    11: {
      unlocked() {
        return hasUpgrade("f", 25);
      },
      title: "f11",
      cost(x) {
        return new Decimal(25000).times(new Decimal(1.15).pow(x.pow(x.div(150).add(1))));
      },
      display() {
        return (
          "x1.125 Damage per level.<br>Cost: " +
          format(this.cost()) +
          " Coins<br>Bought: " +
          format(getBuyableAmount(this.layer, this.id)) +
          "<br>Effect: x" +
          format(buyableEffect(this.layer, this.id)) +
          " Damage"
        );
      },
      canAfford() {
        return player[this.layer].coins.gte(this.cost());
      },
      buy() {
        player[this.layer].coins = player[this.layer].coins.sub(
          this.cost()
        );
        setBuyableAmount(
          this.layer,
          this.id,
          getBuyableAmount(this.layer, this.id).add(1)
        );
      },
      effect(x) {
        let base1 = new Decimal(1.125);
        let base2 = x;
        let expo = new Decimal(1);
        return base1.pow(Decimal.pow(base2, expo));
      },
    },
    },
})
