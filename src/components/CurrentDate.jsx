import React from 'react'

export default function CurrentDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();    
  return `${dd}.${mm.toString().padStart(2, '0')}.${yyyy}`;
}
