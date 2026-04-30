import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface Insight {
  id?: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  tag: string;
  status: 'draft' | 'published';
  createdAt?: any;
  updatedAt?: any;
}

export const adminService = {
  // Insights
  async getInsights(includeDrafts = false) {
    const path = 'insights';
    try {
      let q = query(collection(db, path), orderBy('createdAt', 'desc'));
      if (!includeDrafts) {
        q = query(collection(db, path), where('status', '==', 'published'), orderBy('createdAt', 'desc'));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Insight));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async getInsight(id: string) {
    const path = `insights/${id}`;
    try {
      const docRef = doc(db, 'insights', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Insight;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  async createInsight(insight: Omit<Insight, 'id'>) {
    const path = 'insights';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...insight,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async updateInsight(id: string, insight: Partial<Insight>) {
    const path = `insights/${id}`;
    try {
      const docRef = doc(db, 'insights', id);
      await updateDoc(docRef, {
        ...insight,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  async deleteInsight(id: string) {
    const path = `insights/${id}`;
    try {
      const docRef = doc(db, 'insights', id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Admins
  async checkIfAdmin(uid: string) {
    const path = `admins/${uid}`;
    try {
      const docRef = doc(db, 'admins', uid);
      const snapshot = await getDoc(docRef);
      return snapshot.exists();
    } catch (error) {
      // If we can't read, they probably aren't admin (due to rules)
      return false;
    }
  }
};
