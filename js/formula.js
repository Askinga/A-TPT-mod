addLayer("fo", {
    name: "formula",
    symbol: "F",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        stage: new Decimal(0),
        y: new Decimal(1),
        z: new Decimal(1),
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
    stage0(){
        return player.fo.points.add(1).pow(player.fo.y)
    },
    row: 2,
    hotkeys: [
        {key: "f", description: "F: Reset for f points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('u', 25) || player.fo.unlocked)},
    branches: ["l", "s"],
    tabFormat: [
        "main-display",
        ["display-text", function() { 
    if (player.fo.stage.eq(0)) 
        return "<h2>Formula Stage " + format(player.fo.stage) + "</h2><br>The formula is (x+1)^0.5, boosting points by x" + format(tmp.fo.stage1) + "<br>where x is your f points";
    else 
        return "<h2>Formula Stage " + format(player.fo.stage) + "</h2><br>The formula is (x+1)^y, boosting points by x" + format(tmp.fo.stage0) + "<br>where x is your f points" + "<br>y = " + format(player.fo.y); }],     
        "prestige-button",
        "clickables",
        "buyables",
    ],
    clickables: {
        11: {
        title: "Improve the Formula",
        display() { return "Makes the Formula better. Next Formula will be (x+1)^y. y > 1<br>Need 5 f points" },
        canClick(){ return player.fo.points.gte(5) },
        onClick(){ 
            player.fo.stage = player.fo.stage.add(1)
            player.fo.points = new Decimal(0)
            player.fo.y = new Decimal(1)
        },
        unlocked(){ return player.fo.stage.eq(0) },
        },
    },
})
