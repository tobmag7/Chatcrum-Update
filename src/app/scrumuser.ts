export class Scrumuser {
    constructor(
        public fullname: string,
        public email: string,
        public password: string,
        public projname: string,
        public type: string,
        public usertype: boolean
        
        
    
    ) {}
        
}

export class Scrumlogin {
    constructor(
        public email: string,
        public password: string,
        public projname: string
    ) {}
}
