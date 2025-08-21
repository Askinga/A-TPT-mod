addLayer("supernova", {
    name: "supernova", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💥", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffee00",
    requires: new Decimal(3000), // Can be a function that takes requirement increases into account
    resource: "Supernova", // Name of prestige currency
    baseResource: "star size", // Name of resource prestige is based on
    baseAmount() {return player.st.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.15, // Prestige currency exponent
    base: 3,
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
	milestones: {
    0: {
        requirementDescription: "Hard Reset? (Supernova 1) (m15)",
        effectDescription: "xe5000 points",
        done() { return player.supernova.points.gte(1) }
    },
	},
})
