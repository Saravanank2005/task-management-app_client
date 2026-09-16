import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useTasks();

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.75rem 1.25rem',
        borderRadius: '12px',
        background: isError ? '#7f1d1d' : '#064e3b',
        color: isError ? '#fca5a5' : '#6ee7b7',
        border: `1px solid ${isError ? '#ef4444' : '#10b981'}`,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
        fontSize: '0.9rem',
        fontWeight: '600',
        animation: 'fadeIn 0.2s ease'
      }}
    >
      {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
      <span>{toast.message}</span>
    </div>
  );
}
