"use client";

import { useEffect, useRef, useState } from "react";

export function useEmailForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { email, setEmail, loading, setLoading, submitted, setSubmitted, isMounted };
}
