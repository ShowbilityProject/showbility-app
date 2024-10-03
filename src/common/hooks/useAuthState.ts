import { useEffect, useState } from "react";
import { verifyToken } from "../../service/account";

export const useAuthState = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyToken()
      .then(setAuthenticated)
      .finally(() => setLoading(false));
  }, []);

  return { authenticated, loading };
};
