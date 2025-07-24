addLayer("i", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff0000",
    requires: new Decimal("1e12"), // Can be a function that takes requirement increases into account
    resource: "formula boosters", // Name of prestige currency
    baseResource: "f points", // Name of resource prestige is based on
    baseAmount() {return player.fo.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.075, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
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
    },
})
