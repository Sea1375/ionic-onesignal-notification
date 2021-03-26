
var game
var wheel;
var canSpin
var slices = 8
var slicePrizes = ["50 PUAN", "50 PUAN", "500 PUAN", "BAD LUCK!!!", "200 PUAN", "100 PUAN", "150 PUAN", "Yarın Tekrar Deneyin"]
var prize
var prizeText;

window.onload = function() {	
	game = new Phaser.Game(320, 388, Phaser.AUTO, "");
     game.state.add("PlayGame",playGame);
     game.state.start("PlayGame");
}
	
var playGame = function(game){};

playGame.prototype = {
     preload: function(){
          game.load.image("wheel", "assets/wheel.png");
		game.load.image("pin", "assets/pin.png");     
     },
  	create: function(){
  		game.stage.backgroundColor = "#fff";
  		wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
          wheel.anchor.set(0.5);
          var pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
          pin.anchor.set(0.5);
          prizeText = game.add.text(game.world.centerX, 360, "");
          prizeText.anchor.set(0.5);
          prizeText.align = "center";
          canSpin = true;
          game.input.onDown.add(this.spin, this);		
	},
     spin(){
          if(canSpin){  
               prizeText.text = "";
               var rounds = game.rnd.between(2, 10);
               var degrees = game.rnd.between(0, 360);
               prize = slices - 1 - Math.floor(degrees / (360 / slices));
               canSpin = false;
               var spinTween = game.add.tween(wheel).to({
                    angle: 360 * rounds + degrees
               }, 3000, Phaser.Easing.Quadratic.Out, true);
               spinTween.onComplete.add(this.winPrize, this);
          }
     },
     winPrize(){
          canSpin = false;
          prizeText.text = slicePrizes[prize];
     }
}