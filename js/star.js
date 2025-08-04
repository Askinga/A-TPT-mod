addLayer("star", {
    name: "Star", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⭐", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    pointReq: new Decimal("e29000"),
    pointSize: new Decimal(0),
    }},
    color: "#dddd00",
    requires: new Decimal("e29000"), // Can be a function that takes requirement increases into account
    resource: "star size", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000000000000000000000000000000000000000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect(){ return player.star.points.add(1).pow(5) },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    resetsNothing(){ return true },
    canReset(){ return !player.star.unlocked },
    tabFormat: [
      ["display-text", function(){ return "The star is " + format(player.star.points) "km big, giving a x" + format(layers.star.effect()) + " boost to FP" }],
      "blank",
      "clickables",
      "upgrades",
      "prestige-button",
    ],
    sizePoints(){
      return new Decimal(0).add(Decimal.log(player.points.add(1), 10).div(29000).pow(1.25) 
    },
    layerShown(){return true},
    clickables: {
      11: {
        display(){ return "Feed the star " + format(player.points) + "points." },
        onClick(){ 
          player.star.pointSize = tmp.star.sizePoints 
          player.star.pointReq = player.points
        },
        canClick(){ return player.points.gte(player.star.pointReq) },
        },
    },
    update(diff){
      player.star.points = player.pointSize
    },
})
