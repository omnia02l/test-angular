import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DemandeService, getApiErrorMessage } from '@app/core';
import type { Demande } from '@app/core';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css'],
})
export class DemandeListComponent implements OnInit {
  demandes: Demande[] = [];
  loading = true;
  error = '';
  updatingStatusId: string | null = null;

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.demandeService.list().subscribe({
      next: (res) => {
        this.demandes = res.demandes;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = getApiErrorMessage(err, 'Erreur lors du chargement.');
      },
    });
  }

  onStatutChange(demande: Demande, newStatut: 'new' | 'approved'): void {
    if (demande.statut === newStatut) return;
    this.error = '';
    this.updatingStatusId = demande._id;
    this.demandeService.updateStatus(demande._id, { statut: newStatut }).subscribe({
      next: (res) => {
        const idx = this.demandes.findIndex((d) => d._id === demande._id);
        if (idx >= 0) this.demandes[idx] = res.demande;
        this.updatingStatusId = null;
      },
      error: (err) => {
        this.error = getApiErrorMessage(err, 'Erreur lors de la mise à jour.');
        this.updatingStatusId = null;
      },
    });
  }
}
