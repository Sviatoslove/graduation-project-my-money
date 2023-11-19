import React from 'react';

const UserPlaceholder = () => {
  return (
    <div className="flex-grow-1 mt-1">
      <ul className="list-group list-group-flush placeholder-glow">
        <li className="list-group-item mb-1 h-50px w-96 placeholder bg-placeholders br-10"></li>
        <li className="list-group-item mb-1 h-120px w-100 placeholder bg-placeholders br-10"></li>
        <li className="list-group-item mb-1 h-120px w-100 placeholder bg-placeholders br-10"></li>
        <li className="list-group-item mb-1 h-50px w-100 placeholder bg-placeholders br-10"></li>
        <li className="list-group-item mb-1 h-50px w-100 placeholder bg-placeholders br-10"></li>
      </ul>
    </div>
  );
};

export default UserPlaceholder;
