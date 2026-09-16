import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../services/api';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All'); // All, Planned, In Progress, Complete
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const params = {};
      if (filterStatus !== 'All') {
        params.status = filterStatus;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      const res = await taskAPI.getTasks(params);
      setTasks(res.data.tasks || []);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error fetching tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [user, filterStatus, searchQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      const res = await taskAPI.createTask(taskData);
      showToast('Task created successfully!');
      fetchTasks();
      return res.data.task;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create task';
      showToast(msg, 'error');
      throw new Error(msg);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      // Optimistic UI update
      setTasks(prev => prev.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
      await taskAPI.updateTaskStatus(taskId, newStatus);
      showToast(`Status updated to "${newStatus}"`);
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update status';
      showToast(msg, 'error');
      fetchTasks(); // rollback on error
    }
  };

  const editTask = async (taskId, taskData) => {
    try {
      await taskAPI.updateTask(taskId, taskData);
      showToast('Task updated successfully');
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update task';
      showToast(msg, 'error');
      throw new Error(msg);
    }
  };

  const removeTask = async (taskId) => {
    try {
      setTasks(prev => prev.filter(t => t._id !== taskId));
      await taskAPI.deleteTask(taskId);
      showToast('Task deleted');
      fetchTasks();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete task';
      showToast(msg, 'error');
      fetchTasks();
    }
  };

  // Calculate status statistics
  const stats = {
    total: tasks.length,
    planned: tasks.filter(t => t.status === 'Planned').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    complete: tasks.filter(t => t.status === 'Complete').length
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        filterStatus,
        setFilterStatus,
        searchQuery,
        setSearchQuery,
        stats,
        toast,
        addTask,
        updateStatus,
        editTask,
        removeTask,
        refreshTasks: fetchTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
