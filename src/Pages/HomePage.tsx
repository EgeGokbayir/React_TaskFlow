import { useEffect, useMemo, useState } from 'react';
import Header from '../Components/Header';
import StatsCard from '../Components/StatsCard';
import TaskForm from '../Components/TaskForm';
import TaskList from '../Components/TaskList';
import type { Task, TaskFormData, TaskStatus } from '../Interfaces/Task';

const STORAGE_KEY = 'taskflow_tasks';

const starterTasks: Task[] = [];

function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : starterTasks;
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.toLocaleLowerCase('tr-TR').trim();

    return tasks
      .filter((task) => (statusFilter === 'all' ? true : task.status === statusFilter))
      .filter((task) => {
        if (!normalizedSearch) return true;

        const searchableText = `${task.title} ${task.description} ${task.category}`.toLocaleLowerCase('tr-TR');
        return searchableText.includes(normalizedSearch);
      })
      .sort((firstTask, secondTask) => Number(firstTask.status === 'tamamlandi') - Number(secondTask.status === 'tamamlandi'));
  }, [tasks, searchTerm, statusFilter]);

  const handleCreate = (formData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...formData,
      status: 'beklemede',
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const handleUpdate = (taskId: string, formData: TaskFormData) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, ...formData } : task)),
    );
    setEditingTask(null);
  };

  const handleDelete = (taskId: string) => {
    const confirmed = window.confirm('Bu görevi silmek istediğine emin misin?');
    if (!confirmed) return;

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));

    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  };

  const handleToggleStatus = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'tamamlandi' ? 'beklemede' : 'tamamlandi',
            }
          : task,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <Header />
        <StatsCard tasks={tasks} />

        <div className="grid gap-8 lg:grid-cols-[420px_1fr] lg:items-start">
          <TaskForm
            editingTask={editingTask}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancelEdit={() => setEditingTask(null)}
          />

          <TaskList
            tasks={filteredTasks}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusFilterChange={setStatusFilter}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
