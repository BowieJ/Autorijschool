export interface Voertuigen {
  id: number;
  merk: string;
  soort: string;
  kenteken: string;
  fotoUrl?: string;
  status: string;
}

export const VOERTUIG: Voertuigen[] = [
  {
    id: 1,
    merk: 'BMW',
    soort: 'Diesel',
    kenteken: '12-AB-34',
    fotoUrl: 'assets/glossy-blue-bmw-iphone-x-lbtd62aa66fg7aga.jpg', // Correct path
    status: 'Beschikbaar'
  },
  {
    id: 2,
    merk: 'BMW',
    soort: 'Elektrisch',
    kenteken: '34-BC-56',
    fotoUrl: 'assets/bawp-43-media-hd.jpg', // Correct path
    status: 'Beschikbaar'
  },
  {
    id: 3,
    merk: 'BMW',
    soort: 'Elektrisch',
    kenteken: '56-CD-78',
    fotoUrl: 'assets/martin-katler-94lAQc7ipNg-unsplash.jpg', // Correct path
    status: 'Beschikbaar'
  }
];
