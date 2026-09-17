"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";

/**
 * Shows the portrait from /public when it exists, and falls back to a
 * monogram plate so the layout never breaks before a photo is added.
 */
export default function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-linear-to-br from-ink-800 to-ink-900">
        <span className="font-display text-7xl font-extrabold text-accent-500/40">
          {profile.initials}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={profile.photo}
      alt={`Portrait of ${profile.name}`}
      width={800}
      height={1000}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-center"
    />
  );
}
