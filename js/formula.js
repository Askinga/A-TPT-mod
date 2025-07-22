addLayer("fo", {
    name: "formula", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
	        stage: new Decimal(0),
    }},
    onPrestige(){
	player.u.points = new Decimal(0)
    },
    color: "#0000ff",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "f points", // Name of prestige currency
    baseResource: "ultra prestige points", // Name of resource prestige is based on
    baseAmount() {return player.u.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    stage1(){
	return player.fo.points.add(1).pow(0.5)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Reset for f points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ["l", "s"],
    tabFormat [
	"main-display",
	"blank",
	["display-text", function() { return "<h2>Formula Stage " + format(player.fo.stage) + "</h2><br>The formula is (x+1)^0.5, boosting points by x" + format(tmp.fo.stage1) + "<br>where x is your f points" }],
	"prestige-button"
    ],
})
