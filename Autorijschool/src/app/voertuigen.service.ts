import { Injectable } from '@angular/core';
import { Voertuigen, VOERTUIG } from './voertuigen';

@Injectable({
  providedIn: 'root'
})
export class VoertuigService {
  private voertuigen: Voertuigen[] = VOERTUIG;

  getVoertuigen(): Voertuigen[] {
    return this.voertuigen;
  }

  getBeschikbareVoertuigen(): Voertuigen[] {
    return this.voertuigen.filter(v => v.status === 'Beschikbaar');
  }

  addVoertuig(voertuig: Voertuigen): void {
    this.voertuigen.push(voertuig);
  }

  updateVoertuig(voertuig: Voertuigen): void {
    const index = this.voertuigen.findIndex(v => v.id === voertuig.id);
    if (index !== -1) {
      this.voertuigen[index] = voertuig;
    }
  }

  deleteVoertuig(id: number): void {
    this.voertuigen = this.voertuigen.filter(v => v.id !== id);
  }
}
