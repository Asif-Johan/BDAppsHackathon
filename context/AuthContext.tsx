import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

export type UserType = 'student' | 'corporate';

export interface StudentProfile {
  fullName: string;
  university: string;
  department: string;
  graduationYear: string;
  bio?: string;
  skills?: string[];
}

export interface CorporateProfile {
  companyName: string;
  industry: string;
  location: string;
  companySize: string;
  about?: string;
}

interface AuthContextType {
  user: User | null;
  userType: UserType | null;
  userProfile: StudentProfile | CorporateProfile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userType: UserType, profile: StudentProfile | CorporateProfile) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userProfile, setUserProfile] = useState<StudentProfile | CorporateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    // Set up mounted ref
    isMounted.current = true;

    // Clean up function
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Only update state if component is still mounted
      if (!isMounted.current) return;

      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          // Check if component is still mounted before updating state
          if (isMounted.current && userDoc.exists()) {
            const userData = userDoc.data();
            setUserType(userData.userType as UserType);
            setUserProfile(userData.profile);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        if (isMounted.current) {
          setUserType(null);
          setUserProfile(null);
        }
      }
      
      if (isMounted.current) {
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    userType: UserType, 
    profile: StudentProfile | CorporateProfile
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        email,
        userType,
        profile,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error during sign up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  const value = {
    user,
    userType,
    userProfile,
    isLoading,
    signUp,
    signIn,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}