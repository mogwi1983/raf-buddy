import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const missingEnv = (name: string) =>
  new Error(
    `Missing environment variable: ${name}. Please update your environment configuration.`,
  );

const getFirebaseConfig = (): FirebaseConfig => {
  // Firebase web apps rely on client-visible env vars. Guard early so local setup fails fast.
  const config: Partial<FirebaseConfig> = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw missingEnv(`NEXT_PUBLIC_${key.toUpperCase()}`);
    }
  }

  return config as FirebaseConfig;
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export const getFirebaseApp = (): FirebaseApp => {
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(getFirebaseConfig());
  }

  return app;
};

export const getFirebaseAuth = (): Auth => {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }

  return auth;
};

export const getFirestoreDb = (): Firestore => {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }

  return db;
};

