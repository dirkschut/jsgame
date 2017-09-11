console.log("JS Game");

let game;
let gameData;

$( document ).ready(function() {
  InitGame();
  window.gameData.worldMaps[game.world.currentMap].Draw();
});

let InitGame = function(){
  window.gameData = new gameData();
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
    window.gameData.worldMaps[game.world.currentMap].Draw();
  }

  this.Save = function(){
    localStorage.clear();
    localStorage.setItem("turnCounter", this.turnCounter);
    localStorage.setItem("character_x", this.character.x);
    localStorage.setItem("character_y", this.character.y);
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
    if(localStorage.getItem("currentMap") != null)this.world.currentMap = localStorage.getItem("currentMap");

    for(i = 0; i < this.character.inventory.numCells; i++){
      if(localStorage.getItem("character_inv_" + i + "_name") != null){
        let itemName = localStorage.getItem("character_inv_" + i + "_name");
        let amount = Number(localStorage.getItem("character_inv_" + i + "_amount"));
        if(window.gameData.items[itemName] != null){
          this.character.inventory.AddItem(new Item(window.gameData.items[itemName], amount));
        }
      }
    }
  }
}

let World = function(){
<<<<<<< HEAD
=======
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

>>>>>>> parent of 9c82a1b... Scrolling maps
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
        let type = window.gameData.tileTypes["Grass"];
        if((x + y) % 2 == 1){
          type = window.gameData.tileTypes["Dirt"];
        }
        if(x == 0 || y == 0 || x == width - 1 || y == height -1){
          type = window.gameData.tileTypes["Wall"];
        }
        let tile = new WorldTile(type, x, y);
        tile.entity = new Entity(window.gameData.entities["Gold"], tile);
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
            type = window.gameData.tileTypes["Grass"];
            break;
          case 'd':
            type = window.gameData.tileTypes["Dirt"];
            break;
          case 'w':
            type = window.gameData.tileTypes["Wall"];
            break;
        }
        let tile = new WorldTile(type, x, y);
        
        switch(entityArray[y][x]){
          case 'g':
            tile.entity = new Entity(window.gameData.entities["Gold"], tile);
            break;
        }

        col.push(tile);
      }
      this.tiles.push(col);
    }
  }

  this.AddPortal = function(x, y, newMap, newX, newY){
    this.tiles[y][x].entity = new Entity(window.gameData.entities["Portal"], this.tiles[y][x]);
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
        
        if(this.tiles[y][x].entity != null){
          extra += "<img class='entity' src='" + this.tiles[y][x].entity.type.image + "' />";
        }

        if(x == game.character.x && y == game.character.y){
          extra += "<div class='character'>C</div>";
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
    if(window.gameData.worldMaps[game.world.currentMap].TileIsEnterable(this.x + dx, this.y + dy)){
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