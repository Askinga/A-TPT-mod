addLayer("u", {
    name: "ultra prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    autoUpgrade() { return hasUpgrade('i', 12) },
    passiveGeneration(){
	let p = new Decimal(0)
	if (player.a.auto7.eq(1)) p = p.add(tmp.a.auto4.div(100))
	return p
    },
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
	if (hasUpgrade('u', 23)) mult = mult.times(upgradeEffect('u', 23))
	if (hasUpgrade('u', 24)) mult = mult.times(5)
	if (hasUpgrade('fo', 11)) mult = mult.times(5)
	if (hasUpgrade('fo', 14)) mult = mult.times(10)
	if (hasUpgrade('fo', 24)) mult = mult.times(upgradeEffect('fo', 24))
	if (hasMilestone('i', 2)) mult = mult.times(7)
	if (hasUpgrade('i', 11)) mult = mult.times(3)
        return mult
    },
    syn3() {
	return player.u.points.add(1).pow(2.5)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
	if (inChallenge('st', 11)) exp = exp.times(0.5)
	return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for ultra prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('f', 35) || player.u.unlocked)},
    branches: ["l", "s"],
    effect(){
	let sc = 0.2
	let eff = player.u.points.add(1).pow(10);
        softcappedEffect = softcap(eff, new Decimal("e100"), new Decimal(sc))
        return softcappedEffect
    },
    effectDescription(){ 
	let s = ""
        let lyrEffect = tmp[this.layer].effect
        if (lyrEffect.gte(new Decimal("1e100")) ) {
            s = " (Softcapped)"
	}
	return "which is boosting Points by x"+format(layers.u.effect()) + s
    },
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
	  cost: new Decimal(125),
	  effect(){ return player.l.points.add(1).pow(0.2) },
	  effectDisplay(){ return "x"+format(upgradeEffect('u', 15)) },
	  unlocked() { return hasUpgrade('u', 14) },
	},
	21: {
	  title: "Fighting Buff (56)",
	  description: "Boost damage based on UP.",
	  cost: new Decimal(400),
	  effect(){ return player.u.points.add(1).pow(0.6) },
	  effectDisplay(){ return "x"+format(upgradeEffect('u', 21)) },
	  unlocked() { return hasUpgrade('u', 15) },
	},
	22: {
	  title: "SP boost (57)",
	  description: "Boost SP based on UP.",
	  cost: new Decimal(700),
	  effect(){ return player.u.points.add(1).pow(0.4) },
	  effectDisplay(){ return "x"+format(upgradeEffect('u', 22)) },
	  unlocked() { return hasUpgrade('u', 21) },
	},
	23: {
	  title: "UP boost (58)",
	  description: "Boost UP based on UP.",
	  cost: new Decimal(1500),
	  effect(){ return player.u.points.add(1).pow(0.1) },
	  effectDisplay(){ return "x"+format(upgradeEffect('u', 23)) },
	  unlocked() { return hasUpgrade('u', 22) },
	},
	24: {
	  title: "thats crazy (59)",
	  description: "x5 UP",
	  cost: new Decimal(2400),
	  unlocked() { return hasUpgrade('u', 23) },
	},
	25: {
	  title: "x+y+z (60)",
	  description: "Unlock the Formula",
	  cost: new Decimal(5000),
	  unlocked() { return hasUpgrade('u', 24) },
	},    
    },
})
