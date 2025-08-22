addLayer("supernova", {
    name: "supernova", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💥", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		superEnergy: new Decimal(0),
		superEGain: new Decimal(0),
    }},
    color: "#ffee00",
    requires(){ 
		let req = new Decimal(3000) 
		if (player.supernova.points.eq(1)) req = new Decimal(8500)
		if (player.supernova.points.eq(2)) req = new Decimal(5e7)
		if (player.supernova.points.eq(3)) req = new Decimal(7.5e8)
		if (player.supernova.points.eq(4)) req = new Decimal("eeeeeeeee10")
		return req
	}, // Can be a function that takes requirement increases into account
    resource: "Supernova", // Name of prestige currency
    baseResource: "star size", // Name of resource prestige is based on
    baseAmount() {return player.st.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1e-100, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Supernova", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	tabFormat: {
		"Main": {
			content: [
			"main-display",
			"prestige-button",
			"resource-display",
			"blank",
			"milestones",
			],
		},
		"Energy": {
			unlocked(){ return hasMilestone('supernova', 1) },
			content: [
				"main-display",
				"prestige-button",
				"blank",
				["display-text", function() { return 'You have <span style=" color: rgb(255, 130, 0); text-shadow: rgb(255, 130, 0) 0px 0px 10px"><h2>' + format(player.supernova.superEnergy) + "</h2></span> Energy<br>(" + format(player.supernova.superEGain) + "/s)" }],
				"blank",
				"upgrades"
			],
		},
	},
    layerShown(){return (hasUpgrade('st', 45) || player.supernova.unlocked)},
    branches: ["i", "st", "stb"],
	effect(){ return new Decimal(1e10).pow(player.supernova.points) },
	effectDescription(){
		return "which is boosting Formula Boosters by x" + format(layers.supernova.effect())
	},
	milestones: {
    0: {
        requirementDescription: "Hard Reset? (Supernova 1) (m15)",
        effectDescription: "xe5000 points and increase star booster base +0.05",
        done() { return player.supernova.points.gte(1) }
    },
	1: {
        requirementDescription: "Supernova Automation (Supernova 2) (m16)",
        effectDescription: "Keep ALL Pre-Supernova Automations and unlock Energy",
        done() { return player.supernova.points.gte(2) },
		unlocked(){ return hasMilestone('supernova', 0) },
    },
	2: {
        requirementDescription: "Energy Extension 1 (Supernova 3) (m17)",
        effectDescription: "Extend Energy Upgrades and autobuy FB and Star upgrades",
        done() { return player.supernova.points.gte(3) },
		unlocked(){ return hasMilestone('supernova', 1) },
    },
	3: {
        requirementDescription: "Energy Extension 2 (Supernova 4) (m18)",
        effectDescription: "Extend Energy Upgrades and Formula Stage is always 3",
        done() { return player.supernova.points.gte(4) },
		unlocked(){ return hasMilestone('supernova', 2) },
    },
	4: {
        requirementDescription: "Supernova Extension (Supernova ?) (m19)",
        effectDescription: "soon",
        done() { return player.supernova.points.gte("eeeee10") },
		unlocked(){ return hasMilestone('supernova', 3) },
    },
	},
	upgrades: {
		11: {
			title: "Supernova. (111)",
			description: "2x energy, xe3000 points",
			cost: new Decimal(10),
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova",
			unlocked(){ return hasMilestone('supernova', 1) }
		},
		12: {
			title: "Energetic (112)",
			description: "3x energy",
			cost: new Decimal(25),
			unlocked(){ return hasUpgrade('supernova', 11) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		13: {
			title: "Feed the star energy (113)",
			description: "Boost star size based on energy",
			cost: new Decimal(100),
			unlocked(){ return hasUpgrade('supernova', 12) },
			effect(){ return player.supernova.superEnergy.add(1).pow(0.25) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 13)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		14: {
			title: "Energizer (114)",
			description: "Boost energy based on energy",
			cost: new Decimal(125),
			unlocked(){ return hasUpgrade('supernova', 13) },
			effect(){ return player.supernova.superEnergy.add(1).pow(0.1) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 14)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		15: {
			title: "Size Increaser (115)",
			description: "Boost star size based on supernovas",
			cost: new Decimal(250),
			unlocked(){ return hasUpgrade('supernova', 14) },
			effect(){ return new Decimal(1.4).pow(player.supernova.points) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 15)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		21: {
			title: "Energy Points (116)",
			description: "Boost energy based on points",
			cost: new Decimal(1250),
			unlocked(){ return (hasUpgrade('supernova', 15) && hasMilestone('supernova', 2)) },
			effect(){ return new Decimal(1.1).pow(player.points.add(1).log(10).div(100000).add(1)) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 21)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova",
			tooltip(){ return "1.1<sup>((log<sub>10</sub>(points+1))/100000)+1</sup>" },
		},
		22: {
			title: "Energizer 2 (117)",
			description: "Boost energy based on energy again",
			cost: new Decimal(2000),
			unlocked(){ return hasUpgrade('supernova', 21) },
			effect(){ return player.supernova.superEnergy.add(1).pow(0.05) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 22)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		23: {
			title: "Energy Prestige (118)",
			description: "Boost energy based on PP",
			cost: new Decimal(3000),
			unlocked(){ return (hasUpgrade('supernova', 22)) },
			effect(){ return new Decimal(1.1).pow(player.p.points.add(1).log(10).div(100000).add(1)) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 23)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova",
			tooltip(){ return "1.1<sup>((log<sub>10</sub>(PP+1))/100000)+1</sup>" },
		},
		24: {
			title: "Energized Points (119)",
			description: "Boost points based on energy",
			cost: new Decimal(5000),
			unlocked(){ return hasUpgrade('supernova', 23) },
			effect(){ return player.supernova.superEnergy.add(1).pow(5000) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 24)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		25: {
			title: "Point Booster (120)",
			description: "Boost points based on supernovas",
			cost: new Decimal(7500),
			unlocked(){ return hasUpgrade('supernova', 24) },
			effect(){ return new Decimal("e4000").pow(player.supernova.points) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 25)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		31: {
			title: "PP booster (121)",
			description: "Boost PP based on supernovas",
			cost: new Decimal(10000),
			unlocked(){ return (hasUpgrade('supernova', 25) && hasMilestone('supernova', 3)) },
			effect(){ return new Decimal("e4000").pow(player.supernova.points) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 31)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		32: {
			title: "Energy+ (122)",
			description: "Boost energy based on supernovas",
			cost: new Decimal(12500),
			unlocked(){ return hasUpgrade('supernova', 31) },
			effect(){ return new Decimal(1.5).pow(player.supernova.points) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 32)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		33: {
			title: "Point Booster- (123)",
			description: "Boost points based on supernovas again",
			cost: new Decimal(75000),
			unlocked(){ return hasUpgrade('supernova', 32) },
			effect(){ return new Decimal("e3000").pow(player.supernova.points) },
			effectDisplay(){ return "x"+format(upgradeEffect('supernova', 33)) },
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova"
		},
		34: {
			title: "Supernova. (124)",
			description: "xe25000 points",
			cost: new Decimal(100000),
			currencyDisplayName: "Energy",
			currencyInternalName: "superEnergy",
			currencyLayer: "supernova",
			unlocked(){ return hasUpgrade('supernova', 33) }
		},
	},
	update(diff) {
		let gain = new Decimal(0)
		if (hasMilestone('supernova', 1)) gain = gain.add(1)
		if (hasUpgrade('supernova', 11)) gain = gain.times(2)
		if (hasUpgrade('supernova', 12)) gain = gain.times(3)
		if (hasUpgrade('supernova', 14)) gain = gain.times(upgradeEffect('supernova', 14))
		if (hasUpgrade('supernova', 21)) gain = gain.times(upgradeEffect('supernova', 21))
		if (hasUpgrade('supernova', 22)) gain = gain.times(upgradeEffect('supernova', 22))
		if (hasUpgrade('supernova', 23)) gain = gain.times(upgradeEffect('supernova', 23))
		if (hasUpgrade('supernova', 32)) gain = gain.times(upgradeEffect('supernova', 32))
		
		player.supernova.superEGain = gain
		gain = gain.times(diff)
		player.supernova.superEnergy = player.supernova.superEnergy.add(gain)
		if (hasMilestone('supernova', 3)) {
			player.fo.stage = new Decimal(3)
		}
	},
})
