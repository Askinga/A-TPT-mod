addLayer("i", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    passiveGeneration(){
	let p = new Decimal(0)
	if (hasUpgrade('i', 13)) p = p.add(0.1)
	if (hasUpgrade('i', 21)) p = p.times(10)
	return p
    },
    color: "#ff0000",
    requires: new Decimal("1e12"), // Can be a function that takes requirement increases into account
    resource: "formula boosters", // Name of prestige currency
    baseResource: "f points", // Name of resource prestige is based on
    baseAmount() {return player.fo.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.075, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('i', 14)) mult = mult.times(3)
	if (hasUpgrade('i', 15)) mult = mult.times(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for formula boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('fo', 35) || player.i.unlocked)},
    effect(){ return player.i.points.add(1).pow(2) },
    effectDescription(){ return "which is boosting f points by x" + format(layers.i.effect()) },
    branches: ["u", "f", "fo"],
    milestones: {
    0: {
        requirementDescription: "I HATE FIGHTING! (1 FB) (m10)",
        effectDescription: "x10000 Damage",
        done() { return player.i.points.gte(1) }
    },
    1: {
        requirementDescription: "Non-Automation Generation (2 FB) (m11)",
        effectDescription: "15% F points per second",
        done() { return player.i.points.gte(2) }
    },
    2: {
        requirementDescription: "UP boost (5 FB) (m12)",
        effectDescription: "x7 UP",
        done() { return player.i.points.gte(5) }
    },
    },
    upgrades: {
	11: {
	  title: "Grindy? (76)",
	  description: "x10 SP, x5 Coins and x3 UP and FP",
	  cost: new Decimal(10),
	  unlocked(){ return true },
	},
	12: {
	  title: "Not in Automation Layer? (77)",
	  description: "Autobuy ALL third row upgrades and x5 FP",
	  cost: new Decimal(20),
	  unlocked(){ return hasUpgrade('i', 11) },
	},
	13: {
	  title: "Not in Automation Layer 2? (78)",
	  description: "(OP) 10% FB per second.",
	  cost: new Decimal(30),
	  unlocked(){ return hasUpgrade('i', 12) },
	},
	14: {
	  title: "It starts again (79)",
	  description: "x3 FB.",
	  cost: new Decimal(100),
	  unlocked(){ return hasUpgrade('i', 13) },
	},
	15: {
	  title: "... (80)",
	  description: "x5 FB.",
	  cost: new Decimal(500),
	  unlocked(){ return hasUpgrade('i', 14) },
	},
	21: {
	  title: "Inflation era (81)",
	  description: "x10 FB passive gen.",
	  cost: new Decimal(5000),
	  unlocked(){ return hasUpgrade('i', 15) },
	},
    },
})
