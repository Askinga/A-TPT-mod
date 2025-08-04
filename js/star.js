addLayer("st", {
    name: "Star", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        pointReq: new Decimal("e29000"),
        pointSize: new Decimal(0),
    }},
    color: "#ffff00",
    requires: new Decimal("e29000"), // Can be a function that takes requirement increases into account
    resource: "star size", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() { return player.st.points.add(1).pow(5) },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    resetsNothing() { return true },
    canReset() { return !player.st.unlocked },
    tabFormat: [
        ["display-text", function() { return "The star is " + format(player.st.points) + "km big, giving a x" + format(layers.st.effect()) + " boost to FP" }],
        "blank",
        "clickables",
        "upgrades",
        "prestige-button",
    ],
    Points() {
        return Decimal.log10(player.points.add(1)).div(29000).pow(1.25)
    },
    branches: ["u", "f", "fo"],
    layerShown() { return (hasUpgrade('i', 35) || player.st.unlocked) },
    clickables: {
        11: {
            display() { return "Feed the star " + format(player.points) + " points." },
            onClick() { 
                player.st.pointSize = tmp.st.Points
                player.st.pointReq = player.points
            },
            canClick() { return player.points.gte(player.st.pointReq) },
        },
    },
    update(diff) {
        player.st.points = player.st.pointSize
    },
})
