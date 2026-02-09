import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DemandeService, getApiErrorMessage } from '@app/core';

@Component({
  selector: 'app-demande-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './demande-create.component.html',
  styleUrls: ['./demande-create.component.css'],
})
export class DemandeCreateComponent {
  // Variables d'état (affichage)
  saving = false; // true quand on envoie la requête (pour afficher un loader)
  error = ''; // message d'erreur à afficher si ça plante

  // Création du formulaire réactif
  form = this.fb.nonNullable.group({
    titre: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.maxLength(5000)]],
  });

  //Injection des services/dépendances via le constructor
  constructor(
    private router: Router,
    private demandeService: DemandeService,
    private fb: FormBuilder
  ) {}

  getTitreError(): string {
    const ctrl = this.form.get('titre');
    if (!ctrl?.errors) return '';
    if (ctrl.errors['required']) return 'Le titre est obligatoire.';
    if (ctrl.errors['maxlength']) return 'Le titre ne peut dépasser 255 caractères.';
    return '';
  }
  //quand on clique sur "Créer"
  onSubmit(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    //valeurs nettoyées
    const value = this.form.getRawValue();
    const data = {
      titre: value.titre.trim(),
      description: value.description?.trim() || undefined,
    };
    this.saving = true;
    this.demandeService.create(data).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/demandes']);
      },
      error: (err) => {
        this.saving = false;
        this.error = getApiErrorMessage(err, 'Erreur lors de la création.');
      },
    });
  }
}
