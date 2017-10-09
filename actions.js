let LoadActions = function(gameData){
  gameData.actions = new Array();

  gameData.actions["Mine Iron"] = function(entity){
    game.character.inventory.AddItem(new Item(gameData.items["Iron Ore"], 1));
    game.character.skills["Mining"].AddXP(5);
  }

  gameData.actions["Smelt Iron"] = function(entity){
    if(game.character.inventory.RemoveItem(new Item(gameData.items["Iron Ore"], 1))){
      game.character.inventory.AddItem(new Item(gameData.items["Iron Ingot"], 1));
      game.character.skills["Smithing"].AddXP(5);
    }
  }

  gameData.actions["Gold Coin"] = function(entity){
    game.character.inventory.AddItem(new Item(gameData.items["Gold Coin"], 1));
    entity.Destroy();
  }

  gameData.actions["Silver Coin"] = function(entity){
    game.character.inventory.AddItem(new Item(gameData.items["Silver Coin"], 1));
    entity.Destroy();
  }

  gameData.actions["Copper Coin"]= function(entity){
    game.character.inventory.AddItem(new Item(gameData.items["Copper Coin"], 1));
    entity.Destroy();
  }

  gameData.actions["Portal"] = function(entity){
    game.character.x = entity.newX;
    game.character.y = entity.newY;
    game.world.currentMap = entity.newMap;
  }
}