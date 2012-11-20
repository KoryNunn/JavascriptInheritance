
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

    // A person constructor. Makes a person
    function Person(firstName, lastName, dateOfBirth){
        // This proves the right 'this' is being used
        console.log('a new ' + this.constructor.name + ' exists');
        
        // Set some stuff on the instance
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
    }
    // This could also just be {}, but hey we're working with constructors right...
    Person.prototype = Object.create(Object.prototype);
    // This will make more sense in the Developer bit.. just keep reading.
    Person.prototype.constructor = Person;
    // Add some usefull functionality to people, like getting their age.
    Person.prototype.getAge = function(){
        return dateOfBirth ? Math.floor((new Date() - this.dateOfBirth) / 1000 / 60/60/24/365) : null;
    };
    
    // A developer constructor
    function Developer(){
        // make 'this' a person. Pass arguments. This will allow for
        // 'new Developer(firstName, lastName, dateOfBirth)'
        // See? Inheritance muthafuka!
        Person.apply(this, arguments);
        
        //Devs are more than just people, devs have skillz
        this.skillset = [];
    }
    // A dev is just a better version of a person, so copy the Person prototype
    // and use it as the Developer prototype. This sets up the whole 'instanceof' stuff too
    // which can be used in really cool ways.
    Developer.prototype = Object.create(Person.prototype);
    // Because we just coppied the Person prototype, Developer.prototype.constructor
    // will be Person. Not cool, when we want to get the constructor of a dev instance,
    // we want the Developer constructor.
    Developer.prototype.constructor = Developer;
    // Devs are good at lerning more skillz, so here is a usefull bit of functionality for them.
    Developer.prototype.addSkills = function(){
        for(var i = 0; i < arguments.length; i++){
            this.skillset.push(arguments[i]);
        }
    };
    
    // JS Devs are obviously the best devs...
    function JSNinja(){
        // make 'this' inherit from a Developer
        // Again passing through all the arguments.
        Developer.apply(this, arguments);
        
        // add some JSNinja specific stuff
        this.skillLevel = 0;
        
        // All JSNinjas know JavaScript...
        this.addSkills('JavaScript');
        
        // Notify the world that a new JSNinja has awoken..
        console.log(this.firstName + ' ' + this.lastName + ' now walks among us...');
    }
    // Inherit from Developer...
    JSNinja.prototype = Object.create(Developer.prototype);
    // Set up constructor...
    JSNinja.prototype.constructor = JSNinja;
    // JS Devs are extra good at lerning more skillz.. lets override it and make it do more.
    JSNinja.prototype.addSkills = function(){
        var args = Array.prototype.slice.call(arguments);
    
        this.skillLevel++;
    
        Developer.prototype.addSkills.apply(this, arguments); 
        
        console.log(this.firstName + ' learnt ' + args.join(' and ') + ' and is now a level ' + this.skillLevel + ' ' + this.constructor.name);
    };
    
    // Make a ninja...
    window.ninja = new JSNinja('bob','down', new Date(1988,1,1));
    window.ninja.addSkills('prototypical inheritance');
    
    // What now?
    // Lets make a collection of people.
    
    var people = [];
    
    people.push(ninja);
    people.push(new Person('John', 'Doe'));
    people.push(new Person('Jane', 'Doe'));
    people.push(new Developer('Ben', 'Dover'));
    people.push({wtfAmI: 'IM A TREEHOUSE!'});
    people.push(new Developer('Ivana', 'Iheratealot'));
    people.push(123456789);
    people.push('your face');
    people.push(new JSNinja('awesome', 'anthat'));
    people.push({wtfAmI: 'IM A BANANA!'});
    
    // Cool, a nice mix of people... and a few other things
    // so what is the point of all this? could we not just use plain objects?
    // usually yes, infact, most of the time when non-js devs try and add inheritance to JS
    // they are just being noobs. However there are some really usefull things you can do with it.
    // For example, what if you just want to talk to JS developers?
    // Lets get a list of them.
    
    var jsNinjas = [];
    
    people.forEach(function(person){
        if(person instanceof JSNinja){
            jsNinjas.push(person);
        }
    });
    
    // Yay! We now know the smart people!
    
    // OK but what if you can bring yourself to talk to other devs too?
    
    
    var developers = [];
    
    people.forEach(function(person){    
        // because JSNinja inherits from Developer, they will be included in this list.
        if(person instanceof Developer){
            developers.push(person);
        }
    });
    
    //cool, got the devs.
    // OK, there seems to be non-people in this list of people
    // Lets get rid of them..
    
    console.log('there are ' + people.length + ' things claiming to be people');
    
    var notPeople = [],
        actuallyPeople = [];
    
    people.forEach(function(person, index){
        // intanceof works on anything.
        // This means we can safely filter out all the crap we don't want, reguardless of it's type,
        // which means we can safely opperate on what's left.
        if(person instanceof Person){
            actuallyPeople.push(person);
        }else{        
            notPeople.push(person);
        }
    });
    
    console.log('there are actually ' + actuallyPeople.length + ' people');
    
    // Because we know that all people really are 'Person's, we can do stuff
    // that you can do to people..
    
    actuallyPeople.forEach(function(person){
        var greeting = 'Hi I\'m ' + person.firstName;
        
        // And if you know they are a dev..
        if(person instanceof Developer){
            // you know they have a skillset, so you can directly check it's length
            greeting += ' and I know ' + (person.skillset.length && person.skillset.join(' and ') || 'dev stuff');
        }else{
            greeting += ' and I have no skills';
        }
        
        // Say we want to just do stuff to developers, not JSNinjas
        if(person.constructor === Developer){
            greeting += ', I\'m just a generic dev.';
        }
        
        console.log(greeting);
    });