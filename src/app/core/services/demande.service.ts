import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../constants/env';
import type {
  Demande,
  DemandeListResponse,
  CreateDemandeRequest,
  UpdateDemandeStatusRequest,
} from '../interfaces/demande.interface';

@Injectable({ providedIn: 'root' })
export class DemandeService {
  constructor(private http: HttpClient) {}

  list(): Observable<DemandeListResponse> {
    return this.http.get<DemandeListResponse>(`${environment.apiUrl}/demandes`);
  }

  create(data: CreateDemandeRequest): Observable<{ message: string; demande: Demande }> {
    return this.http.post<{ message: string; demande: Demande }>(
      `${environment.apiUrl}/demandes`,
      data
    );
  }

  updateStatus(id: string, data: UpdateDemandeStatusRequest): Observable<{ message: string; demande: Demande }> {
    return this.http.patch<{ message: string; demande: Demande }>(
      `${environment.apiUrl}/demandes/${id}/status`,
      data
    );
  }
}
