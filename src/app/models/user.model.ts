export class User {
    user: boolean;
    constructor(public email: string, public password: string, public nom: string) {
        this.user = true;
    }
}
