console.log("JS Game");

let game;
let gameDate;

$( document ).ready(function() {
  InitGame();
  game.world.worldMap.Draw();
});

let InitGame = function(){
  gameData = new GameData();
  game = new Game();
  game.Load();
  console.log("ready");
}

let Game = function(){
  this.world = new World();
  this.character = new Character(4, 4);
  this.turnCounter = 0;

  this.DoTurn = function(){
    this.turnCounter++;
    this.Save();
    this.world.worldMap.Draw();
  }

  this.Save = function(){
    localStorage.setItem("turnCounter", this.turnCounter);
    localStorage.setItem("character_x", this.character.x);
    localStorage.setItem("character_y", this.character.y);
    localStorage.setItem("character_gold", this.character.gold);
  }

  this.Load = function(){
    if(localStorage.getItem("turnCounter") != null)this.turnCounter = Number(localStorage.getItem("turnCounter"));
    if(localStorage.getItem("character_x") != null)this.character.x = Number(localStorage.getItem("character_x"));
    if(localStorage.getItem("character_y") != null)this.character.y = Number(localStorage.getItem("character_y"));
    if(localStorage.getItem("character_gold") != null)this.character.gold = Number(localStorage.getItem("character_gold"));
  }
}

let GameData = function(){
  this.tileTypes = new Array();
  this.tileTypes["Grass"] = new TileType("Grass", "#008000");
  this.tileTypes["Grass"].image = "grass.png";
  this.tileTypes["Dirt"] = new TileType("Dirt", "#8b4513");
  this.tileTypes["Dirt"].image = "dirt.png";
  this.tileTypes["Wall"] = new TileType("Wall", "#808080");
  this.tileTypes["Wall"].image = "wall.png";
  this.tileTypes["Wall"].enterable = false;

  this.entities = new Array();
  this.entities["Gold"] = new Entity("Gold");
  this.entities["Gold"].interaction = function(entity){
    game.character.gold++;
    entity.Destroy();
  }
  this.entities["Gold"].image = "goldcoin.png";
  
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
        let tile = new WorldTile(type, x, y);
        tile.entity = new Entity(gameData.entities["Gold"], tile);
        col.push(tile);
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

        if(this.tiles[y][x].entity != null){
          extra += "<img src='" + this.tiles[y][x].entity.type.image + "' />";
        }

        map += "<td class='MapTile MapTile_" + this.tiles[y][x].type.name + "' style='background-color:" + this.tiles[y][x].type.color + "; background-image: url(\"" + this.tiles[y][x].type.image + "\")'>" + extra + "</td>";
      }
      map += "</tr>";
    }
    map += "</table></div>";

    map += "<div class='col-md-2'>";
    map += "<p>Turn #" + game.turnCounter + "</p>";
    map += "<p>Gold amount: " + game.character.gold + "</p>";
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
    if(this.tiles[y][x].entity != null){
      this.tiles[y][x].entity.type.interaction(this.tiles[y][x].entity);
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
  this.entity = null;
}

let TileType = function(name, color){
  this.name = name;
  this.color = color;
  this.image = "";
  this.enterable = true;
}

let EntityType = function(name){
  this.name = "";
  this.interaction = null;
  this.image = "";
}

let Entity = function(type, tile){
  this.type = type;
  this.tile = tile;

  console.log(this.tile);

  this.Destroy = function(){
    console.log(this.tile);
    this.tile.entity = null;
  }
}

let Character = function(x, y){
  this.x = x;
  this.y = y;
  this.gold = 0;

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