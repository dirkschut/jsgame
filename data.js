let GameData = function(){
    this.LoadTiles = function(){
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
        this.items["Gold Coin"].stackSize = 5;
        this.items["Gold Coin"].image = "img/items/goldcoin.png";
    }

    this.LoadMaps = function(){
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
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'g', ' ', 'g', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'g', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'g', ' ', 'g', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
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
    }
    
    this.LoadTiles();
    this.LoadEntities();
    this.LoadItems();
    this.LoadMaps();
    console.log("Finished init gameData");
  }