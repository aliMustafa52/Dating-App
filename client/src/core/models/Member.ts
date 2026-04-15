export interface Member {
  id: string;
  birthDate: string;
  imageUrl?: string | null;
  displayName: string;
  createdOn: string;
  lastActive: string;
  gender: string;
  description?: string | null;
  city: string;
  country: string;
  photos: Photo[];
}

export interface UpdateMember {
  displayName: string;
  description?: string | null;
  city: string;
  country: string;
}

export interface Photo {
  id: number;
  url?: string | null;
  isMain: boolean;
}
