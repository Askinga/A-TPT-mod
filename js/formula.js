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
        if (hasUpgrade('fo', 12)) mult = mult.times(3)
        if (hasUpgrade('fo', 13)) mult = mult.times(2)
        if (hasUpgrade('fo', 15)) mult = mult.times(10)
        if (hasUpgrade('fo', 21)) mult = mult.times(4)
        if (hasUpgrade('fo', 22)) mult = mult.times(upgradeEffect('fo', 22))
        if (hasUpgrade('fo', 23)) mult = mult.times(upgradeEffect('fo', 23))
        if (hasUpgrade('fo', 25)) mult = mult.times(upgradeEffect('fo', 25))
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
    stage2(){
        return new Decimal(2).pow(player.fo.points.add(1).log10().add(1).pow(2)).times(player.fo.y)
    },
    stage3(){
        return new Decimal(2).pow(player.fo.points.add(1).log(2).add(player.fo.y).pow(player.fo.z))
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
    else if (player.fo.stage.eq(1))
        return "<h2>Formula Stage " + format(player.fo.stage) + "</h2><br>The formula is (x+1)^y, boosting points by x" + format(tmp.fo.stage0) + "<br>where x is your f points" + "<br>y = " + format(player.fo.y); 
    else if (player.fo.stage.eq(2))
        return "<h2>Formula Stage " + format(player.fo.stage) + "</h2><br>The formula is (2^((log<sub>10</sub>(x+1)+1)^2))y, boosting points by x" + format(tmp.fo.stage2) + "<br>where x is your f points" + "<br>y = " + format(player.fo.y); 
    else if (player.fo.stage.eq(3))
        return "<h2>Formula Stage " + format(player.fo.stage) + "</h2><br>The formula is (2^((log<sub>2</sub>(x+1)+y)^z)), boosting points by x" + format(tmp.fo.stage3) + "<br>where x is your f points" + "<br>y = " + format(player.fo.y) + "<br>z = " + format(player.fo.z); 
        }],     
        "prestige-button",
        "clickables",
        "buyables",
        "upgrades",
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
        12: {
        title: "Improve the Formula",
        display() { return "Makes the Formula better. Next Formula will be (2^((log<sub>10</sub>(x+1)+1)^2))<br>Need 100 f points" },
        canClick(){ return player.fo.points.gte(100) },
        onClick(){ 
            player.fo.stage = player.fo.stage.add(1)
            player.fo.points = new Decimal(0)
            player.fo.y = new Decimal(1)
            setBuyableAmount('fo', 11, new Decimal(0))
        },
        unlocked(){ return player.fo.stage.eq(1) },
        },
        13: {
        title: "Improve the Formula",
        display() { return "Makes the Formula better. Next Formula will be (2^((log<sub>2</sub>(x+1)+y)^z)) z > 1.5<br>Need 1.00e6 f points" },
        canClick(){ return player.fo.points.gte(1e6) },
        onClick(){ 
            player.fo.stage = player.fo.stage.add(1)
            player.fo.points = new Decimal(0)
            player.fo.y = new Decimal(1)
            setBuyableAmount('fo', 11, new Decimal(0))
        },
        unlocked(){ return player.fo.stage.eq(2) },
        },
    },
    buyables: {
    11: {
        title: "y increaser",
        unlocked(){ return (player.fo.stage.gte(1)) },
        cost(x) { return new Decimal(2).pow(x) },
        display() { return "Increases y by +0.02.<br>Cost: " + format(this.cost()) + " f points<br>Bought: " + format(getBuyableAmount('fo', 11)) + "<br>Effect: +" + format(buyableEffect('fo', 11)) + " y" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(0.02)
            let base2 = x
            return base1.times(base2)
        },
    },
    12: {
        title: "z increaser",
        unlocked(){ return (player.fo.stage.gte(3)) },
        cost(x) { return new Decimal(3).pow(x.pow(x.div(150).add(1))) },
        display() { return "Increases z by +0.01.<br>Cost: " + format(this.cost()) + " f points<br>Bought: " + format(getBuyableAmount('fo', 12)) + "<br>Effect: +" + format(buyableEffect('fo', 12)) + " z" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(0.01)
            let base2 = x
            return base1.times(base2)
        },
    },
    },
    update(diff) {
        player.fo.y = new Decimal(1).add(buyableEffect('fo', 11))
        player.fo.z = new Decimal(1.5).add(buyableEffect('fo', 12))
    },
    upgrades: {
        11: {
            title: "UP Boost (61)",
            description: "x5 UP",
            cost: new Decimal(3),
            unlocked(){ return player.fo.stage.gte(1) },
        },
        12: {
            title: "Formula Formula Points (62)",
            description: "x3 f points and unlock a new automation",
            cost: new Decimal(5),
            unlocked(){ return (player.fo.stage.gte(1) && hasUpgrade('fo', 11)) },
        },
        13: {
            title: "FP boost (63)",
            description: "x2 f points",
            cost: new Decimal(20),
            unlocked(){ return (player.fo.stage.gte(1) && hasUpgrade('fo', 12)) },
        },
        14: {
            title: "UP mega boost (64)",
            description: "x10 UP",
            cost: new Decimal(30),
            unlocked(){ return (player.fo.stage.gte(2) && hasUpgrade('fo', 13)) },
        },
        15: {
            title: "FP mega boost (65)",
            description: "x10 FP",
            cost: new Decimal(200),
            unlocked(){ return (player.fo.stage.gte(2) && hasUpgrade('fo', 14)) },
        },
        21: {
            title: "FP boost 2 (66)",
            description: "x4 FP",
            cost: new Decimal("1024"),
            unlocked(){ return (player.fo.stage.gte(2) && hasUpgrade('fo', 15)) },
        },
        22: {
            title: "FP boost 3 (67)",
            description: "Boost FP based on points",
            cost: new Decimal("5000"),
            unlocked(){ return (player.fo.stage.gte(2) && hasUpgrade('fo', 21)) },
            effect(){ return player.points.add(1).pow(0.004) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
        23: {
            title: "FP boost 4 (68)",
            description: "Boost FP based on prestige points",
            cost: new Decimal("20000"),
            unlocked(){ return (player.fo.stage.gte(2) && hasUpgrade('fo', 22)) },
            effect(){ return player.p.points.add(1).pow(0.003) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
        24: {
            title: "Nice number (69)",
            description: "Nice number! Boost UP based on f points",
            cost: new Decimal("60000"),
            unlocked(){ return (player.fo.stage.gte(2) && hasUpgrade('fo', 23)) },
            effect(){ return player.fo.points.add(1).pow(0.15) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
        25: {
            title: "Final Push to the next Stage (70)",
            description: "Boost FP based on super prestige points",
            cost: new Decimal("100000"),
            unlocked(){ return (player.fo.stage.gte(2) && hasUpgrade('fo', 24)) },
            effect(){ return player.s.points.add(1).pow(0.0375) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
    },
})
