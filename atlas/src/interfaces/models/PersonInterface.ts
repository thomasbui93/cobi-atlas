export enum Gender {
    M = 'MALE',
    F = 'FEMALE'
}

export interface PersonInterface {
    firstName: String;
    lastName: String;
    maidenName: String;
    dateOfBirth: Date;
    placeOfBirth: String;
    gender: Gender;
    spouse?: PersonInterface;
    children?: Array<PersonInterface>;
    isPublished: Boolean;
}