import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useTasks } from './context/TaskContext';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import Toast from './components/Toast';
import { Plus, Search, CheckSquare, Layers, Clock, PlayCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

function Dashboard() {
  const { user } = useAuth();
  const {
    tasks,
    loading,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    totalPages,
    stats
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  return (
    <div className="main-content">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-title-section">
          <div className="title-wrap">
            <h1>Task Dashboard</h1>
            <p>Welcome back, {user?.name}! Track and organize your tasks seamlessly.</p>
          </div>
          <button className="btn btn-primary" onClick={handleOpenCreateModal}>
            <Plus size={18} />
            <span>Create New Task</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="filter-bar">
          <div className="filter-tabs">
            <button
              className={`tab-btn ${filterStatus === 'All' ? 'active' : ''}`}
              onClick={() => { setFilterStatus('All'); setPage(1); }}
            >
              <Layers size={14} />
              <span>All Tasks</span>
              <span className="tab-count">{stats.total}</span>
            </button>

            <button
              className={`tab-btn ${filterStatus === 'Planned' ? 'active' : ''}`}
              onClick={() => { setFilterStatus('Planned'); setPage(1); }}
            >
              <Clock size={14} />
              <span>Planned</span>
              <span className="tab-count">{stats.planned}</span>
            </button>

            <button
              className={`tab-btn ${filterStatus === 'In Progress' ? 'active' : ''}`}
              onClick={() => { setFilterStatus('In Progress'); setPage(1); }}
            >
              <PlayCircle size={14} />
              <span>In Progress</span>
              <span className="tab-count">{stats.inProgress}</span>
            </button>

            <button
              className={`tab-btn ${filterStatus === 'Complete' ? 'active' : ''}`}
              onClick={() => { setFilterStatus('Complete'); setPage(1); }}
            >
              <CheckCircle size={14} />
              <span>Complete</span>
              <span className="tab-count">{stats.complete}</span>
            </button>
          </div>

          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            />
          </div>
        </div>
      </div>

      {/* Task List / Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <p>Loading your tasks...</p>
        </div>
      ) : tasks.length > 0 ? (
        <>
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleOpenEditModal} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '2rem',
              padding: '0.75rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <button
                className="btn btn-secondary btn-sm"
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Page <strong style={{ color: 'var(--text-main)' }}>{page}</strong> of <strong style={{ color: 'var(--text-main)' }}>{totalPages}</strong>
              </span>

              <button
                className="btn btn-secondary btn-sm"
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <CheckSquare size={28} />
          </div>
          <h3>No tasks found</h3>
          <p>
            {searchQuery || filterStatus !== 'All'
              ? 'No tasks match your current filter or search criteria.'
              : 'You haven\'t created any tasks yet. Click "Create New Task" to get started!'}
          </p>
          {(!searchQuery && filterStatus === 'All') && (
            <button
              className="btn btn-primary"
              style={{ marginTop: '1.25rem' }}
              onClick={handleOpenCreateModal}
            >
              <Plus size={16} /> Create Your First Task
            </button>
          )}
        </div>
      )}

      {/* Modals & Notifications */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
      />
      <Toast />
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-main)',
        color: 'var(--text-muted)'
      }}>
        <p>Loading Task360 environment...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      {user ? <Dashboard /> : <LoginModal />}
    </div>
  );
}
