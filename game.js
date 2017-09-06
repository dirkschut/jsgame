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
  
  this.GenerateFromArray = function(mapArray){
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
    let map = "<div class='row'><div class='col-md-4'><table id='map'>";
    for(y = 0; y < this.width; y++){
      map += "<tr>";
      for(x = 0; x < this.height; x++){
        map += "<td class='MapTile MapTile_" + this.tiles[y][x].type.name + "' style='background-color:" + this.tiles[y][x].type.color + "'>" + x + "," + y + "</td>";
      }
      map += "</tr>";
    }
    map += "</table></div>";

    map += "<div class='col-md-4'><table class='DirButtons'>";
    map += "<tr><td>NW</td><td>N</td><td>NE</td></tr>"
    map += "<tr><td>W</td><td>...</td><td>E</td></tr>"
    map += "<tr><td>SW</td><td>S</td><td>SE</td></tr>";
    map += "</table></div>";

    map += "</div>";
    document.getElementById("appendable").innerHTML = map;
  }

  this.tiles = new Array();
  this.width = width;
  this.height = height;
  this.Generate();
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
