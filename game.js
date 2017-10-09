console.log("JS Game");

let game;
let gameData;

$( document ).ready(function() {
  InitGame();
  switch(GetParameterByName("p")){
    case "news":
      new News().Draw();
      break;
    default:
      game.world.worldMaps[game.world.currentMap].Draw();
      break;
  }
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

    for(let i = 0; i < this.character.inventory.items.length; i++){
      localStorage.setItem("character_inv_" + i + "_name", this.character.inventory.items[i].itemType.name);
      localStorage.setItem("character_inv_" + i + "_amount", this.character.inventory.items[i].amount);
    }

    for(skill in this.character.skills){
      localStorage.setItem("character_skill_" + skill, this.character.skills[skill].xp);
    }
  }

  this.Load = function(){
    console.log("Loading save");
    if(localStorage.getItem("turnCounter") != null)this.turnCounter = Number(localStorage.getItem("turnCounter"));
    if(localStorage.getItem("character_x") != null)this.character.x = Number(localStorage.getItem("character_x"));
    if(localStorage.getItem("character_y") != null)this.character.y = Number(localStorage.getItem("character_y"));
    if(localStorage.getItem("currentMap") != null)this.world.currentMap = localStorage.getItem("currentMap");

    for(let i = 0; i < this.character.inventory.numCells; i++){
      if(localStorage.getItem("character_inv_" + i + "_name") != null){
        let itemName = localStorage.getItem("character_inv_" + i + "_name");
        let amount = Number(localStorage.getItem("character_inv_" + i + "_amount"));
        if(gameData.items[itemName] != null){
          this.character.inventory.AddItem(new Item(gameData.items[itemName], amount));
        }
      }
    }

    for(skill in this.character.skills){
      if(localStorage.getItem("character_skill_" + skill) != null)this.character.skills[skill].xp = Number(localStorage.getItem("character_skill_" + skill));
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
    this.entities["Gold"].interaction = this.actions["Gold Coin"];
    this.entities["Gold"].image = "img/items/goldcoin.png";
    
    this.entities["Silver"] = new EntityType("Silver");
    this.entities["Silver"].interaction = this.actions["Silver Coin"];
    this.entities["Silver"].image = "img/items/silvercoin.png";

    this.entities["Copper"] = new EntityType("Copper");
    this.entities["Copper"].interaction = this.actions["Copper Coin"];
    this.entities["Copper"].image = "img/items/coppercoin.png";

    this.entities["Iron Ore"] = new EntityType("Iron Ore");
    this.entities["Iron Ore"].interaction = this.actions["Mine Iron"];
    this.entities["Iron Ore"].enterable = false;
    this.entities["Iron Ore"].image = "img/items/ironore.png";

    this.entities["Furnace"] = new EntityType("Furnace");
    this.entities["Furnace"].interaction = this.actions["Smelt Iron"];
    this.entities["Furnace"].enterable = false;
    this.entities["Furnace"].image = "img/furnace.png";
  
    this.entities["Portal"] = new EntityType("Portal");
    this.entities["Portal"].interaction = this.actions["Portal"];
    this.entities["Portal"].enterable = false;
    this.entities["Portal"].image = "img/portal.png";
  }

  this.LoadSkills = function(){
    this.skills = new Array();
    this.skills["Mining"] = new SkillType("Mining");
    
    this.skills["Smithing"] = new SkillType("Smithing");
  }
  
  this.LoadTileTypes();
  LoadActions(this);
  this.LoadEntities();
  LoadItems(this);
  this.LoadSkills();
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
  this.skills = new Array();
  for(skillType in gameData.skills){
    this.skills[skillType] = new Skill(gameData.skills[skillType]);
  }

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

let SkillType = function(name){
  this.name = name;
  this.difficulty = 1;

  this.levelReqs = [0, 100, 240, 400, 750, 1370, 2500, 4500, 8000, 15000];
}

let Skill = function(type){
  this.type = type;
  this.xp = 0;

  this.GetLevel = function(){
    for(let i = 0; i < type.levelReqs.length; i++){
      if(this.type.levelReqs[i] > this.xp * this.type.difficulty){
        return i;
      }
    }
    return this.type.levelReqs.length;
  }

  this.AddXP = function(amount){
    this.xp += amount;
  }
}

function GetParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}