"use client";
import { useEffect } from "react";
import { useLoading } from "@/app/contexts/LoadingContext";

export default function BodyScrollLock() {
  const { loading } = useLoading();

  useEffect(() => {
    if (loading) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [loading]);

  return null;
}
