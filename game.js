console.log("JS Game");

let game;
let gameDate;

$( document ).ready(function() {
  LoadGame();
});

let LoadGame = function(){
  gameData = new GameData();
  game = new Game();
  console.log("ready");
}

let Game = function(){
  this.world = new World();
}

let GameData = function(){
  this.tileTypes = new Array();
  this.tileTypes["Grass"] = new TileType("Grass");
  this.tileTypes["Dirt"] = new TileType("Dirt");
  console.log("Finished init gameData");
}

let World = function(){
  this.worldMap = new WorldMap(10, 10);
}

let WorldMap = function(width, height){
  this.tiles = new Array();
  for(y = 0; y < height; y++){
    let col = new Array();
    for(x = 0; x < width; x++){
      col.push(new WorldTile(gameData.tileTypes["Grass"], x, y));
    }
    this.tiles.push(col);
  }
}

let WorldTile = function(type, x, y){
  this.type = type;
  this.x = x;
  this.y = y;
}

let TileType = function(name){
  this.name = name;
}