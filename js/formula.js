addLayer("fo", {
    name: "formula",
    symbol: "F",
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        stage: new Decimal(0),
        y: new Decimal(0),
        z: new Decimal(0),
    }},
    tooltip(){
        return "The Formula"
    },
    onPrestige(){
        player.u.points = new Decimal(0)
    },
    color: "#0000ff",
    requires: new Decimal(10000),
    resource: "f points",
    baseResource: "ultra prestige points",
    baseAmount() {return player.u.points},
    type: "normal",
    exponent: 0.05,
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    stage1(){
        return player.fo.points.add(1).pow(0.5)
    },
    row: 2,
    hotkeys: [
        {key: "f", description: "F: Reset for f points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ["l", "s"],
    tabFormat: [
        "main-display",
        ["display-text", function() { return "<h2>Formula Stage " + format(player.fo.stage) + "</h2><br>The formula is (x+1)^0.5, boosting points by x" + format(tmp.fo.stage1) + "<br>where x is your f points"; }],
        "prestige-button"
    ],
})
