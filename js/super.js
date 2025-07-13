addLayer("s", {
    name: "super prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
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
        challengeDescription: "^0.5 points and ^0.775 prestige points",
        canComplete: function() {return player.p.points.gte(1e20)},
        goalDescription: "1e20 prestige points",
	rewardDescription: "+0.3 level effect base and unlock further upgrades"
    },
    },
})
