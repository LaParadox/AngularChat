import { createSelector } from '@ngrx/store';
import { currentUser, userRoomId } from '../../auth/selectors/auth.selectors';
import { messageWasSent } from '../actions/chat.ations';
import { selectAllMessages } from './chat.selectors';

export const roomMessagesSelector = createSelector(
  selectAllMessages,
  userRoomId,
  (messages, roomId) => messages.filter(mess => mess.roomId === roomId)
);

