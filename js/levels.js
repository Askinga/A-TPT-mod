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
	if (hasUpgrade("s", 13)) mult = mult.times(1000)
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
	let base = new Decimal(2)
	if (hasUpgrade("s", 14)) base = base.add(upgradeEffect('s', 14))
        return new Decimal(base).pow(player.l.points)
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
    1: {
        requirementDescription: "Level 3 (m3)",
        effectDescription: "x1.75 prestige points",
        done() { return player.l.points.gte(3) },
	unlocked(){ return hasMilestone('l', 0) }
    },
    2: {
        requirementDescription: "Level 5 (m4)",
        effectDescription: "x3 prestige points and unlock a new automation!",
        done() { return player.l.points.gte(5) },
	unlocked(){ return hasMilestone('l', 1) }
    },
    3: {
        requirementDescription: "Level 6 (m5)",
        effectDescription: "x15 prestige power.",
        done() { return player.l.points.gte(6) },
	unlocked(){ return hasMilestone('l', 2) }
    },
    4: {
        requirementDescription: "Level 7 (m6)",
        effectDescription: "Extend Prestige Upgrades.",
        done() { return player.l.points.gte(7) },
	unlocked(){ return hasMilestone('l', 3) }
    },
    5: {
        requirementDescription: "Level 10 (m7)",
        effectDescription: "Unlock a new automation.",
        done() { return player.l.points.gte(10) },
	unlocked(){ return hasMilestone('l', 4) }
    },
    6: {
        requirementDescription: "Level 12 (m8)",
        effectDescription: "x100 points. (Big boost!)",
        done() { return player.l.points.gte(12) },
	unlocked(){ return hasMilestone('l', 5) }
    },
    7: {
        requirementDescription: "Level 13 (m9)",
        effectDescription: "x10 prestige points and unlock a new layer.",
        done() { return player.l.points.gte(13) },
	unlocked(){ return hasMilestone('l', 6) }
    },
  },
})
