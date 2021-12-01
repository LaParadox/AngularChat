import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ChatState } from '../reducers';

import * as fromChat from '../reducers/index'

export const selectChatState =
             createFeatureSelector<ChatState>("chat");

export const selectAllMessages = createSelector(
  selectChatState,
  fromChat.selectIds,
  fromChat.selectAll
);

export const areMessagesLoaded = createSelector(
  selectChatState,
  state => state.allMessagesLoaded
);


