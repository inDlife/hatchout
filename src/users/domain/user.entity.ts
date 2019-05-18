import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{

    constructor();
    constructor(address: string);
    constructor(address?: string) {
        //ddd validation은 앞쪽에 들어가야한다.
        if (typeof address === 'undefined' || address === null) {
            this.address = undefined;
        } else if (typeof address === 'string') {
            this.address = address;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    address: string;

    setAddress(address:string) {
        this.address = address;
    }
}

// create address, data, signature
// signature를 가지고 데이터를 풀어서 어드레스가 나오는 지
// valify할 때 시그니처 풀 때 validateService
