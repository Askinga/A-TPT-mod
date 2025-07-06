addLayer("a", {
  name: "automation", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0),
      auto1: new Decimal(0),
    };
  },
  color: "#a0a0a0",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "automation power", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 1, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  tabFormat: {
    "Automations": {
      content: [
      "main-display",
      "blank",
      "prestige-button",
      "resource-display",
      ["display-text", "Automations! Control the automations in this tab. However, all automations cost Automation Power (AP) to operate. Later automations cost more AP per second so start grinding AP!"],
      "blank",
      "clickables",
      "blank"
      ],
    },
  },
  prestigeButtonText() {

    return (

      "Sacrifice all your points to AP, but divided by 10."

    );

  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: "side", // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "a",
      description: "A: Reset for AP",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return hasUpgrade("p", 13) || player.a.unlocked;
  },
  auto1(){
    return player.a.points.add(1).log10().add(1)
  },
  branches: ["p"],
  clickables: {

    11: {

        display() {
          let or = 'OFF'
          if (player.a.auto1.eq(0)) {
            or = 'OFF'
          } else {
            or = 'ON'
          }
          return format(tmp.a.auto1) + "% PP gain per second.<br>Cost: 1 AP per second.<br><h2>" + or 
        },
        canClick(){ return player.a.points.gte(1) },
        onClick(){
          if (player.a.auto1.eq(0)) {
            player.a.auto1 = new Decimal(1)
          } else {
            player.a.auto1 = new Decimal(0)
          }
        },
    },

},
    update(diff) {
      if (player.a.points.lt(0)) {

          player.a.points = new Decimal(0)

          player.a.auto1 = new Decimal(0)

      }
      
      let spend = new Decimal(0)
      if (player.a.auto1.eq(1)) spend = spend.add(1)
      
      spend = spend.times(diff)
      player.a.points = player.a.points.sub(spend)
      return spend
    },
});
