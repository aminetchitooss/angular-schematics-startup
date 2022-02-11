export interface User_Model {
  FIRSTNAME: string;
  ID: number;
  LASTNAME: string;
  PHOTO: string;
  UPN: string;
  ISMANAGER: boolean;
  INTERN: boolean;
  SITE_NAME: string;
  IDLASTGROUPE: number | null;
  ROLES: Role[];
  error?: any;
}

export interface Role {
  id: number;
  code: string;
}
