addLayer("stb", {
    name: "star boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#f0ff8f",
    requires: new Decimal(5.300), // Can be a function that takes requirement increases into account
    resource: "star boosters", // Name of prestige currency
    baseResource: "star size", // Name of resource prestige is based on
    baseAmount() {return player.st.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base(){ 
		let b = new Decimal(2.145) // Prestige currency base
		if (player.stb.points.gte(14)) b = b.add(player.stb.points.sub(13).times(new Decimal(0.005).times(player.stb.points.sub(13))))
		return b
	},
    exponent: 1.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
	tabFormat: [
		"main-display",
		"prestige-button",
		"resource-display",
		"blank",
		["display-text", function() {
	    if (player.stb.points.gte(10))
		return "Star Booster scaling starts at 14!"
	    }],
		["display-text", function() {
		return "Star booster base is " + format(tmp.stb.base)
     	}],
		"blank",
		"milestones"
	],
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for star boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('st', 25) || player.stb.unlocked)},
    effect(){ 
		let base = new Decimal(2)
		if (hasMilestone('supernova', 0)) base = base.add(0.05)
		return new Decimal(base).pow(player.stb.points) 
	},
    effectDescription(){ return "which is increasing the size of the Star by x" + format(layers.stb.effect()) },
    branches: ["u", "f", "fo"],
	milestones: {
    0: {
        requirementDescription: "FIGHTING IS VERY PAINFUL! (1 SB) (m13)",
        effectDescription: "Automatically sets your stage to the max you can fight and generate 100% of coins per second, but disable automation 9. And xe500 points",
        done() { return player.stb.points.gte(1) }
    },
	1: {
        requirementDescription: "Star Extension! (2 SB) (m14)",
        effectDescription: "Extend Star Upgrades. And automatically buy formula buyables",
        done() { return player.stb.points.gte(2) }
    },
	},
})
