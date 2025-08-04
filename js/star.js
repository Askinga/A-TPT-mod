addLayer("star", {
    name: "Star",
    symbol: "⭐",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        pointReq: new Decimal("e29000"),
        pointSize: new Decimal(0),
    }},
    color: "#dddd00",
    requires: new Decimal("e29000"),
    resource: "star size",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.000000000000000000000000000000000000000001,
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    effect() { return player.star.points.add(1).pow(5) },
    row: 3,
    resetsNothing() { return true },
    canReset() { return !player.star.unlocked },
    tabFormat: [
        ["display-text", function() { return "The star is " + format(player.star.points) + "km big, giving a x" + format(layers.star.effect()) + " boost to FP" }],
        "blank",
        "clickables",
        "upgrades",
        "prestige-button",
    ],
    sizePoints() {
        return Decimal.log10(player.points.add(1)).div(29000).pow(1.25)
    },
    layerShown() { return true },
    clickables: {
        11: {
            display() { return "Feed the star " + format(player.points) + " points." },
            onClick() { 
                player.star.pointSize = tmp.star.sizePoints()
                player.star.pointReq = player.points
            },
            canClick() { return player.points.gte(player.star.pointReq) },
        },
    },
    update(diff) {
        player.star.points = player.star.pointSize
    },
})
