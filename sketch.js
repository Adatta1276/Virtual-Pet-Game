var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;
var feedTheDog;
var lastEatHour;
var lastEatMinute;
var lastEatSecond;




//create feed and lastFed variable here
//if there are problems then remove script src gstatic urls from index

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

feedTheDog = createButton("Feed the dog");
feedTheDog.position(700,95);
feedTheDog.mousePressed(feedDog);

lastEatHour = hour();
lastEatMinute = minute();
lastEatSecond = second();

}

function draw() {
  background(46,139,87);
  foodObj.display();

  

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here


  if(lastEatHour > 12) {
    fill("blue");
    textSize(25);
    text("Last Fed -> "+(lastEatHour-12)+" : "+lastEatMinute+" : "+lastEatSecond+" PM",35,110);
  }

  else if(lastEatHour === 12) {
    fill("blue");
    textSize(25);
    text("Last Fed -> "+12+ " : " + lastEatMinute+ " : "+ lastEatSecond +" PM",35,110); 
  }

  else if((lastEatHour < 12) && (lastEatHour !== 0)) {
    fill("blue");
    textSize(25);
    text("Last Fed -> "+lastEatHour+ " : "+ lastEatMinute+" : " +lastEatSecond +" AM",35,110);
  }

  else if(lastEatHour <= 0) {
    fill("blue");
    textSize(25);
    text("Last Fed -> "+12+" : "+lastEatMinute+" : "+lastEatSecond+" AM",35,110);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  if(foodS !== 0) {
    foodS--;
    
  }

  else if(foodS <= 1) {
    dog.addImage(sadDog);
  }

  database.ref('/').update({
    Food:foodS 
  })
  

   



database.ref('/').update({
  timer:lastEatHour
})

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
