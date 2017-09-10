console.log("JS Game");

let game;
let gameDate;

$( document ).ready(function() {
  InitGame();
  game.world.worldMaps[game.world.currentMap].Draw();
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
    this.world.worldMaps[game.world.currentMap].Draw();
  }

  this.Save = function(){
    localStorage.clear();
    localStorage.setItem("turnCounter", this.turnCounter);
    localStorage.setItem("character_x", this.character.x);
    localStorage.setItem("character_y", this.character.y);
    localStorage.setItem("character_gold", this.character.gold);
    localStorage.setItem("currentMap", this.world.currentMap);

    for(i = 0; i < this.character.inventory.items.length; i++){
      localStorage.setItem("character_inv_" + i + "_name", this.character.inventory.items[i].itemType.name);
      localStorage.setItem("character_inv_" + i + "_amount", this.character.inventory.items[i].amount);
    }
  }

  this.Load = function(){
    if(localStorage.getItem("turnCounter") != null)this.turnCounter = Number(localStorage.getItem("turnCounter"));
    if(localStorage.getItem("character_x") != null)this.character.x = Number(localStorage.getItem("character_x"));
    if(localStorage.getItem("character_y") != null)this.character.y = Number(localStorage.getItem("character_y"));
    if(localStorage.getItem("character_gold") != null)this.character.gold = Number(localStorage.getItem("character_gold"));
    if(localStorage.getItem("currentMap") != null)this.world.currentMap = localStorage.getItem("currentMap");

    for(i = 0; i < this.character.inventory.numCells; i++){
      if(localStorage.getItem("character_inv_" + i + "_name") != null){
        let itemName = localStorage.getItem("character_inv_" + i + "_name");
        let amount = Number(localStorage.getItem("character_inv_" + i + "_amount"));
        if(gameData.items[itemName] != null){
          this.character.inventory.AddItem(new Item(gameData.items[itemName], amount));
        }
      }
    }
  }
}

let GameData = function(){
  this.tileTypes = new Array();
  this.tileTypes["Grass"] = new TileType("Grass", "#008000");
  this.tileTypes["Grass"].image = "img/tiles/grass.png";
  this.tileTypes["Dirt"] = new TileType("Dirt", "#8b4513");
  this.tileTypes["Dirt"].image = "img/tiles/dirt.png";
  this.tileTypes["Wall"] = new TileType("Wall", "#808080");
  this.tileTypes["Wall"].image = "img/tiles/wall.png";
  this.tileTypes["Wall"].enterable = false;

  this.entities = new Array();
  this.entities["Gold"] = new EntityType("Gold");
  this.entities["Gold"].interaction = function(entity){
    game.character.gold++;
    game.character.inventory.AddItem(new Item(gameData.items["Gold Coin"], 1));
    entity.Destroy();
  }
  this.entities["Gold"].image = "img/items/goldcoin.png";

  this.entities["Portal"] = new EntityType("Portal");
  this.entities["Portal"].interaction = function(entity){
    game.character.x = entity.newX;
    game.character.y = entity.newY;
    game.world.currentMap = entity.newMap;
  }
  this.entities["Portal"].enterable = false;
  this.entities["Portal"].image = "img/portal.png";

  this.items = new Array();
  this.items["Gold Coin"] = new ItemType("Gold Coin");
  this.items["Gold Coin"].stackSize = 5;
  this.items["Gold Coin"].image = "img/items/goldcoin.png";
  
  console.log("Finished init gameData");
}

