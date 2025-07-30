import React from 'react';

interface FilterToggleProps {
  showCompleted: boolean;
  onToggle: (showCompleted: boolean) => void;
}

export const FilterToggle: React.FC<FilterToggleProps> = ({ showCompleted, onToggle }) => {
  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="showCompleted"
          checked={showCompleted}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="showCompleted">
          Show completed tasks only
        </label>
      </div>
    </div>
  );
}; 