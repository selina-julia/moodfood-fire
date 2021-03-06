import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { FirebaseError } from "firebase/app";
import { BehaviorSubject, filter, map, Observable, switchMap } from "rxjs";
import { User } from "../../models/user";
import firebase from "firebase/compat/app";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    public user$ = new BehaviorSubject<User | undefined>(undefined);

    private readonly errors: any[] = [
        {
            code: "auth/invalid-email",
            message:
                "Der Benutzer wurde nicht gefunden. Bitte überprüfen Sie ob die E-Mail Adresse gültig ist."
        },
        {
            code: "auth/user-not-found",
            message:
                "Der Benutzer wurde nicht gefunden. Bitte überprüfen Sie ob die E-Mail Adresse gültig ist."
        },
        {
            code: "auth/wrong-password",
            message:
                'Das Passwort ist inkorrekt. Wenn Sie Ihr Passwort vergessen haben, nutzen Sie die "Passwort vergessen" Funktion.'
        }
    ];

    constructor(
        private auth: AngularFireAuth,
        private angularFirestore: AngularFirestore,
        private router: Router,
        private zone: NgZone
    ) {}

    public async login(email: string, password: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            let userCredential = undefined;
            try {
                userCredential = await this.auth.signInWithEmailAndPassword(
                    email,
                    password
                );
            } catch (e) {
                if (e instanceof FirebaseError) {
                    const message = this.getFirebaseErrorMessage(e.code);
                    console.log(email, password, "login not successful");

                    if (message) {
                        reject(message);
                    }
                    reject("Fehlercode: 743");
                }
                reject("Fehlercode: 744");
                return;
            }

            console.log(email, password, "login successful");

            resolve();
            this.router.navigate(["recipes"]);
        });
    }

    public async signUp(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        favoriteRecipes: string[]
    ) {
        return this.auth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
                this.setUserData(result, firstName, lastName, favoriteRecipes);
                this.login(email, password);
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    public async setUserData(
        user: any,
        firstName: string,
        lastName: string,
        favoriteRecipes: string[]
    ) {
        if (!user) {
            return;
        }
        this.angularFirestore
            .collection("users")
            .doc(user.user?.uid)
            .set({
                email: user.user?.email,
                loginProvider: "Email",
                firstName: firstName,
                lastName: lastName,
                favoriteRecipes: favoriteRecipes
            })
            .then(() => {
                console.log("successful");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    public fetchUser(): void {
        this.auth.user
            .pipe(
                switchMap((authUser: firebase.User | null) =>
                    this.angularFirestore
                        .collection<User>("users")
                        .doc(authUser?.uid)
                        .valueChanges({ idField: "uid" })
                )
            )
            .subscribe((user) => {
                this.user$.next(user);
            });
    }

    updateUserRecipes(userId: string | undefined, payload: User) {
        return this.angularFirestore.doc("users/" + userId).update(payload);
    }

    getUserById(userId: string | undefined) {
        return this.angularFirestore.doc("users/" + userId);
        // this.angularFirestore.collection('users').doc(userId).ref.get().then(function (doc) {
        //   if (doc.exists) {
        //     console.log(doc.data());
        //   } else {
        //     console.log("There is no document!");
        //   }
        // }).catch(function (error) {
        //   console.log("There was an error getting your document:", error);
        // });
    }

    // getUsers(): Observable<User[]> {
    //   return this.angularFirestore
    //     .collection('users')
    //     .snapshotChanges()
    //     .pipe(
    //       map((actions) => {
    //         return actions.map((a) => {
    //           const data = a.payload.doc.data() as User;
    //           const uid = a.payload.doc.id;
    //           return { uid, ...data };
    //         });
    //       })
    //     );
    // }

    private getFirebaseErrorMessage(code: string): string | undefined {
        const foundError = this.errors.find((error) => {
            return code === error.code;
        });

        return foundError ? foundError.message : undefined;
    }

    get user(): BehaviorSubject<User | undefined> {
        return this.user;
    }

    public async logout(): Promise<void> {
        await this.auth.signOut();
        this.user$.next(undefined);
        console.log(this.user$.getValue());
        this.router.navigate(["auth"]);
    }
}
