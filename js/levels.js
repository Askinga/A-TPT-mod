addLayer("l", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#3ACB02",
    requires: new Decimal("1e10"), // Can be a function that takes requirement increases into account
    resource: "levels", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for levels", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('p', 45) || player.l.unlocked)},
    branches: ["p"],
    effect(){
        return new Decimal(2).pow(player.l.points)
    },
    effectDescription(){
	    return "which is boosting Prestige Points by x" + format(layers.l.effect())
    },
    milestones: {
    0: {
        requirementDescription: "Level 2 (m2)",
        effectDescription: "x3 points",
        done() { return player.l.points.gte(2) }
    },
  },
})
