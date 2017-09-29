console.log("JS Game");

let game;
let gameData;

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
        if(gameData.items[itemName] != null){
          this.character.inventory.AddItem(new Item(gameData.items[itemName], amount));
        }
      }
    }
  }
}

let GameData = function(){
  this.LoadTileTypes = function(){
    this.tileTypes = new Array();
    this.tileTypes["Grass"] = new TileType("Grass", "#008000");
    this.tileTypes["Grass"].image = "img/tiles/grass.png";
    this.tileTypes["Dirt"] = new TileType("Dirt", "#8b4513");
    this.tileTypes["Dirt"].image = "img/tiles/dirt.png";
    this.tileTypes["Wall"] = new TileType("Wall", "#808080");
    this.tileTypes["Wall"].image = "img/tiles/wall.png";
    this.tileTypes["Wall"].enterable = false;
  }
  
  this.LoadEntities = function(){
    this.entities = new Array();
    this.entities["Gold"] = new EntityType("Gold");
    this.entities["Gold"].interaction = function(entity){
      game.character.inventory.AddItem(new Item(gameData.items["Gold Coin"], 1));
      entity.Destroy();
    }
    this.entities["Gold"].image = "img/items/goldcoin.png";

    this.entities["Iron Ore"] = new EntityType("Iron Ore");
    this.entities["Iron Ore"].interaction = function(entity){
      game.character.inventory.AddItem(new Item(gameData.items["Iron Ore"], 1));
    }
    this.entities["Iron Ore"].enterable = false;
    this.entities["Iron Ore"].image = "img/items/ironore.png";

    this.entities["Furnace"] = new EntityType("Furnace");
    this.entities["Furnace"].interaction = function(entity){
      if(game.character.inventory.RemoveItem(new Item(gameData.items["Iron Ore"], 1))){
        game.character.inventory.AddItem(new Item(gameData.items["Iron Ingot"], 1));
      }
    }
    this.entities["Furnace"].enterable = false;
    this.entities["Furnace"].image = "img/furnace.png";
  
    this.entities["Portal"] = new EntityType("Portal");
    this.entities["Portal"].interaction = function(entity){
      game.character.x = entity.newX;
      game.character.y = entity.newY;
      game.world.currentMap = entity.newMap;
    }
    this.entities["Portal"].enterable = false;
    this.entities["Portal"].image = "img/portal.png";
  }
  
  this.LoadItems = function(){
    this.items = new Array();
    this.items["Gold Coin"] = new ItemType("Gold Coin");
    this.items["Gold Coin"].stackSize = 100;
    this.items["Gold Coin"].image = "img/items/goldcoin.png";

    this.items["Iron Ore"] = new ItemType("Iron Ore");
    this.items["Iron Ore"].stackSize = 32;
    this.items["Iron Ore"].image = "img/items/ironore.png";

    this.items["Iron Ingot"] = new ItemType("Iron Ingot");
    this.items["Iron Ingot"].stackSize = 32;
    this.items["Iron Ingot"].image = "img/items/ironingot.png";
  }
  
  this.LoadTileTypes();
  this.LoadEntities();
  this.LoadItems();
  console.log("Finished init gameData");
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
              item.amount = this.items[i].amount - this.items[i].itemType.stackSize;
              this.items[i].amount = this.items[i].itemType.stackSize;
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

  this.RemoveItem = function(item){
    for(i = 0; i < this.items.length; i++){
      if(this.items[i].itemType == item.itemType  ){
        this.items[i].amount -= item.amount;
        if(this.items[i].amount == 0){
          this.items.splice(i);
          return true;
        }else if(this.items[i].amount < 0){
          item.amount = Math.abs();
          this.items.splice(i);
          return this.RemoveItem(item);
        }else{
          return true;
        }
      }
    }
  }
}