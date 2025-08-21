addLayer("supernova", {
    name: "supernova", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💥", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffee00",
    requires(){ 
		let req = new Decimal(3000) 
		if (player.supernova.points.eq(1)) req = new Decimal(8500)
		return req
	}, // Can be a function that takes requirement increases into account
    resource: "Supernova", // Name of prestige currency
    baseResource: "star size", // Name of resource prestige is based on
    baseAmount() {return player.st.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1e-100, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Supernova", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('st', 45) || player.supernova.unlocked)},
    branches: ["i", "st", "stb"],
	effect(){ return new Decimal(1e10).pow(player.supernova.points) },
	effectDescription(){
		return "which is boosting Formula Boosters by x" + format(layers.supernova.effect())
	},
	milestones: {
    0: {
        requirementDescription: "Hard Reset? (Supernova 1) (m15)",
        effectDescription: "xe5000 points and increase star booster base +0.05",
        done() { return player.supernova.points.gte(1) }
    },
	},
})
