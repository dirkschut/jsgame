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
    this.worldMaps["enter"].AddPortal(7, 9, "south", 5, 0);
  
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
  
    this.worldMaps["south"] = new WorldMap();
    this.worldMaps["south"].GenerateFromArray([
      ['w', 'w', 'w', 'w', 'w', 'd', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g', 'd', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'd', 'd', 'd', 'g', 'g', 'd', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'd', 'd', 'd', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ],[
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'i', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'f', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]);
    this.worldMaps["south"].AddPortal(5, 0, "enter", 7, 9);
  
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
            case 'i':
              tile.entity = new Entity(gameData.entities["Iron Ore"], tile);
              break;
            case 'f':
              tile.entity = new Entity(gameData.entities["Furnace"], tile);
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
      let tableWidth = Math.min(10, this.width);
      let tableHeight = Math.min(10, this.height);
      let map = "<div class='row'><div class='col-md-4'><table id='map'>";
      for(y = game.character.y - tableHeight / 2; y < game.character.y + tableHeight / 2; y++){
        map += "<tr>";
        for(x = game.character.x - tableWidth / 2; x < game.character.x + tableWidth / 2; x++){
          let extra = "";
          
          let empty = false;
          if(y < 0 || x < 0 || y >= this.height || x >= this.height){
            empty = true;
          }
  
          if(!empty){
            if(this.tiles[y][x].entity != null){
              extra += "<img class='entity' src='" + this.tiles[y][x].entity.type.image + "' />";
            }
    
            if(x == game.character.x && y == game.character.y){
              extra += "<div class='character'>C</div>";
            }
          }
  
          let name = "";
          let color = "#000000";
          let image = "";
          if(!empty){
            name = this.tiles[y][x].type.name;
            color = this.tiles[y][x].type.color;
            image = this.tiles[y][x].type.image;
          }
  
          map += "<td class='MapTile MapTile_" + name + "' style='background-color:" + color + "; background-image: url(\"" + image + "\")'>" + extra + "</td>";
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