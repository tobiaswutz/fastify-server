
// User erstellen einen Account
export interface createUserDTO {
  username: string;
  password: string;
}

// User loggt sich ein
export interface loginUserDTO {
  username: string;
  password: string;
}

// User stellt einem anderen User eine Freundschaftsanfrage
export interface createPendingFriendshipDTO {
  userId: string;
}

// User akzeptiert eine Freundschaftsanfrage
export interface acceptPendingFriendshipDTO {
  userId: string;
}

// User lehnt eine Freundschaftsanfrage ab
export interface declinePendingFriendshipDTO {
  userId: string;
}

// User entfernt einen Freund
export interface removeFriendshipDTO {
  userId: string;
}

// User erstellt einen Tresor (damit ist er automatisch Besitzer)
export interface createTresorDTO {
  name: string;
  secret: string;
  auto_unlock: boolean;
  locked_until: Date;
}

// User (Besitzer) ändert einen Tresor
export interface updateTresorDTO {
  name: string;
  secret: string;
  auto_unlock: boolean;
  locked_until: Date;
}

// User (Besitzer) löscht einen Tresor
export interface deleteTresorDTO {
  tresorId: string;
}

// User (Besitzer) gibt einem anderen User Zugriff auf einen Tresor
export interface createTresorPermissionDTO {
  tresorId: string;
  userId: string;
  is_owner: boolean;
  can_fill: boolean;
  can_see: boolean;
  can_open: boolean;
}








