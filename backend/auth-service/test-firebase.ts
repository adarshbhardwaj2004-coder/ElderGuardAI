
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

const projectId = process.env.FIREBASE_PROJECT_ID;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/['"]/g, '');
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

console.log('Project:', projectId);
console.log('Email:', clientEmail);
console.log('Key Len:', privateKey?.length);
console.log('Key Start:', privateKey?.substring(0, 50));

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            privateKey,
            clientEmail,
        }),
    });
    console.log('SUCCESS: Firebase initialized');
} catch (error: any) {
    console.error('FAILURE:', error.message);
    if (error.errorInfo) console.error('ErrorInfo:', error.errorInfo);
}
