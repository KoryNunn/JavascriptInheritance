
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

function CreateSpec(child, parent){
    parent = parent || Object;
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
    child.__super__ = parent;
    // Yes, This is 'bad'. However, it runs once per Spec creation.
    var spec = new Function("child", "return function " + child.name + "(){child.__super__.apply(this, arguments);return child.apply(this, arguments);}")(child);
    spec.prototype = child.prototype;
    return spec;
}



//Base
function Shape(){
    // Proves constructor is running as expected with the correct context
    // ***Not required***.
    console.log(this.constructor.name, this.constructor.__super__.name);
}
Shape = CreateSpec(Shape);


//Inherits from Shape
function Square(){
    console.log('square things');
    this.majigger = 'bam';
}
Square = CreateSpec(Square, Shape);


//Inherits from Square
function RoundedSquare(){
    console.log('round thoes corners');
    console.log(this.majigger);
}
RoundedSquare = CreateSpec(RoundedSquare, Square);




// Proof
// **following for demonstation purposes only**

var roundedSquare = new RoundedSquare();

console.log(
    roundedSquare instanceof RoundedSquare &&
    roundedSquare instanceof Square &&
    roundedSquare instanceof Shape
);