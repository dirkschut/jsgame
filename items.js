let LoadItems = function(gameData){
  gameData.items = new Array();

  gameData.items["Copper Coin"] = new ItemType("Copper Coin");
  gameData.items["Copper Coin"].stackSize = 10000;
  gameData.items["Copper Coin"].image = "img/items/coppercoin.png";
  
  gameData.items["Silver Coin"] = new ItemType("Silver Coin");
  gameData.items["Silver Coin"].stackSize = 10000;
  gameData.items["Silver Coin"].image = "img/items/silvercoin.png";

  gameData.items["Gold Coin"] = new ItemType("Gold Coin");
  gameData.items["Gold Coin"].stackSize = 10000;
  gameData.items["Gold Coin"].image = "img/items/goldcoin.png";

  gameData.items["Iron Ore"] = new ItemType("Iron Ore");
  gameData.items["Iron Ore"].stackSize = 100;
  gameData.items["Iron Ore"].image = "img/items/ironore.png";

  gameData.items["Iron Ingot"] = new ItemType("Iron Ingot");
  gameData.items["Iron Ingot"].stackSize = 100;
  gameData.items["Iron Ingot"].image = "img/items/ironingot.png";
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
    if(item.amount == 0){
      return;
    }
    
    for(let i = 0; i < this.items.length; i++){
      if(this.items[i].itemType == item.itemType){
        if(this.items[i].amount < this.items[i].itemType.stackSize){
          this.items[i].amount += item.amount;
          item.amount = 0;
          if(this.items[i].amount > this.items[i].itemType.stackSize){
            item.amount = this.items[i].amount - this.items[i].itemType.stackSize;
            this.items[i].amount = this.items[i].itemType.stackSize;
            this.AddItem(item);
            return;
          }
        }
      }
    }

    if(item.amount == 0){
      return;
    }
    
    if(this.items.length < this.numCells){
      let tempItem = new Item(item.itemType, item.amount);
      item.amount = 0;
      if(tempItem.amount > tempItem.itemType.stackSize){
        tempItem.amount = tempItem.itemType.stackSize;
        item.amount -= item.itemType.stackSize;
      }
      this.items.push(tempItem);
      if(item.amount > 0){
        this.AddItem(item);
      } 
    }
  }

  this.RemoveItem = function(item){
    for(let i = 0; i < this.items.length; i++){
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

  this.Clear = function(){
    this.items = new Array();
    game.Save();
  }

  this.Draw = function(){
    var map = "";

    map += "<div class='col-md-2'>";
    map += "<h2>Inv</h2>";
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
    map += "<div id='clearinv' onclick='game.character.inventory.Clear(); game.DoTurn();'>Clear</div>";
    map += "</div>";

    return map;
  }
}