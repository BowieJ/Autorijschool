import { Injectable } from '@angular/core';
import {VOERTUIG, Voertuigen} from "./voertuigen";


@Injectable({
  providedIn: 'root'
})
export class VoertuigService {
  voertuigen: Voertuigen[] = VOERTUIG;

  constructor() { }

  getVoertuigen(): Voertuigen[] {
    return this.voertuigen;
  }
}