let World = function(){
  this.worldMaps = Array();

  this.worldMaps["enter"] = new WorldMap();
  this.worldMaps["enter"].GenerateFromArray([
    ['w', 'w', 'd', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'g', 'd', 'd', 'd', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'g', 'd', 'd', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'd', 'd', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'g', 'd', 'd', 'g', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'd', 'w', 'w']
  ],[
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'g', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'g', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
  ]);
  this.worldMaps["enter"].AddPortal(2, 0, "north", 2, 9);

  this.worldMaps["north"] = new WorldMap();
  this.worldMaps["north"].GenerateFromArray([
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'w', 'w', 'w', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'd', 'd', 'd', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'd', 'd', 'd', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'd', 'd', 'd', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'g', 'd', 'g', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'g', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
    ['w', 'w', 'd', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
  ],[
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'g', 'g', 'g', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'g', 'g', 'g', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'g', 'g', 'g', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
  ]);
  this.worldMaps["north"].AddPortal(2, 9, "enter", 2, 0);

  this.currentMap = "enter";
}

let WorldMap = function(){
  this.Generate = function(width, height){
    this.width = width;
    this.height = height;
    this.tiles = new Array();
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
  
  this.GenerateFromArray = function(tileArray, entityArray){
    this.width = tileArray.length;
    this.height = tileArray[0].length;
    this.tiles = new Array();
    for(y = 0; y < tileArray.length; y++){
      let col = new Array();
      for(x = 0; x < tileArray[y].length; x++){
        let type;
        switch(tileArray[y][x]){
          case 'g':
            type = gameData.tileTypes["Grass"];
            break;
          case 'd':
            type = gameData.tileTypes["Dirt"];
            break;
          case 'w':
            type = gameData.tileTypes["Wall"];
            break;
        }
        let tile = new WorldTile(type, x, y);
        
        switch(entityArray[y][x]){
          case 'g':
            tile.entity = new Entity(gameData.entities["Gold"], tile);
            break;
        }

        col.push(tile);
      }
      this.tiles.push(col);
    }
  }

  this.AddPortal = function(x, y, newMap, newX, newY){
    this.tiles[y][x].entity = new Entity(gameData.entities["Portal"], this.tiles[y][x]);
    this.tiles[y][x].entity.newMap = newMap;
    this.tiles[y][x].entity.newX = newX;
    this.tiles[y][x].entity.newY = newY;
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
    map += "<table class='DirButtons'>";
    map += "<tr><td onclick='game.character.Move(\"NW\")'>NW</td><td onclick='game.character.Move(\"N\")'>N</td><td onclick='game.character.Move(\"NE\")'>NE</td></tr>";
    map += "<tr><td onclick='game.character.Move(\"W\")'>W</td><td>...</td><td onclick='game.character.Move(\"E\")'>E</td></tr>";
    map += "<tr><td onclick='game.character.Move(\"SW\")'>SW</td><td onclick='game.character.Move(\"S\")'>S</td><td onclick='game.character.Move(\"SE\")'>SE</td></tr>";
    map += "</table><ul>";
    map += "<li>Turn #" + game.turnCounter + "</li>";
    map += "<li>Gold amount: " + game.character.gold + "</li>";
    map += "<li>Map: " + game.world.currentMap + "</li>";
    map += "<li>Position: " + game.character.x + ", " + game.character.y + "</li>";
    map += "</ul></div>";

    map += "<div class='col-md-2'>";
    map += "<h2>Inventory</h2>";
    map += "<ul>";
    for(i = 0; i < game.character.inventory.items.length; i++){
      map += "<li>";
      map += "<img src='" + game.character.inventory.items[i].itemType.image + "' />";
      map += game.character.inventory.items[i].amount;
      map += " ";
      map += game.character.inventory.items[i].itemType.name;
      map += "</li>";
    }
    map += "</ul>";
    map += "</div>";

    map += "</div>";
    document.getElementById("appendable").innerHTML = map;
  }

  this.TileIsEnterable = function(x, y){
    if(x < 0 || y < 0 || x >= this.width || y >= this.height){
      return false;
    }

    if(this.tiles[y][x].entity != null){
      let ent = true;
      if(!this.tiles[y][x].entity.type.enterable){
        ent = false;
      }
      this.tiles[y][x].entity.type.interaction(this.tiles[y][x].entity);
      return ent;
    }

    return this.tiles[y][x].type.enterable;
  }
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
  this.enterable = true;
}

let Entity = function(type, tile){
  this.type = type;
  this.tile = tile;

  this.Destroy = function(){
    this.tile.entity = null;
  }
}

let Character = function(x, y){
  this.x = x;
  this.y = y;
  this.gold = 0;
  this.inventory = new Inventory(10);

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
    if(game.world.worldMaps[game.world.currentMap].TileIsEnterable(this.x + dx, this.y + dy)){
      this.x += dx;
      this.y += dy;
    }
    game.DoTurn();
  }
}

let Item = function(itemType, amount){
  this.itemType = itemType;
  this.amount = amount;
}

let ItemType = function(name){
  this.stackSize = 99;
  this.name = name;
}

let Inventory = function(numCells){
  this.items = new Array();
  this.numCells = numCells;

  this.AddItem = function(item){
    for(i = 0; i < this.items.length; i++){
      if(this.items[i] != null){
        if(this.items[i].itemType == item.itemType){
          if(this.items[i].amount < this.items[i].itemType.stackSize){
            this.items[i].amount += item.amount;
            if(this.items[i].amount > this.items[i].itemType.stackSize){
              item.amount = this.items[i].amount - this.items[i].stackSize;
            }else{
              return;
            }
          }
        }
      }
    }
    
    if(this.items.length < this.numCells){
      let tempItem = new Item(item.itemType, item.amount);
      this.items.push(tempItem);
      if(tempItem.amount > tempItem.itemType.stackSize){
        item.amount = tempItem.amount - tempItem.itemType.stackSize;
        this.AddItem(item);
      }
    }
  }
}