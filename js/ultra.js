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
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
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
    upgrades: {
	11: {
	  title: "Oh no...",
	  description: "x10 points, prestige points and x5 super prestige points",
	  cost: new Decimal(1)
	},
    },
})
