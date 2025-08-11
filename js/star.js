addLayer("st", {
    name: "Star", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⭐", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        pointReq: new Decimal("e29000"),
        pointSize: new Decimal(0),
	fpReq: new Decimal("e450"),
        fpSize: new Decimal(0),
    }},
    tooltip(){
        return "The Star"
    },
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
    secBoost() { return player.st.points.add(1).pow(4) },
    effect() { return player.st.points.add(1).pow(5) },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    canReset() { return (player.points.gte("e29000") && !player.st.unlocked) },
    tabFormat: [
        ["display-text", function() { return "The star is " + format(player.st.points, 3) + "km big, giving a x" + format(layers.st.effect()) + " boost to FP and a x" + format(tmp.st.secBoost) + " boost to FB" }],
        ["display-text", function() { return "You have gotten " + format(player.st.pointSize, 5) + " star size from points" }],
	["display-text", function() {
	    if (hasUpgrade('st', 15))
		return "You have gotten " + format(player.st.fpSize, 5) + " star size from f points"
	}],
        "blank",
        "clickables",
        "upgrades",
	"challenges",
        "prestige-button",
    ],
    Points() {
        return Decimal.log10(player.points.add(1)).div(29000).pow(1.25)
    },
    fp() {
        return Decimal.log10(player.fo.points.add(1)).div(450).pow(1.5)
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
	12: {
	    unlocked(){ return hasUpgrade('st', 15) },
            display() { return "Feed the star " + format(player.fo.points) + " f points." },
            onClick() { 
                player.st.fpSize = tmp.st.fp
                player.st.fpReq = player.fo.points
            },
            canClick() { return player.fo.points.gte(player.st.fpReq) },
        },
    },
    update(diff) {
        player.st.points = player.st.pointSize.add(player.st.fpSize)
    },
    upgrades: {
        11: {
            title: "Lets grow a star! (91)",
            description: "xe300 points and x100 FB<br>Req: 1.075 km",
            cost: new Decimal(1.075),
        },
        12: {
            title: "Big boosts. (92)",
            description: "xe1000 prestige points, xe500 points and x10000 FB<br>Req: 1.125 km",
            cost: new Decimal(1.125),
            unlocked(){ return hasUpgrade('st', 11) }, 
        },
        13: {
            title: "Extra Huge. (93)",
            description: "^1.01 prestige points and unlock a challenge<br>Req: 1.950 km",
            cost: new Decimal(1.950),
            unlocked(){ return hasUpgrade('st', 12) }, 
        },
	14: {
            title: "Grow it. (94)",
            description: "xe750 points<br>Req: 2.400 km",
            cost: new Decimal(2.400),
            unlocked(){ return (hasUpgrade('st', 13) && hasChallenge('st', 11)) }, 
        },
	15: {
            title: "Bigger! (95)",
            description: "You now can feed the star with FP and you can bulk defeat +9 stages at a time.<br>Req: 2.700 km",
            cost: new Decimal(2.700),
            unlocked(){ return hasUpgrade('st', 14) }, 
        },
        21: {
            title: "Star Damage (96)",
            description: "^1.3 damage<br>Req: 3.980 km",
            cost: new Decimal(3.980),
            unlocked(){ return hasUpgrade('st', 15) }, 
        },
	22: {
            title: "Star Coins (97)",
            description: "^1.25 coins<br>Req: 4.050 km",
            cost: new Decimal(4.050),
            unlocked(){ return hasUpgrade('st', 21) }, 
        },
	23: {
            title: "Insanity (98)",
            description: "Boost coins based on star size (after exponent)<br>Req: 4.575 km",
		    cost: new Decimal(4.575),
	    effect(){ return player.st.points.add(1).pow(1000) },
	    effectDisplay(){ return "x"+format(upgradeEffect('st', 23)) },
            unlocked(){ return hasUpgrade('st', 22) }, 
        },
	24: {
            title: "Upgrade 100 is near... (99)",
            description: "xe1000 points<br>Req: 5.000 km",
            cost: new Decimal(5.000),
            unlocked(){ return hasUpgrade('st', 23) }, 
        },
	25: {
            title: "Upgrade 100! (100)",
            description: "Unlock a new layer. (Soon)<br>Req: 5.300 km",
            cost: new Decimal(5.300),
            unlocked(){ return hasUpgrade('st', 24) }, 
        },
    },
    challenges: {
    11: {
	unlocked(){ return hasUpgrade('st', 13) },
        name: "Extreme Downgrade",
        challengeDescription: "^0.1 points, prestige points, ^0.25 SP, ^0.5 UP, ^0.4 FP (Recommended 2.150km star size)",
        canComplete: function() {return player.points.gte("e260")},
        goalDescription: "1.00e260 points",
	rewardDescription: "xe400 points, x20000 FB, x1e10 FP, x1e1000 SP and unlock further upgrades",
    },
    },
})
