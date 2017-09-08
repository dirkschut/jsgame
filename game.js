console.log("JS Game");

let game;
let gameDate;

$( document ).ready(function() {
  LoadGame();
  game.world.worldMap.Draw();
});

let LoadGame = function(){
  gameData = new GameData();
  game = new Game();
  console.log("ready");
}

let Game = function(){
  this.world = new World();
  this.character = new Character(4, 4);
  this.turnCounter = 0;

  this.DoTurn = function(){
    this.turnCounter++;
    this.world.worldMap.Draw();
  }
}

let GameData = function(){
  this.tileTypes = new Array();
  this.tileTypes["Grass"] = new TileType("Grass", "#008000");
  this.tileTypes["Dirt"] = new TileType("Dirt", "#8b4513");
  this.tileTypes["Wall"] = new TileType("Wall", "#808080");
  this.tileTypes["Wall"].enterable = false;
  console.log("Finished init gameData");
}

let World = function(){
  this.worldMap = new WorldMap(10, 10);
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
        if(x == 0 || y == 0 || x == width - 1 || y == height -1){
          type = gameData.tileTypes["Wall"];
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
        let extra = "";

        if(x == game.character.x && y == game.character.y){
          extra += "C";
        }

        map += "<td class='MapTile MapTile_" + this.tiles[y][x].type.name + "' style='background-color:" + this.tiles[y][x].type.color + "'>" + extra + "</td>";
      }
      map += "</tr>";
    }
    map += "</table></div>";

    map += "<div class='col-md-2'>";
    map += "<p>Turn #" + game.turnCounter + "</p>";
    map += "<table class='DirButtons'>";
    map += "<tr><td onclick='game.character.Move(\"NW\")'>NW</td><td onclick='game.character.Move(\"N\")'>N</td><td onclick='game.character.Move(\"NE\")'>NE</td></tr>";
    map += "<tr><td onclick='game.character.Move(\"W\")'>W</td><td>...</td><td onclick='game.character.Move(\"E\")'>E</td></tr>";
    map += "<tr><td onclick='game.character.Move(\"SW\")'>SW</td><td onclick='game.character.Move(\"S\")'>S</td><td onclick='game.character.Move(\"SE\")'>SE</td></tr>";
    map += "</table></div>";

    map += "</div>";
    document.getElementById("appendable").innerHTML = map;
  }

  this.TileIsEnterable = function(x, y){
    if(x < 0 || y < 0 || x >= this.width || y >= this.height){
      return false;
    }
    return this.tiles[y][x].type.enterable;
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
  this.enterable = true;
}

let Character = function(x, y){
  this.x = x;
  this.y = y;

  this.Move = function(dir){
    let xd = 0;
    let dy = 0;
    switch(dir){
      case "NW":
        dy = -1;
        dx = -1;
        break;
      case "N":
        dy = -1;
        dx = 0;
        break;
      case "NE":
        dy = -1;
        dx = 1;
        break;
      case "W":
        dy = 0;
        dx = -1;
        break;
      case "E":
        dy = 0;
        dx = 1;
        break;
      case "SW":
        dy = 1;
        dx = -1;
        break;
      case "S":
        dy = 1;
        dx = 0;
        break;
      case "SE":
        dy = 1;
        dx = 1;
        break;
    }
    if(game.world.worldMap.TileIsEnterable(this.x + dx, this.y + dy)){
      this.x += dx;
      this.y += dy;
    }
    game.DoTurn();
  }
}