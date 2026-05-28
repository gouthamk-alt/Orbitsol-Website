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
  serverTimestamp,
  onSnapshot,
  writeBatch
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

export interface Testimonial {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  order: number;
  updatedAt?: any;
}

export const adminService = {
  // Insights
  async getInsights(includeDrafts = false) {
    const path = 'insights';
    try {
      // Fetch all docs to avoid missing index errors and be robust against missing/null properties
      const snapshot = await getDocs(collection(db, path));
      let list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Insight));
      
      // Filter out drafts if requested
      if (!includeDrafts) {
        list = list.filter(item => item.status !== 'draft');
      }
      
      // Sort client-side by createdAt descending (fallback to date, then fallback to epoch) with safety checks
      list.sort((a, b) => {
        const getMs = (item: Insight) => {
          if (item.createdAt?.seconds) return item.createdAt.seconds * 1000;
          if (item.createdAt?.toDate) {
            try { return item.createdAt.toDate().getTime(); } catch(e) {}
          }
          if (item.createdAt instanceof Date) return item.createdAt.getTime();
          if (item.date) {
            const parsed = Date.parse(item.date);
            if (!isNaN(parsed)) return parsed;
          }
          return 0;
        };
        const timeA = getMs(a);
        const timeB = getMs(b);
        return timeB - timeA;
      });
      
      return list;
    } catch (error) {
      console.warn("getInsights failed with primary strategy, using raw fallback", error);
      try {
        const snapshot = await getDocs(collection(db, path));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Insight));
      } catch (innerError) {
        handleFirestoreError(innerError, OperationType.LIST, path);
      }
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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
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
        updatedAt: serverTimestamp()
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

  async getAdmins() {
    const path = 'admins';
    try {
      const snapshot = await getDocs(collection(db, 'admins'));
      return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async addAdmin(uid: string, email: string, name?: string) {
    const path = `admins/${uid}`;
    try {
      const docRef = doc(db, 'admins', uid);
      await setDoc(docRef, {
        email: email.trim().toLowerCase(),
        name: name?.trim() || '',
        addedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async deleteAdmin(uid: string) {
    const path = `admins/${uid}`;
    try {
      const docRef = doc(db, 'admins', uid);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Team Members
  async getTeamMembers() {
    const path = 'team';
    console.log("Fetching team members...");
    try {
      // Temporarily remove orderBy to check for index-related hangs
      const q = query(collection(db, path));
      // 10 second timeout for reads
      const snapshot = await Promise.race([
        getDocs(q),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore read timed out")), 10000))
      ]) as any;
      console.log(`Fetched ${snapshot.docs.length} team members`);
      const members = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as TeamMember));
      // Sort client-side
      return members.sort((a, b) => (a.order || 0) - (b.order || 0));
    } catch (error) {
      console.error("Get team error:", error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async saveTeamMember(member: Partial<TeamMember>) {
    const isNew = !member.id;
    const path = isNew ? 'team' : `team/${member.id}`;
    console.log(`Saving team member (isNew: ${isNew})...`);
    
    const data = {
      ...member,
      updatedAt: serverTimestamp(),
    };
    
    const docId = member.id;
    if (!isNew) delete (data as any).id;

    const savePromise = isNew 
      ? addDoc(collection(db, 'team'), data)
      : updateDoc(doc(db, 'team', docId!), data);

    try {
      // 15 second timeout for Firestore writes
      const result = await Promise.race([
        savePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore write timed out")), 15000))
      ]);
      console.log("Member saved/updated successfully");
      return (result as any)?.id;
    } catch (error) {
      console.error("Save team error:", error);
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

  // Testimonials
  async getTestimonials() {
    const path = 'testimonials';
    console.log("Fetching testimonials...");
    try {
      const q = query(collection(db, path));
      const snapshot = await Promise.race([
        getDocs(q),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore read timed out")), 10000))
      ]) as any;
      console.log(`Fetched ${snapshot.docs.length} testimonials`);
      const list = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Testimonial));
      return list.sort((a, b) => (a.order || 0) - (b.order || 0));
    } catch (error) {
      console.error("Get testimonials error:", error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async saveTestimonial(testimonial: Partial<Testimonial>) {
    const isNew = !testimonial.id;
    const path = isNew ? 'testimonials' : `testimonials/${testimonial.id}`;
    console.log(`Saving testimonial (isNew: ${isNew})...`);
    
    const data = {
      ...testimonial,
      updatedAt: serverTimestamp(),
    };
    
    const docId = testimonial.id;
    if (!isNew) delete (data as any).id;

    const savePromise = isNew 
      ? addDoc(collection(db, 'testimonials'), data)
      : updateDoc(doc(db, 'testimonials', docId!), data);

    try {
      const result = await Promise.race([
        savePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore write timed out")), 15000))
      ]);
      console.log("Testimonial saved/updated successfully");
      return (result as any)?.id;
    } catch (error) {
      console.error("Save testimonial error:", error);
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async deleteTestimonial(id: string) {
    const path = `testimonials/${id}`;
    try {
      const docRef = doc(db, 'testimonials', id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  async bootstrapTestimonials(items: Partial<Testimonial>[]) {
    console.log("Bootstrapping testimonials...");
    const batch = writeBatch(db);
    
    for (const item of items) {
      const newDocRef = doc(collection(db, 'testimonials'));
      batch.set(newDocRef, {
        quote: item.quote || '',
        author: item.author || '',
        role: item.role || '',
        company: item.company || '',
        order: item.order || 0,
        updatedAt: serverTimestamp(),
      });
    }
    
    try {
      await Promise.race([
        batch.commit(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Batch commit timed out")), 20000))
      ]);
      console.log("Batch bootstrap testimonials successful");
    } catch (error) {
      console.error("Bootstrap testimonials error:", error);
      handleFirestoreError(error, OperationType.WRITE, 'testimonials (batch)');
    }
  },

  async bootstrapTeam(members: Partial<TeamMember>[]) {
    console.log("Bootstrapping team...");
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
      // 20 second timeout for batch commit
      await Promise.race([
        batch.commit(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Batch commit timed out")), 20000))
      ]);
      console.log("Batch commit successful");
    } catch (error) {
      console.error("Bootstrap batch error:", error);
      handleFirestoreError(error, OperationType.WRITE, 'team (batch)');
    }
  },

  async uploadTeamPhoto(dataUrl: string, fileName: string) {
    console.log("Processing photo:", fileName);
    
    // Helper to convert Google Drive links
    const convertGoogleDriveUrl = (url: string) => {
      const driveMatch = url.match(/\/(?:file\/d\/|open\?id=)([\w-]+)/);
      if (driveMatch && driveMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
      }
      return url;
    };

    try {
      // If it's a Google Drive link, convert it
      if (dataUrl.includes('drive.google.com')) {
        return convertGoogleDriveUrl(dataUrl);
      }

      // If it's not a data URL, it's already a URL
      if (!dataUrl.startsWith('data:')) {
        return dataUrl;
      }

      // If it's a small data URL (< 200KB), store it directly in Firestore
      // Base64 overhead is ~33%, so 200KB binary = ~266KB string. 
      // Firestore limit is 1MB total for doc. This is safe.
      if (dataUrl.length < 250000) {
        console.log("Storing small photo directly in Firestore");
        return dataUrl;
      }

      console.log("Uploading large photo to Storage...");
      const storageRef = ref(storage, `team/${Date.now()}_${fileName}`);
      
      // 20 second timeout for storage uploads
      const uploadPromise = uploadString(storageRef, dataUrl, 'data_url');
      const result = await Promise.race([
        uploadPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Storage upload timed out")), 20000))
      ]) as any;
      
      const url = await getDownloadURL(result.ref);
      console.log("Photo uploaded successfully to Storage:", url);
      return url;
    } catch (error) {
      console.error("Photo Error:", error);
      // Fallback: just return the dataUrl if storage fails
      return dataUrl;
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
