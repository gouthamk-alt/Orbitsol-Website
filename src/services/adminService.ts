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
import { ref, uploadString, getDownloadURL, uploadBytes } from 'firebase/storage';
import { db, auth, storage } from '../lib/firebase';

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

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  photo: string;
  order: number;
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

  async getSettings(key: string) {
    const path = `siteSettings/${key}`;
    try {
      const docRef = doc(db, 'siteSettings', key);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data().value;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  async getEnquiries() {
    const path = 'enquiries';
    try {
      const q = query(collection(db, path), orderBy('submittedAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async saveInsight(insight: Partial<Insight>) {
    const isNew = !insight.id;
    const path = isNew ? 'insights' : `insights/${insight.id}`;
    
    const { serverTimestamp } = await import('firebase/firestore');
    const data = {
      ...insight,
      updatedAt: serverTimestamp(),
      ...(isNew ? { createdAt: serverTimestamp() } : {})
    };
    
    // Remove ID from data if updating
    const docId = insight.id;
    if (!isNew) delete (data as any).id;

    try {
      if (isNew) {
        return await addDoc(collection(db, 'insights'), data);
      } else {
        await updateDoc(doc(db, 'insights', docId!), data);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async updateSettings(key: string, value: any) {
    const path = `siteSettings/${key}`;
    const { serverTimestamp } = await import('firebase/firestore');
    try {
      const docRef = doc(db, 'siteSettings', key);
      await setDoc(docRef, {
        key,
        value,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

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
  },

  // Team Members
  async getTeamMembers() {
    const path = 'team';
    try {
      const q = query(collection(db, path), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async saveTeamMember(member: Partial<TeamMember>) {
    const { serverTimestamp } = await import('firebase/firestore');
    const isNew = !member.id;
    const path = isNew ? 'team' : `team/${member.id}`;
    
    const data = {
      ...member,
      updatedAt: serverTimestamp(),
    };
    
    const docId = member.id;
    if (!isNew) delete (data as any).id;

    try {
      if (isNew) {
        return await addDoc(collection(db, 'team'), data);
      } else {
        await updateDoc(doc(db, 'team', docId!), data);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async deleteTeamMember(id: string) {
    const path = `team/${id}`;
    try {
      const docRef = doc(db, 'team', id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  async bootstrapTeam(members: Partial<TeamMember>[]) {
    const { writeBatch, doc, collection, serverTimestamp } = await import('firebase/firestore');
    const batch = writeBatch(db);
    
    for (const member of members) {
      const newDocRef = doc(collection(db, 'team'));
      batch.set(newDocRef, {
        name: member.name || '',
        role: member.role || '',
        photo: member.photo || '',
        order: member.order || 0,
        updatedAt: serverTimestamp(),
      });
    }
    
    try {
      await batch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'team (batch)');
    }
  },

  async uploadTeamPhoto(dataUrl: string, fileName: string) {
    try {
      const storageRef = ref(storage, `team/${Date.now()}_${fileName}`);
      // If it's a data URL, we use uploadString
      if (dataUrl.startsWith('data:')) {
        const result = await uploadString(storageRef, dataUrl, 'data_url');
        return await getDownloadURL(result.ref);
      } else {
        // Assume it's a blob/file if not dataUrl? But here we mostly get dataUrl from crop
        return dataUrl; 
      }
    } catch (error) {
      console.error("Storage Error:", error);
      throw error;
    }
  },

  async uploadFile(file: File) {
    try {
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      const result = await uploadBytes(storageRef, file);
      return await getDownloadURL(result.ref);
    } catch (error) {
      console.error("Storage Error:", error);
      throw error;
    }
  }
};
