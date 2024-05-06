/*
Los efectos tienen un "texto" de tarjeta y apuntan a la estadística de una unidad o la reducen en magnitud.
Tienen que ser "jugados" con una unidad para apuntar.

Este juego de cartas coleccionables se basa en la interacción entre dos tipos de cartas: Unidades y Efectos.

Unidades: Estas cartas se juegan para obtener el control del tablero y lucharán contra las unidades jugadas por el oponente. Cada unidad tiene atributos como poder y resistencia que determinan su capacidad para atacar y defender.
Efectos: Estas cartas se utilizan para afectar a las unidades en el tablero. Requieren que una unidad sea seleccionada como objetivo para poder ser jugadas. Los efectos pueden aumentar o disminuir el poder o la resistencia de la unidad objetivo.
El método play(target) se encarga de jugar una carta, ya sea una unidad o un efecto. Antes de aplicar el efecto de la carta, se verifica si el objetivo es una instancia de la clase Unit utilizando instanceof. Esto es importante porque los efectos solo pueden afectar a unidades, no a otras cartas como efectos.

Aquí está cómo funcionaría:

javascript
Copy code
play(target) {
    if (target instanceof Unit) {
        // Implementa el efecto de la carta aquí
    } else {
        throw new Error("¡El objetivo debe ser una unidad!");
    }
}
Entonces, cuando un jugador intenta jugar una carta y selecciona un objetivo, se verifica si el objetivo es una unidad. Si es así, se aplica el efecto de la carta. Si no es una unidad, se lanza un error para alertar al jugador o al programador de que la acción no puede continuar porque el objetivo no es válido.



*/
class Card {
    constructor(name,cost){
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card {
    constructor(name,cost, power, res){
        super(name,cost);
        this.power = power;
        this.res = res;
    }
    attack(target){
        if(target instanceof Unit){
            target.resilience -= this.power;
            console.log(`${this.name} ataca a ${target.name}.`);
        }else {
            throw new Error("Target must be a unit!");
        }
    }
    
}

class Effect extends Card{
    constructor(name,cost,text,stat,magnitude){
        super(name,cost);
        this.text = text;
        this.stat = stat;
        this.magnitude = magnitude;
    }
    play( target ){
        if( target instanceof Unit ) {
                if(this.stat === "Resiliencia"){
                target.res += this.magnitude;
                console.log(`${this.name} aumenta la resistencia de ${target.name} en ${this.magnitude}`)
                }else if(this.stat === "Power"){
                    target.power += this.magnitude;
                    console.log(`${this.name} aumenta el poder de ${target.name} en ${this.magnitude}`)
                }
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }
    
}
const redBeltNinja = new Unit("Ninja Cinturón Rojo", 3, 3, 4);
const blackBeltNinja = new Unit("Ninja Cinturón Negro", 4, 5, 4);

const hardAlgorithm = new Effect("Algoritmo Difícil", 2, "aumentar la resistencia del objetivo en 3", "Resiliencia", 3);
const unhandledPromiseRejection = new Effect("Rechazo de promesa no manejado", 1, "reducir la resistencia del objetivo en 2", "Resiliencia", -2);
const pairProgramming = new Effect("Programación en pareja", 3, "aumentar el poder del objetivo en 2", "Power", 2);

console.log("Turno 1:");
hardAlgorithm.play(redBeltNinja);
console.log("Turno 2:");
unhandledPromiseRejection.play(blackBeltNinja);
console.log("Turno 3:");
pairProgramming.play(redBeltNinja);
redBeltNinja.attack(blackBeltNinja);
