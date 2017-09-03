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
  this.tileTypes["Grass"] = new TileType("Grass", "#008000");
  this.tileTypes["Dirt"] = new TileType("Dirt", "#8b4513");
  console.log("Finished init gameData");
}

let World = function(){
  this.worldMap = new WorldMap(10, 10);
  this.worldMap.Draw();
}

let WorldMap = function(width, height){
  this.tiles = new Array();
  this.width = width;
  this.height = height;
  for(y = 0; y < height; y++){
    let col = new Array();
    for(x = 0; x < width; x++){
      let type = gameData.tileTypes["Grass"];
      if(x == 0 || y == 0 || x == this.width -1 || y == this.height - 1){
        type = gameData.tileTypes["Dirt"];
      }
      col.push(new WorldTile(type, x, y));
    }
    this.tiles.push(col);
  }
  
  this.Draw = function(){
    let map = "<table id='map'>";
    for(y = 0; y < this.width; y++){
      map += "<tr>";
      for(x = 0; x < this.height; x++){
        map += "<td style='background-color:" + this.tiles[y][x].type.color + "'>" + x + "," + y + "</td>";
      }
      map += "</tr>";
    }
    map += "</table>";
    document.getElementById("appendable").innerHTML = map;
  }
}

let WorldTile = function(type, x, y){
  this.type = type;
  this.x = x;
  this.y = y;
}

let TileType = function(name, color){
  this.name = name;
  this.color = color;
}