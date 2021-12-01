export interface ChatMessage {
  roomId?: string | number;
  email?: string;
  displayName?: string;
  photoURL?: string;
  content?: string;
  uid?: string | number;
  createdAt: number;
}
