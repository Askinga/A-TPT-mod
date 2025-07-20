addLayer("s", {
    name: "super prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    doReset(s) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[s].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
	if (player.a.auto6.eq(1)) keep.push("challenges");
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },
    passiveGeneration(){
	let p = new Decimal(0)
	if (player.a.auto6.eq(1)) p = p.add(tmp.a.auto3.div(100))
	return p
    },
    autoUpgrade(){ return player.a.auto6.eq(1) },
    color: "#568fff",
    requires: new Decimal("1e25"), // Can be a function that takes requirement increases into account
    resource: "super prestige points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('s', 15)) mult = mult.times(3)
	if (hasUpgrade('s', 21)) mult = mult.times(upgradeEffect('s', 21))
	if (hasUpgrade('u', 11)) mult = mult.times(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for super prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasMilestone("l", 7) || player.s.unlocked)},
    branches: ["p"],
    effect(){
        return player.s.points.add(1).pow(0.75)
    },
    effectDescription(){
	    return "which is boosting Prestige Points by x" + format(layers.s.effect())
    },
    upgrades: {
      11: {
    	  title: "A new upgrade (26)",
    	  description: "x5 prestige points.",
    	  cost: new Decimal(1),
    	  unlocked() {
      	    return true;
          },
      },
      12: {
    	  title: "A challenge? (27)",
    	  description: "Unlock a challenge.",
    	  cost: new Decimal(2),
    	  unlocked() {
      	    return hasUpgrade('s', 11);
          },
      },
      13: {
    	  title: "More levels (28)",
    	  description: "x8 prestige points and ÷1000 level requirement.",
    	  cost: new Decimal(5),
    	  unlocked() {
      	    return (hasUpgrade('s', 12) && hasChallenge('s', 11));
          },
      },
      14: {
    	  title: "A log effect (29)",
    	  description: "Boost the level base effect based on super prestige points. (Starts at +0.2)",
    	  cost: new Decimal(10),
    	  unlocked() {
      	    return (hasUpgrade('s', 13));
          },
	  effect(){
	    return player.s.points.add(1).log(25).add(1).div(5)
	  },
	  tooltip(){
	    return "log<sub>25</sub>((SP+1)+1)/5"
	  },
	  effectDisplay(){
	      return "+"+format(upgradeEffect('s', 14))
	  },
      },
      15: {
    	  title: "SP gain buff (30)",
    	  description: "x10 prestige points and x3 SP.",
    	  cost: new Decimal(20),
    	  unlocked() {
      	    return (hasUpgrade('s', 14) && hasChallenge('s', 11));
          },
      },
      21: {
    	  title: "Log effect 2 (31)",
    	  description: "Boost SP based on points",
    	  cost: new Decimal(200),
    	  unlocked() {
      	    return (hasUpgrade('s', 15));
          },
	  effect(){
	    return player.points.add(1).log(10).add(20).div(20)
	  },
	  tooltip(){
	    return "log<sub>10</sub>((points+1)+20)/20"
	  },
	  effectDisplay(){
	      return "x"+format(upgradeEffect('s', 21))
	  },
      },
      22: {
    	  title: "A challenge, again? (32)",
    	  description: "Unlock another challenge.",
    	  cost: new Decimal(500),
    	  unlocked() {
      	    return hasUpgrade('s', 21);
          },
      },
      23: {
    	  title: "Push to a new layer (33)",
    	  description: "x2 points.",
    	  cost: new Decimal(750),
    	  unlocked() {
      	    return (hasUpgrade('s', 22) && hasChallenge('s', 12));
          },
      },
      24: {
    	  title: "Push to a new layer (34)",
    	  description: "x2 points, again?",
    	  cost: new Decimal(800),
    	  unlocked() {
      	    return hasUpgrade('s', 23);
          },
      },
      25: {
    	  title: "Push to a new layer (35)",
    	  description: "x2 points, AGAIN??? And unlock a new layer.",
    	  cost: new Decimal(1000),
    	  unlocked() {
      	    return hasUpgrade('s', 24);
          },
      },
    },
    challenges: {
    11: {
	unlocked(){ return hasUpgrade('s', 12) },
        name: "Unleveled",
        challengeDescription: "Remove the level effect",
        canComplete: function() {return player.p.points.gte(1e20)},
        goalDescription: "1e20 prestige points",
	rewardDescription: "x10 prestige points and unlock further upgrades"
    },
    12: {
	unlocked(){ return hasUpgrade('s', 22) },
        name: "Prestige Debuff",
        challengeDescription: "^0.5 points and ^0.75 prestige points",
        canComplete: function() {return player.p.points.gte(1e20)},
        goalDescription: "1e20 prestige points",
	rewardDescription: "+0.3 level effect base and unlock further upgrades"
    },
    },
})
