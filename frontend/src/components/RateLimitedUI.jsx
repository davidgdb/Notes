import React from 'react';
import { Hourglass } from 'lucide-react'; // You can pick any Lucide icon or swap for another

export default function RateLimitedUI({ onRetry }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-primary/20">
      <div className="backdrop-blur-xl bg-base-100 bg-opacity-90 border border-primary/30 rounded-3xl max-w-sm w-full mx-4 shadow-2xl p-8 flex flex-col items-center gap-4">
        <div className="mb-2 flex flex-col items-center">
          <span className="inline-flex items-center gap-2">
            {/* Brand/logo; replace with your app logo if needed */}
            <span className="text-primary text-3xl font-bold tracking-tight mr-1">
              {/* Example: Notes */}
              <span className="font-black">Notes</span>
              <span className="text-secondary">App</span>
            </span>
            <Hourglass
              className="text-warning animate-pulse"
              size={40}
              strokeWidth={2.5}
            />
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-error mb-1 flex gap-2 items-center">
          Rate Limit Exceeded
        </h2>
        <p className="text-base text-base-content opacity-70 text-center">
          Whoops! You’ve hit the request limit.
          <br />
          Please wait a little—then try again.
        </p>
        {/*try again button*/}
        {/*<button*/}
        {/*  className="btn btn-primary btn-md btn-wide mt-6"*/}
        {/*  onClick={onRetry}*/}
        {/*  disabled={typeof onRetry !== "function"}*/}
        {/*>*/}
        {/*  <svg className="w-4 h-4 mr-2 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582A9.958 9.958 0 002 12c0 5.523 4.477 10 10 10a9.958 9.958 0 007.418-3.418A10 10 0 104.582 9H4" /></svg>*/}
        {/*  Try Again*/}
        {/*</button>*/}
      </div>
    </div>
  );
}
