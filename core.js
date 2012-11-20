
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
// Object.create is in most browsers these days, this polyfills it to shit ones.
Object.create = Object.create || function (o) {
    if (arguments.length > 1) {
        throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F();
};




//Base
function Shape(){
    // Proves constructor is running as expected with the correct context
    // ***Not required***.
    console.log(this.constructor.name);
}
Shape.prototype = {};
Shape.prototype.constructor = Shape;


//Inherits from Shape
function Square(){
    // Runs parent constructor on 'this'
    Shape.apply(this, arguments);
}
Square.prototype = Object.create(Shape.prototype); // Inheritance
Square.prototype.constructor = Square; // new-ability


//Inherits from Square
function RoundedSquare(){
    // Runs parent constructor on 'this'
    Square.apply(this, arguments);
}
RoundedSquare.prototype = Object.create(Square.prototype);
RoundedSquare.prototype.constructor = RoundedSquare;




// Proof
// **following for demonstation purposes only**

var roundedSquare = new RoundedSquare();

console.log(
    roundedSquare instanceof RoundedSquare &&
    roundedSquare instanceof Square &&
    roundedSquare instanceof Shape
);

