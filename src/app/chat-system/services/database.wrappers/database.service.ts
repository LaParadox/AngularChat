import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentReference
} from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class DatabaseService {
  constructor(private afs: AngularFirestore) {}

  add<T>(collectionName: string, data: T): Promise<DocumentReference<T>> {
    return this.afs.collection<T>(collectionName).add(data);
  }

  getSnapshotChanges<T>(
    collectionName: string
    // queryFn: QueryFn
  ): Observable<T[] | { uid?: string | number; createdAt: number; room?: string; id: string | number; }[]> {
    return this.afs.collection<T>(collectionName, (ref) => ref.orderBy('createdAt'))
           .snapshotChanges()
           .pipe(
            map((actions) => {
              return actions.map((i) => {
                const id = i.payload.doc.id;
                const roomsData = i.payload.doc.data() as T;
                return { id, ...roomsData };
              });
            }),
            catchError((error) => {
              console.log(`error occured`, error);
              throw error;
            })
           );
  }
}
