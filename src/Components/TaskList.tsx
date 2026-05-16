import { Search } from 'lucide-react';
import type { Task, TaskStatus } from '../Interfaces/Task';
import EmptyState from './EmptyState';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  searchTerm: string;
  statusFilter: 'all' | TaskStatus;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: 'all' | TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
}

function TaskList({
  tasks,
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onEdit,
  onDelete,
  onToggleStatus,
}: TaskListProps) {
  return (
    <section className="space-y-5">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Listeleme İşlemi</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">Görev Listesi</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_180px] lg:w-[520px]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Başlık, açıklama veya kategori ara"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <select
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value as 'all' | TaskStatus)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">Tüm görevler</option>
              <option value="beklemede">Bekleyenler</option>
              <option value="tamamlandi">Tamamlananlar</option>
            </select>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;
