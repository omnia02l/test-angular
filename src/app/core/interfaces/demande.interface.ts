export interface Demande {
  _id: string;
  titre: string;
  description?: string;
  statut: 'new' | 'approved';
  created_at?: string;
  updated_at?: string;
}

export interface DemandeListResponse {
  demandes: Demande[];
}

export interface CreateDemandeRequest {
  titre: string;
  description?: string;
}

export interface UpdateDemandeStatusRequest {
  statut: 'new' | 'approved';
}
