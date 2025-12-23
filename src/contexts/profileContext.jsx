"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext(null);


export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [healthInfo, setHealthInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const [userRes, healthRes] = await Promise.all([
        fetch("/api/profile", { credentials: "include" }),
        fetch("/api/healthProfile", { credentials: "include" }),
      ]);
      

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }

      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setHealthInfo(healthData);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateUser = async (payload) => {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const updated = await res.json();
    setUser(updated);
  };

  const updateHealthInfo = async (payload) => {
    const res = await fetch("/api/healthProfile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const updated = await res.json();
    setHealthInfo(updated);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        user,
        healthInfo,
        loading,
        refetchProfile: fetchProfile,
        updateUser,
        updateHealthInfo,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};
