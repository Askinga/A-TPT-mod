addLayer("p", {
  name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      prestigePower: new Decimal(0),
      pPowerGain: new Decimal(0),
    };
  },
  passiveGeneration() {
    let p = new Decimal(0);
    if (player.a.auto1.eq(1)) p = p.add(tmp.a.auto1.div(100));
    return p;
  },
  onPrestige() {
    let mult = new Decimal(1);
    if (hasUpgrade("p", 25)) mult = mult.times(buyableEffect("p", 12));
    if (hasUpgrade('p', 44)) mult = mult.times(2.5);
    if (hasMilestone('p', 0)) mult = mult.times(2.5)
    if (hasMilestone('l', 3)) mult = mult.times(15)
    let gain = player.points.pow(0.25).times(mult);
    if (hasUpgrade("p", 15)) {
      player.p.prestigePower = player.p.prestigePower.add(gain);
    }
  },
  automate() {
    if (player.a.auto4.eq(1)) {
      if (canBuyBuyable('p', 11)) {
        buyBuyable('p', 11)
      }
      if (canBuyBuyable('p', 12)) {
        buyBuyable('p', 12)
      }
      if (canBuyBuyable('p', 13)) {
        buyBuyable('p', 13)
      }
    }
  },
  color: "#00aaff",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "prestige points", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    if (hasUpgrade("p", 33)) mult = mult.times(upgradeEffect("p", 33));
    if (hasUpgrade("p", 34)) mult = mult.times(upgradeEffect("p", 34));
    if (hasUpgrade("p", 42)) mult = mult.times(2.5);
    if (hasUpgrade("p", 35)) mult = mult.times(buyableEffect("p", 13));
    if (hasUpgrade('p', 43)) mult = mult.times(2.5)
    if (hasUpgrade('p', 51)) mult = mult.times(3)
    if (hasUpgrade('p', 53)) mult = mult.times(4)
    if (hasUpgrade('p', 54)) mult = mult.times(10)
    if (hasUpgrade('s', 11)) mult = mult.times(5)
    if (hasUpgrade('s', 13)) mult = mult.times(8)
    if (hasUpgrade('s', 15)) mult = mult.times(10)
    
    if (!inChallenge('s', 11)) mult = mult.times(layers.l.effect())
    if (hasMilestone('l', 1)) mult = mult.times(1.75)
    if (hasMilestone('l', 2)) mult = mult.times(3)
    if (hasMilestone('l', 7)) mult = mult.times(10)
    if (hasChallenge('s', 11)) mult = mult.times(10)
    if (hasUpgrade("f", 33)) mult = mult.times(tmp.f.syn2);
    if (hasUpgrade("u", 11)) mult = mult.times(10)
    if (hasUpgrade("u", 13)) mult = mult.times(tmp.u.syn3)
    mult = mult.times(layers.s.effect())
    return mult;
  },
  autoUpgrade(){ return player.a.auto3.eq(1) },
  tabFormat: {
    Main: {
      content: [
        "main-display",

        "prestige-button",

        "resource-display",

        [
          "display-text",
          function () {
            return "Prestige. The first start of the game.";
          },
        ],

        "blank",

        "upgrades",

        "blank",
      ],
    },
    "Prestige Power": {
      unlocked() {
        return hasUpgrade("p", 15);
      },
      content: [
        [
          "display-text",
          function () {
            return (
              'You have <span style=" color: rgb(0, 200, 255); text-shadow: rgb(0, 200, 255) 0px 0px 10px"><h2>' +
              format(player.p.prestigePower) +
              "</h2></span> Prestige Power"
            );
          },
        ],

        "blank",

        "prestige-button",

        "resource-display",
        [
          "display-text",
          function () {
            return (
              "You will gain " +
              format(player.p.pPowerGain) +
              " Prestige Power on reset."
            );
          },
        ],

        [
          "display-text",
          function () {
            return "Prestige Power. This new currency can buy Prestige Buyables, boosting progression!";
          },
        ],

        "blank",

        "buyables",

        "blank",
      ],
    },
    Milestones: {
      unlocked() {
        return hasUpgrade("p", 41);
      },
      content: [
        "main-display",
        "prestige-button",
        "resource-display",
        [
          "display-text",
          function () {
            return "Milestones. They give a boost when reached.";
          },
        ],
        "blank",
        "milestones",
        "blank",
      ],
    },
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    exp = new Decimal(1);
    if (inChallenge('s', 12)) exp = exp.times(0.75)
    return exp
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "p",
      description: "P: Reset for prestige points",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return true;
  },
  upgrades: {
    11: {
      title: "The first upgrade (1)",
      description: "Basically doubles your point gain.",
      cost: new Decimal(1),
    },
    12: {
      title: "An ordinary upgrade (2)",

      description() {
        return "x2.5 your point gain? No, Triple it.";
      },

      cost: new Decimal(3),

      unlocked() {
        return hasUpgrade("p", 11);
      },
    },
    13: {
      title: "What? (3)",

      description() {
        return "Unlock Automation this early? With something new.";
      },

      cost: new Decimal(10),

      unlocked() {
        return hasUpgrade("p", 12);
      },
    },
    14: {
      title: "Based (4)",

      description() {
        return "Add 1 to base point gain.";
      },

      cost: new Decimal(15),

      unlocked() {
        return hasUpgrade("p", 13);
      },
    },
    15: {
      title: "Prestige power (5)",

      description() {
        return "Why do we keep on adding new features this early? And unlock a new automation.";
      },

      cost: new Decimal(35),

      unlocked() {
        return hasUpgrade("p", 14);
      },
    },
    21: {
      title: "Based 2 (6)",

      description() {
        return "Add 2 to base point gain.";
      },

      cost: new Decimal(300),

      unlocked() {
        return hasUpgrade("p", 15);
      },
    },
    22: {
      title: "Growing? (7)",

      description() {
        return "Boost points based on p11 purchases.";
      },

      cost: new Decimal(750),

      unlocked() {
        return hasUpgrade("p", 21);
      },

      effect() {
        return getBuyableAmount("p", 11).add(1).pow(0.5);
      },
      effectDisplay() {
        return "x" + format(upgradeEffect("p", 22));
      },
    },
    23: {
      title: "Growing. (8)",

      description() {
        return "Boost points based on prestige points.";
      },

      cost: new Decimal(1750),

      unlocked() {
        return hasUpgrade("p", 22);
      },

      effect() {
        let eff = player.p.points.add(1).pow(0.2);
        eff = softcap(eff, new Decimal("1e20"), 0.5)
        return eff
      },

      effectDisplay() {
        let s = ""
        let upgEffect = upgradeEffect(this.layer, this.id)
        if (upgEffect.gte(new Decimal("1e20")) ) {
            s = " (Softcapped)"
        }
        return "x" + format(upgradeEffect("p", 23)) + s;
      },
    },
    24: {
      title: "Growing! (9)",

      description() {
        return "Boost points based on points.";
      },

      cost: new Decimal(5000),

      unlocked() {
        return hasUpgrade("p", 23);
      },

      effect() {
        return player.points.add(1).pow(0.1);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("p", 24));
      },
    },
    25: {
      title: "Buyable (10)",

      description() {
        return "Unlock a new Prestige Buyable.";
      },

      cost: new Decimal(10000),

      unlocked() {
        return hasUpgrade("p", 24);
      },
    },
    31: {
      title: "Based 3 (11)",

      description() {
        return "Add 5 to base point gain.";
      },

      cost: new Decimal(22500),

      unlocked() {
        return hasUpgrade("p", 25);
      },
    },
    32: {
      title: "What... (12)",

      description() {
        return "Boost points based on prestige power.";
      },

      cost: new Decimal("e5"),

      unlocked() {
        return hasUpgrade("p", 31);
      },

      effect() {
        return player.p.prestigePower.add(1).pow(0.15);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },
    },
    33: {
      title: "Swapped (13)",
      description() {
        return "Boost prestige points based on points.";
      },
      cost: new Decimal(400000),
      unlocked() { return hasUpgrade("p", 32)  },
      effect() {
        return player.points.add(1).pow(0.04);
      },
      effectDisplay() {
        return "x" + format(upgradeEffect("p", 33));
      },
    },
    34: {
      title: "Okay. (14)",
      description() {
        return "Boost prestige points based on prestige power.";
      },
      cost: new Decimal(1000000),
      unlocked() { return hasUpgrade("p", 33)  },
      effect() {
        return player.p.prestigePower.add(1).pow(0.1);
      },
      effectDisplay() {
        return "x" + format(upgradeEffect("p", 34));
      },
    },
    35: {
      title: "Buyable (15)",
      description() {
        return "Unlock a new Prestige Buyable.";
      },
      cost: new Decimal("3e6"),
      unlocked() {
        return hasUpgrade("p", 34);
      },
    },
    41: {
      title: "Milestones, has been unlocked... (16)",
      description() {
        return "Unlock Milestones.";
      },
      cost: new Decimal("e8"),
      unlocked() { return hasUpgrade("p", 35)  },
    },
    42: {
      title: "Boost (17)",
      description() {
        return "x8 Points.";
      },
      cost: new Decimal("4e8"),
      unlocked() { return hasUpgrade("p", 41)  },
    },
    43: {
      title: "There will be something new... (18)",
      description() {
        return "x2.5 prestige points.";
      },
      cost: new Decimal("1.25e9"),
      unlocked() { return hasUpgrade("p", 42)  },
    },
    44: {
      title: "Almost there (19)",
      description() {
        return "x2.5 prestige power.";
      },
      cost: new Decimal("5e9"),
      unlocked() { return hasUpgrade("p", 43)  },
    },
    45: {
      title: "NEXT LAYER! (20)",
      description() {
        return "Unlock a new layer.";
      },
      cost: new Decimal("e10"),
      unlocked() { return hasUpgrade("p", 44)  },
    },
    51: {
      title: "ExPre1 (21)",
      description() {
        return "x3 prestige points.";
      },
      cost: new Decimal("e15"),
      unlocked() { return (hasMilestone("l", 4) && hasUpgrade('p', 45)) },
    },
    52: {
      title: "ExPre2 (22)",
      description() {
        return "x10 points.";
      },
      cost: new Decimal("e16"),
      unlocked() { return (hasMilestone("l", 4) && hasUpgrade('p', 51)) },
    },
    53: {
      title: "ExPre3 (23)",
      description() {
        return "x4 prestige points.";
      },
      cost: new Decimal("e17"),
      unlocked() { return (hasMilestone("l", 4) && hasUpgrade('p', 52)) },
    },
    54: {
      title: "ExPre4 (24)",
      description() {
        return "x10 prestige points.";
      },
      cost: new Decimal("e18"),
      unlocked() { return (hasMilestone("l", 4) && hasUpgrade('p', 53)) },
    },
    55: {
      title: "ExPre5 (25)",
      description() {
        return "x10 points.";
      },
      cost: new Decimal("e20"),
      unlocked() { return (hasMilestone("l", 4) && hasUpgrade('p', 54)) },
    },
  },
  update(diff) {
    let mult = new Decimal(1);
    if (hasUpgrade("p", 25)) mult = mult.times(buyableEffect("p", 12));
    if (hasUpgrade('p', 44)) mult = mult.times(2.5);
    if (hasMilestone('p', 0)) mult = mult.times(2.5)
    if (hasMilestone('l', 3)) mult = mult.times(15)
    player.p.pPowerGain = player.points.pow(0.25).times(mult);
    if (player.a.auto2.eq(1)) {
      player.p.prestigePower = player.p.prestigePower.add(
        player.p.pPowerGain.times(diff).times(tmp.a.auto2).div(100)
      );
    }
  },
  buyables: {
    11: {
      title: "p11",

      cost(x) {
        return new Decimal(1.25).pow(x.pow(x.div(250).add(1)));
      },

      display() {
        return (
          "x1.25 Points per level.<br>Cost: " +
          format(this.cost()) +
          " Prestige Power<br>Bought: " +
          format(getBuyableAmount("p", 11)) +
          "<br>Effect: x" +
          format(buyableEffect("p", 11)) +
          " Points"
        );
      },

      canAfford() {
        return player[this.layer].prestigePower.gte(this.cost());
      },

      buy() {
        player[this.layer].prestigePower = player[this.layer].prestigePower.sub(
          this.cost()
        );

        setBuyableAmount(
          this.layer,
          this.id,
          getBuyableAmount(this.layer, this.id).add(1)
        );
      },
      effect(x) {
        let base1 = new Decimal(1.25);
        let base2 = x;
        let expo = new Decimal(1);
        return base1.pow(Decimal.pow(base2, expo));
      },
    },
    12: {
      unlocked() {
        return hasUpgrade("p", 25);
      },
      title: "p12",
      cost(x) {
        return new Decimal(1.3).pow(x.pow(x.div(200).add(1)));
      },
      display() {
        return (
          "x1.125 Prestige Power per level.<br>Cost: " +
          format(this.cost()) +
          " Prestige Power<br>Bought: " +
          format(getBuyableAmount(this.layer, this.id)) +
          "<br>Effect: x" +
          format(buyableEffect(this.layer, this.id)) +
          " Prestige Power"
        );
      },
      canAfford() {
        return player[this.layer].prestigePower.gte(this.cost());
      },
      buy() {
        player[this.layer].prestigePower = player[this.layer].prestigePower.sub(
          this.cost()
        );
        setBuyableAmount(
          this.layer,
          this.id,
          getBuyableAmount(this.layer, this.id).add(1)
        );
      },
      effect(x) {
        let base1 = new Decimal(1.125);
        let base2 = x;
        let expo = new Decimal(1);
        return base1.pow(Decimal.pow(base2, expo));
      },
    },
    13: {
      unlocked() {
        return hasUpgrade("p", 35);
      },
      title: "p13",
      cost(x) {
        return new Decimal(1.5).pow(x.pow(x.div(175).add(1)));
      },
      display() {
        return (
          "x1.1 Prestige Points per level.<br>Cost: " +
          format(this.cost()) +
          " Prestige Power<br>Bought: " +
          format(getBuyableAmount(this.layer, this.id)) +
          "<br>Effect: x" +
          format(buyableEffect(this.layer, this.id)) +
          " Prestige Points"
        );
      },
      canAfford() {
        return player[this.layer].prestigePower.gte(this.cost());
      },
      buy() {
        player[this.layer].prestigePower = player[this.layer].prestigePower.sub(
          this.cost()
        );
        setBuyableAmount(
          this.layer,
          this.id,
          getBuyableAmount(this.layer, this.id).add(1)
        );
      },
      effect(x) {
        let base1 = new Decimal(1.1);
        let base2 = x;
        let expo = new Decimal(1);
        return base1.pow(Decimal.pow(base2, expo));
      },
    },
  },
  milestones: {
    0: {
        requirementDescription: "Unlock this tab (m1)",
        effectDescription: "x2.5 Prestige Power, prestige points and points",
        done() { return hasUpgrade('p', 41) }
    },
  },
});
