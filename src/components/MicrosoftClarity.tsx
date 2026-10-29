"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = "z5crg8q0la";

let isInitialized = false;

export function MicrosoftClarity() {
  useEffect(() => {
    if (typeof window === "undefined" || isInitialized) {
      return;
    }

    if (document.getElementById("clarity-script")) {
      isInitialized = true;
      return;
    }

    Clarity.init(CLARITY_PROJECT_ID);
    isInitialized = true;
  }, []);

  return null;
}
