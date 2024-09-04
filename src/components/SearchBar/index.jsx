import React from 'react'
const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher un film..."
      onChange={e => onSearch(e.target.value)}
      style={{
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px',
        width: '100%',
        maxWidth: '300px',
        marginBottom: '16px'
      }}
    />
  )
}

export default SearchBar