export interface Voertuigen {
    id: number;
    merk: string;
    type: string;
    kenteken: string;
    photo: string;
}

export const VOERTUIG: Voertuigen[] = [
    {
        id: 1,
        merk: 'BMW',
        type: 'Diesel',
        kenteken: '12-AB-34',
        photo: `unknown`,
    },
    {
        id: 2,
        merk: 'BMW',
        type: 'Elektrisch',
        kenteken: '34-BC-56',
        photo: `unknown`,
    },
    {
        id: 3,
        merk: 'BMW',
        type: 'Elektrisch',
        kenteken: '56-CD-78',
        photo: `unknown`,
    }
];
