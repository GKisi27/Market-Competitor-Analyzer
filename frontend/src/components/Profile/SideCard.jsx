import React from "react";

const SideCard = ({ handleSignOut }) => {
  return (
    <div className="card w-80 shrink-0 flex p-8 flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold mb-1">Access & Permissions</h3>
        <div className="h-px bg-[var(--border)] mb-4" />
      </div>
      
      <div className="flex flex-col gap-3 flex-1">
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border)] px-4 py-2.5 rounded-full text-sm font-medium text-[var(--text-primary)] hover:text-blue-500 hover:border-blue-500 transition-colors cursor-default">View Logs</div>
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border)] px-4 py-2.5 rounded-full text-sm font-medium text-[var(--text-primary)] hover:text-blue-500 hover:border-blue-500 transition-colors cursor-default">Manage Competitors</div>
      </div>

      <div className="mt-auto flex justify-center">
      <button 
        onClick={handleSignOut}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 transition-colors py-2.5 rounded-lg font-bold text-sm cursor-pointer"
      >
        Sign Out
      </button>
      </div>
    </div>
  );
};

export default SideCard;
