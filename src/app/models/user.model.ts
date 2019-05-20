import { Box } from '../models/box.model';
export class User {
    user: boolean;
    constructor(public email: string, public password: string, public nom: string, public boxs?: Box[]) {
        this.user = true;
    }
}
