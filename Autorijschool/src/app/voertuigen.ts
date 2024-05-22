export interface Voertuigen {
    id: number;
    merk: string;
    soort: string;
    kenteken: string;
}

export const VOERTUIG: Voertuigen[] = [
    {
        id: 1,
        merk: 'BMW',
        soort: 'Diesel',
        kenteken: '12-AB-34'
    },
    {
        id: 2,
        merk: 'BMW',
        soort: 'Elektrisch',
        kenteken: '34-BC-56'
    },
    {
        id: 3,
        merk: 'BMW',
        soort: 'Elektrisch',
        kenteken: '56-CD-78'
    }
];
