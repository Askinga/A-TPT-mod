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
	fos: new Decimal(0),
    }},
    autoUpgrade() { return hasUpgrade('i', 12) },
    passiveGeneration() {
        let p = new Decimal(0)
        if (hasMilestone('i', 1)) p = p.add(0.15)
        return p
    },
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
        if (hasUpgrade('fo', 31)) mult = mult.times(upgradeEffect('fo', 31))
        if (hasUpgrade('fo', 32)) mult = mult.times(upgradeEffect('fo', 32))
        if (hasUpgrade('fo', 34)) mult = mult.times(upgradeEffect('fo', 34))
	if (hasUpgrade('i', 11)) mult = mult.times(3)
	if (hasUpgrade('i', 12)) mult = mult.times(5)
        mult = mult.times(layers.i.effect())
	mult = mult.times(layers.st.effect())
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        if (player.fo.points.gte("2^67")) exp = exp.times(tmp.fo.debuff)
        return exp
    },
    stage1(){
        return player.fo
		.points.add(1).pow(0.5)
    },
    debuff() {
	if (player.fo.points.gte("2^66"))
        return new Decimal(0.99).sub(Decimal.log(player.fo.points.slog().minus(new Decimal(2).pow(67).slog()).add(1),2).div(1).min(0.989))
    },
    debuff2() {
	if (player.fo.points.gte("2^333"))
        return new Decimal(0.99).sub(Decimal.log(player.fo.points.slog().minus(new Decimal(2).pow(333).slog()).add(1),2).div(0.75).min(0.989))
    },
    debuffZ() {
	if (player.fo.points.gte("2^512"))
        return new Decimal(0).add(Decimal.log(player.fo.points.slog().minus(new Decimal(2).pow(512).slog()).add(1),2).div(2.5).min(0.7))
    },
    stage0(){
        return player.fo.points.add(1).pow(player.fo.y)
    },
    stage2(){
        return new Decimal(2).pow(player.fo.points.add(1).log10().add(1).pow(2)).times(player.fo.y)
    },
    stage3(){
	if (player.fo.points.gte("2^333")) {
            return new Decimal(2).pow(player.fo.points.add(1).log(2).add(player.fo.y).pow(player.fo.z)).pow(tmp.fo.debuff2)
	}
	else {
	    return new Decimal(2).pow(player.fo.points.add(1).log(2).add(player.fo.y).pow(player.fo.z))
	}
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
        return "<h2>Formula Stage " + format(player.fo.stage) + "</h2><br>The formula is (2^(log<sub>2</sub>(x+1)+y)^z), boosting points by x" + format(tmp.fo.stage3) + "<br>where x is your f points" + "<br>y = " + format(player.fo.y) + "<br>z = " + format(player.fo.z); 
        }],     
        ["display-text", function() { 
    if (player.fo.points.gte("2^67"))
        return '<span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">Due to Softcap, FP gain is raised to the power of ' + format(tmp.fo.debuff, 5) + '!'
    		
        }],
        ["display-text", function(){
	    if (player.fo.points.gte("2^333") && player.fo.stage.gte(3))
        return '<span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">Due to Supercap, The Formula is raised to the power of ' + format(tmp.fo.debuff2, 5) + '!'
	}],
	["display-text", function(){
	    if (player.fo.points.gte("2^512") && player.fo.stage.gte(3))
        return '<span style=\"color: rgb(255, 0, 0); text-shadow: rgb(255, 0, 0) 0px 0px 10px;\">Due to Hypercap, z is subtracted by ' + format(tmp.fo.debuffZ, 5) + '!'
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
	    if (!hasMilestone('i', 0)) {
            player.fo.points = new Decimal(0)
            player.fo.y = new Decimal(1)
	    }
        },
        unlocked(){ return player.fo.stage.eq(0) },
        },
        12: {
        title: "Improve the Formula",
        display() { return "Makes the Formula better. Next Formula will be (2^((log<sub>10</sub>(x+1)+1)^2))<br>Need 100 f points" },
        canClick(){ return player.fo.points.gte(100) },
        onClick(){ 
	    player.fo.stage = player.fo.stage.add(1)
            if (!hasMilestone('i', 0)) {
            player.fo.points = new Decimal(0)
            player.fo.y = new Decimal(1)
            setBuyableAmount('fo', 11, new Decimal(0))
	    }
        },
        unlocked(){ return player.fo.stage.eq(1) },
        },
        13: {
        title: "Improve the Formula",
        display() { return "Makes the Formula better. Next Formula will be (2^(log<sub>2</sub>(x+1)+y)^z) z > 1.5<br>Need 1.00e6 f points" },
        canClick(){ return player.fo.points.gte(1e6) },
        onClick(){ 
	    player.fo.stage = player.fo.stage.add(1)
            if (!hasMilestone('i', 0)) {
            player.fo.points = new Decimal(0)
            player.fo.y = new Decimal(1)
            setBuyableAmount('fo', 11, new Decimal(0))
	    }
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
        purchaseLimit: 20
    },
    },
    update(diff) {
        player.fo.y = new Decimal(1).add(buyableEffect('fo', 11))
	if (player.fo.points.gte("2^512")) {
        player.fo.z = new Decimal(1.5).add(buyableEffect('fo', 12)).sub(tmp.fo.debuffZ)
	} else {
	player.fo.z = new Decimal(1.5).add(buyableEffect('fo', 12))
	}
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
            unlocked(){ return (player.fo.stage.gte(1) && hasUpgrade('fo', 13)) },
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
	    effect() {
                let expu3 = 0.004
                let eff = player.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e250"), 0.15)
                return eff
	    },
            effectDisplay(){ 
		let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e250")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "x" + format(upgEffect) + softcapDescription 
	    },
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
        31: {
            title: "More FP! (71)",
            description: "Boost FP based on ultra prestige points",
            cost: new Decimal("2.5e6"),
            unlocked(){ return (player.fo.stage.gte(3) && hasUpgrade('fo', 25)) },
            effect(){ return player.u.points.add(1).pow(0.09) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
        32: {
            title: "Too boring to keep the FP boosts. (72)",
            description: "Boost FP based on levels",
            cost: new Decimal("1e8"),
            unlocked(){ return (player.fo.stage.gte(3) && hasUpgrade('fo', 31)) },
            effect(){ return player.l.points.add(1).pow(0.4) },
            effectDisplay(){ return "x"+format(upgradeEffect(this.layer, this.id)) },
        },
        33: {
            title: "Fighting Automation plz! (73)",
            description: "Unlock a new automation",
            cost: new Decimal("2.5e9"),
            unlocked(){ return (player.fo.stage.gte(3) && hasUpgrade('fo', 32)) },
        },
        34: {
            title: "I thought it is used for automations! (74)",
            description: "Boost FP based on AP",
            cost: new Decimal("1e10"),
            unlocked(){ return (player.fo.stage.gte(3) && hasUpgrade('fo', 33)) },
            effect(){
                let expu3 = 0.0025
                let eff = player.a.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e2"), 0.1)
                return eff
	    },
            effectDisplay() { // Add formatting to the effect
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("1e2")) ) {
                    softcapDescription = " (Softcapped)"
		}
	        return "x" + format(upgEffect) + softcapDescription
	    },
        },
        35: {
            title: "Spicing it up (75)",
            description: "Unlock a new layer",
            cost: new Decimal("2.5e11"),
            unlocked(){ return (player.fo.stage.gte(3) && hasUpgrade('fo', 34)) },
        },
    },
})
