let modInfo = {
  name: "A TPT mod?",
  author: "Askinga/Sanas",
  pointsName: "points",
  modFiles: ["layers.js", "tree.js", "automation.js", "levels.js", "super.js", "fighting.js", "ultra.js", "formula.js", "boosters.js"],

  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  offlineLimit: 1, // In hours
};

// Set your version in num and name
let VERSION = {
  num: "0.0",
  name: "Literally nothing",
};

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`;

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`;

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"];

function getStartPoints() {
  return new Decimal(modInfo.initialStartPoints);
}

// Determines if it should show points/sec
function canGenPoints() {
  return true;
}

// Calculate points/sec!
function getPointGen() {
  if (!canGenPoints()) return new Decimal(0);

  let gain = new Decimal(1);
  if (hasUpgrade("p", 14)) gain = gain.add(1);
  if (hasUpgrade("p", 21)) gain = gain.add(2);
  if (hasUpgrade("p", 31)) gain = gain.add(5);
  if (hasUpgrade("p", 11)) gain = gain.times(2);
  if (hasUpgrade("p", 12)) gain = gain.times(3);
  if (hasUpgrade("p", 22)) gain = gain.times(upgradeEffect("p", 22));
  if (hasUpgrade("p", 23)) gain = gain.times(upgradeEffect("p", 23));
  if (hasUpgrade("p", 24)) gain = gain.times(upgradeEffect("p", 24));
  if (hasUpgrade("p", 32)) gain = gain.times(upgradeEffect("p", 32));
  if (hasMilestone('p', 0)) gain = gain.times(2.5)
  if (hasMilestone('l', 0)) gain = gain.times(3)
  if (hasUpgrade("p", 42)) gain = gain.times(8);
  if (hasUpgrade("p", 52)) gain = gain.times(10);
  if (hasUpgrade("p", 55)) gain = gain.times(10);
  if (hasMilestone('l', 6)) gain = gain.times(100)
  if (hasUpgrade("s", 23)) gain = gain.times(2);
  if (hasUpgrade("s", 24)) gain = gain.times(2);
  if (hasUpgrade("s", 25)) gain = gain.times(2);
  if (hasUpgrade("f", 32)) gain = gain.times(tmp.f.syn1);
  if (hasUpgrade('u', 11)) gain = gain.times(1e5)
  gain = gain.times(layers.u.effect())
  gain = gain.times(buyableEffect("p", 11));
  if (player.fo.stage.eq(0)) gain = gain.times(tmp.fo.stage1)
  if (player.fo.stage.eq(1)) gain = gain.times(tmp.fo.stage0)
  if (player.fo.stage.eq(2)) gain = gain.times(tmp.fo.stage2)
  if (player.fo.stage.eq(3)) gain = gain.times(tmp.fo.stage3)
  if (inChallenge('s', 12)) gain = gain.pow(0.5)
  return gain;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {};
}

// Display extra things at the top of the page
var displayThings = [];

// Determines when the game "ends"
function isEndgame() {
  return player.points.gte(new Decimal("e280000000"));
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {};

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return 3600; // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {}
