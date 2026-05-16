import { FormEvent, useEffect, useState } from 'react';
import { PlusCircle, Save, X } from 'lucide-react';
import type { Task, TaskFormData, TaskPriority } from '../Interfaces/Task';

interface TaskFormProps {
  editingTask: Task | null;
  onCreate: (task: TaskFormData) => void;
  onUpdate: (taskId: string, task: TaskFormData) => void;
  onCancelEdit: () => void;
}

const emptyForm: TaskFormData = {
  title: '',
  description: '',
  category: 'Genel',
  priority: 'orta',
  dueDate: '',
};

function TaskForm({ editingTask, onCreate, onUpdate, onCancelEdit }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormData>(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        category: editingTask.category,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      });
      setError('');
      return;
    }

    setForm(emptyForm);
    setError('');
  }, [editingTask]);

  const updateField = (field: keyof TaskFormData, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: field === 'priority' ? (value as TaskPriority) : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError('Görev başlığı boş bırakılamaz.');
      return;
    }

    if (!form.dueDate) {
      setError('Lütfen bir teslim tarihi seç.');
      return;
    }

    if (editingTask) {
      onUpdate(editingTask.id, form);
    } else {
      onCreate(form);
    }

    setForm(emptyForm);
    setError('');
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            {editingTask ? 'Güncelleme İşlemi' : 'Ekleme İşlemi'}
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">
            {editingTask ? 'Görevi düzenle' : 'Yeni görev ekle'}
          </h2>
        </div>
        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200"
            aria-label="Düzenlemeyi iptal et"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Görev Başlığı</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Görev başlığını yaz."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Açıklama</span>
          <textarea
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Görev hakkında kısa açıklama yaz."
            rows={4}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Kategori</span>
            <select
              value={form.category}
              onChange={(event) => updateField('category', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option>Genel</option>
              <option>Okul</option>
              <option>İş</option>
              <option>Kişisel</option>
              <option>Yazılım</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Öncelik</span>
            <select
              value={form.priority}
              onChange={(event) => updateField('priority', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="dusuk">Düşük</option>
              <option value="orta">Orta</option>
              <option value="yuksek">Yüksek</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Teslim Tarihi</span>
          <input
            type="date"
            value={form.dueDate}
            onChange={(event) => updateField('dueDate', event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </label>

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          {editingTask ? <Save className="h-5 w-5" /> : <PlusCircle className="h-5 w-5" />}
          {editingTask ? 'Görevi Güncelle' : 'Görev Ekle'}
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
