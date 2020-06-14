export class Status {
    reim_status: string;


    static from(obj: StatusRow): Status {
        const status = new Status(
            obj.reim_status
        );
        return status;
    }

    constructor(reim_status: string) {
        this.reim_status = reim_status;
        

    }
}

export interface StatusRow{
    reim_status: string;
    
}