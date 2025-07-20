addLayer("u", {
    name: "ultra prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#7b63ff", 
    requires: new Decimal(25000), // Can be a function that takes requirement increases into account
    resource: "ultra prestige points", // Name of prestige currency
    baseResource: "super prestige points", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.075, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('u', 13)) mult = mult.times(upgradeEffect('u', 13))
	if (hasUpgrade('u', 14)) mult = mult.times(upgradeEffect('u', 14))
	if (hasUpgrade('u', 15)) mult = mult.times(upgradeEffect('u', 15))
        return mult
    },
    syn3() {
	return player.u.points.add(1).pow(2.5)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for ultra prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('f', 35) || player.u.unlocked)},
    branches: ["l", "s"],
    effect(){ return player.u.points.add(1).pow(10) },
    effectDescription(){ return "which is boosting Points by x"+format(layers.u.effect()) },
    upgrades: {
	11: {
	  title: "Oh no... (51)",
	  description: "x1e5 points, x10 prestige points and x5 super prestige points",
	  cost: new Decimal(1)
	},
	12: {
	  title: "Automations are needed (52)",
	  description: "Unlock 2 new automations",
	  cost: new Decimal(2),
	  unlocked() { return hasUpgrade('u', 11) },
	},
	13: {
	  title: "Synergy 3 (53)",
	  description: "Boost UP based on prestige points, and boost prestige points based on UP.",
	  cost: new Decimal(10),
	  effect(){ return player.p.points.add(1).pow(0.0025) },
	  effectDisplay(){ return "x"+format(upgradeEffect('u', 13))+", x"+format(tmp.u.syn3) },
	  unlocked() { return hasUpgrade('u', 12) },
	},
	14: {
	  title: "Coin boost? (54)",
	  description: "Boost UP based on coins.",
	  cost: new Decimal(25),
	  effect(){ return player.f.coins.add(1).pow(0.04) },
	  effectDisplay(){ return "x"+format(upgradeEffect('u', 14)) },
	  unlocked() { return hasUpgrade('u', 13) },
	},
	15: {
	  title: "Level Insanity (55)",
	  description: "Boost UP based on levels and +0.2 level effect base.",
	  cost: new Decimal(250),
	  effect(){ return player.l.points.add(1).pow(0.2) },
	  effectDisplay(){ return "x"+format(upgradeEffect('u', 15)) },
	  unlocked() { return hasUpgrade('u', 14) },
	},
	21: {
	  title: "Fighting Buff (56)",
	  description: "Boost damage based on UP.",
	  cost: new Decimal(500),
	  effect(){ return player.u.points.add(1).pow(0.6) },
	  effectDisplay(){ return "x"+format(upgradeEffect('u', 21)) },
	  unlocked() { return hasUpgrade('u', 15) },
	},
	22: {
	  title: "SP boost (57)",
	  description: "Boost SP based on UP.",
	  cost: new Decimal(1000),
	  effect(){ return player.u.points.add(1).pow(0.4) },
	  effectDisplay(){ return "x"+format(upgradeEffect('u', 22)) },
	  unlocked() { return hasUpgrade('u', 21) },
	},
    },
})
