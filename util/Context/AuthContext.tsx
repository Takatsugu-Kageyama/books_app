import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { firebase } from "../Firebase/firebaseConfig";
import { useRouter } from "next/router";

export type UserType = User | null;

export type AuthContextProps = {
  user: UserType;
};

export type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const auth = getAuth(firebase);
  const [user, setUser] = useState<UserType>(null);
  const isUnAvailableForViewing = router.pathname === "/UserPage" || router.pathname === "/Cart";
  const isAvailableForViewing = router.pathname === "/Login";
  const value = {
    user,
  };

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      !user && isUnAvailableForViewing && (await router.push("/Login"));
      user && isAvailableForViewing  && (await router.push("/"));
    });
    return () => {
      authStateChanged();
    };
  }, []);

  return  (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};
