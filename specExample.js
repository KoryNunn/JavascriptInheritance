
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
function ViewItem(definition){
    var definitionClone = Object.create(definition || {});
    
    for(var key in definitionClone){
        this[key] = definitionClone[key];
    }
    
    // Ensuring the existance of a property
    this.actions = this.actions || {};
}
ViewItem = CreateSpec(ViewItem);


// Inherits from ViewItem
function View(){
}
View = CreateSpec(View, ViewItem);
View.prototype.render = function(){
    this.renderedElement = 'rendered';
}


// Inherits from ViewItem
function Action(){
}
Action = CreateSpec(Action, ViewItem);


// Inherits from View
function Textbox(){
    this.type = 'textbox';    
    // Setting default values on a property that is assumed to exist due to super specs constructor.
    this.actions.change = [];
}
Textbox = CreateSpec(Textbox, View);
// Override the render method, also calls super's render.
Textbox.prototype.render = function(){
    this.constructor.__super__.prototype.render.apply(this, arguments);
    this.renderedElement += ' a textbox';
}

// Inherits from Action
function Store(){
    this.type = 'textbox';
}
Store = CreateSpec(Store, Action);

var store = new Store({
    majiggers:'whatsits'
});

var textbox = new Textbox({
    stuff: 'things'
});

//Using an instantiated property
textbox.actions.change.push(store);

textbox.render();

console.log(textbox.renderedElement);
console.log('textbox instance of ViewItem? ' + (textbox instanceof ViewItem));
console.log('textbox instance of View? ' + (textbox instanceof View));
console.log('textbox instance of Textbox? ' + (textbox instanceof Textbox));
console.log('textbox instance of Action? ' + (textbox instanceof Action));