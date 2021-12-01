import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RoomState } from "../reducers/index2";

import * as fromRooms from '../reducers/index2';

export const selectRoomsState =
              createFeatureSelector<RoomState>("rooms");

export const selectAllRooms = createSelector(
  selectRoomsState,
  fromRooms.selectAll
);

export const areRoomsLoaded = createSelector(
  selectRoomsState,
  selectAllRooms,
  state => state.allChatsLoaded
);



