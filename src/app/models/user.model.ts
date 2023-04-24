export class User{
    constructor(
        private eamil:string,
        private token:string,
        private localId:string,
        private expirationDate:Date,
        private firstName:string,
        private lastName:string,
        private phone:string,
        ){

    }
    get expireDate(){
        return this.expirationDate;
    }
    get userToken(){
        return this.token;
    }
}
