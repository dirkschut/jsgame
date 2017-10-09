let News = function(){
  this.items = new Array();

  this.Draw = function(){
    let drawing = "";

    let first = true;

    console.log(this.items);

    for(let i = 0; i < this.items.length; i++){
      let item = this.items[i];
      if(first){
        drawing += "<div class='jumbotron'><div class='container'>";
        drawing += "<h1 class='display-3'>" + item.title + "</h1>";
        drawing += "<p><b>" + item.date + "</b> " + item.text;
        drawing += "</div></div>";
        first = false;
      }else{
        drawing += "<div class='container'><div class='row'>";
        drawing += "<h2>" + item.title + "</h2>";
        drawing += "<p><b>" + item.date + "</b> " + item.text;
        drawing += "</div></div>";
      }
    }

    document.getElementById("appendable").innerHTML = drawing;
  }

  this.LoadNews = function(){
    this.items.push(new NewsItem("9-Oct-2017", "New News", "Today I have moved the news items from their old home in a HTML document to a Javascript file. This has allowed me to make posting news items much easier and enabled me to work with only one HTML file.</p><p>Next I want to work on fixing the overlapping items when the width of the screen gets too small. Hopefully that's an easy fix. After that I'll start working on splitting the drawing calls from the world object to their appropriate objects (inventory drawing in inventory etc.)</p><p>That's it. Ta.</p>"));
    this.items.push(new NewsItem("29-Sep-2017", "Skills", "Today I have added a very basic skill system to the game. Like the rest of the content it is all still very much a skeleton of what it should be in a full game, but that's not what I'm planning on making...</p><p>Current features include gaining mining xp from mining ore and getting smithing xp from smelting the ore into ingots.</p><p>Next on the agenda is probably making a clear inventory feature or something... And squishing a bug where the inventory get's messed up when I change the stacksize of an item...</p><p>That's it. Ta.</p>"));
    this.items.push(new NewsItem("11-Sep-2017", "Bigger Maps", "Today is a glorius day in the world of JSGame, for the world has expanded! Indeed, it has gone from 200 tiles to 600 tiles. This massive increase is due to the scrolling of maps which I haev implemented which allows for bigger maps. Currently the biggest map is 20 by 20 tiles, though it's still mostly empty.</p><p>Next on the agenda is some very basic interaction with the world to get something like iron ore and another interaction to turn it into iron bars. This will probably require a couple of entities, but I'll cope.</p><p>That's it. Ta.</p>"));
    this.items.push(new NewsItem("10-Sep-2017", "Hello, world!", "Hello, world! This is the first news update for this game thingy that I'm putting together because I have to keep my programming skills sharp. I'm not intending to show this thing to too many people but just keep it for myself. I'm also not planning to do too much with it except work on it every now and then to keep programming.</p><p>That said, if you have somehow found this page and you have any suggestion you are welcome to send them to me. The github issue system is great for that. Also, feel free to fork this repo and do what you want with it. Just no earning money of it or getting donations because of it. And if you do fork it give me sufficient credit and let me use the stuff you do with it without limits for free.</p><p>That's it. Ta.</p>"));
  }

  this.LoadNews();
}

let NewsItem = function(date, title, text){
  this.date = date;
  this.title = title;
  this.text = text;
}