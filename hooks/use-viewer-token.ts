'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    const createToken = async () => {
      try {
        // Check if the viewer identity is valid
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        // Decode the token to get the identity and name
        const decodedToken = jwtDecode<JwtPayload & { name?: string }>(viewerToken);
        const name = decodedToken?.name;

        // Take the identity from the token
        // If the token is not valid, the identity will be undefined
        const identity = decodedToken?.sub;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch (error) {
        toast.error('Something went wrong!');
      }
    }

    // Create the token when the host identity changes
    // This will also run when the component mounts
    createToken()
  }, [hostIdentity])

  return {
    token,
    name,
    identity
  };
}
