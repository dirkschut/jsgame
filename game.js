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
  this.Generate();
  
  this.Generate = function(){
    for(y = 0; y < height; y++){
      let col = new Array();
      for(x = 0; x < width; x++){
        let type = gameData.tileTypes["Grass"];
        if((x + y) % 2 == 1){
          type = gameData.tileTypes["Dirt"];
        }
        col.push(new WorldTile(type, x, y));
      }
      this.tiles.push(col);
    }
  }
  
  this.GenerateFromArray(mapArray){
    for(y = 0; y < mapArray.length; y++){
      for(x = 0; x < mapArray[y].length; x++){
        switch(mapArray[y][x]){
          case 'g':
            tiles[y][x] = new WorldTile(gameData.tileTypes["Grass"]);
            break;
          default:
            tiles[y][x] = new WorldTile(gameData.tileTypes["Dirt"]);
            break;
        }
      }
    }
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
