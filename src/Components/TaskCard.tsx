import { CalendarDays, Check, Pencil, Trash2 } from 'lucide-react';
import type { Task } from '../Interfaces/Task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
}

const priorityStyles = {
  dusuk: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  orta: 'bg-amber-50 text-amber-700 border-amber-100',
  yuksek: 'bg-red-50 text-red-700 border-red-100',
};

const priorityLabels = {
  dusuk: 'Düşük',
  orta: 'Orta',
  yuksek: 'Yüksek',
};

function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const completed = task.status === 'tamamlandi';
  const formattedDate = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(task.dueDate));

  return (
    <article className={`rounded-[2rem] border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${completed ? 'border-emerald-200' : 'border-slate-200'}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
            {task.category}
          </span>
          <span className={`rounded-full border px-3 py-1 text-xs font-black ${priorityStyles[task.priority]}`}>
            {priorityLabels[task.priority]}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggleStatus(task.id)}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black transition ${
            completed
              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Check className="h-4 w-4" />
          {completed ? 'Tamamlandı' : 'Beklemede'}
        </button>
      </div>

      <h3 className={`text-xl font-black ${completed ? 'text-slate-400 line-through' : 'text-slate-950'}`}>
        {task.title}
      </h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
        {task.description || 'Bu görev için açıklama eklenmedi.'}
      </p>

      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
        <CalendarDays className="h-5 w-5 text-blue-500" />
        {formattedDate}
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-200"
        >
          <Pencil className="h-4 w-4" />
          Güncelle
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 font-bold text-red-700 transition hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
          Sil
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
