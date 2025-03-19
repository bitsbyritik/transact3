import { getSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  merchantId?: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const session = await getSession();
        const userData = session?.data?.user;

        if (userData) {
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            avatar: userData.image || undefined,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};