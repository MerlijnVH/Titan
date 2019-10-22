import Entity from './Entity';

export default class Player extends Entity {
    constructor(name) {
        super(name, 'car');
    }

    getName() {
        return 'It is a car: ' + super.getName();
    }
}
