export class User{
    constructor(
        private eamil:string,
        private token:string,
        private localId:string,
        private expirationDate:Date
        ){

    }
    get expireDate(){
        return this.expirationDate;
    }
}