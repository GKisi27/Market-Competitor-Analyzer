import React from 'react';

const ProfileHeader = ({ user, onEditToggle, editOpen }) => {
  return (
    <div className='card flex items-center p-10 gap-10 mb-6'>
      <div className="relative shrink-0">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-3xl font-bold select-none">
          {user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
        </div>
        <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[var(--bg-card)] ${user?.status ? 'bg-green-400' : 'bg-gray-500'}`} />
      </div>

      <div className="flex-1 min-w-0 font-semibold">
        <h2 className="text-2xl font-bold truncate">{user?.full_name || '—'}</h2>
        <p className="text-gray-400 text-sm mt-1 truncate">{user?.email || ''}</p>
        <span className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${user?.status ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'}`}>
          {user?.status ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className='ml-auto self-end'>
        <button 
          onClick={onEditToggle}
          className='px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm transition-colors cursor-pointer'
        >
          {editOpen ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
    </div>
  )
}

export default ProfileHeader;
