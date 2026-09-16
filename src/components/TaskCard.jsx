import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Clock, PlayCircle, CheckCircle, Edit3, Trash2 } from 'lucide-react';

export default function TaskCard({ task, onEdit }) {
  const { updateStatus, removeTask } = useTasks();

  const getStatusClass = (status) => {
    switch (status) {
      case 'Planned': return 'planned';
      case 'In Progress': return 'in-progress';
      case 'Complete': return 'complete';
      default: return 'planned';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Planned': return <Clock size={12} />;
      case 'In Progress': return <PlayCircle size={12} />;
      case 'Complete': return <CheckCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className={`task-card ${task.status === 'Complete' ? 'completed' : ''}`}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`status-badge ${getStatusClass(task.status)}`}>
          {getStatusIcon(task.status)}
          <span>{task.status}</span>
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>
            Status:
          </span>
          <select
            className="status-select"
            value={task.status}
            onChange={(e) => updateStatus(task._id, e.target.value)}
          >
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <div className="task-actions">
          <button className="icon-btn" onClick={() => onEdit(task)} title="Edit Task">
            <Edit3 size={15} />
          </button>
          <button className="icon-btn delete" onClick={() => removeTask(task._id)} title="Delete Task">
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
