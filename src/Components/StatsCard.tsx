import { ClipboardList, Clock3, CheckCircle2 } from 'lucide-react';
import type { Task } from '../Interfaces/Task';

interface StatsCardProps {
  tasks: Task[];
}

function StatsCard({ tasks }: StatsCardProps) {
  const completed = tasks.filter((task) => task.status === 'tamamlandi').length;
  const pending = tasks.length - completed;

  const cards = [
    {
      title: 'Toplam Görev',
      value: tasks.length,
      icon: ClipboardList,
      className: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      title: 'Bekleyen',
      value: pending,
      icon: Clock3,
      className: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    {
      title: 'Tamamlanan',
      value: completed,
      icon: CheckCircle2,
      className: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className={`rounded-3xl border p-5 shadow-sm ${card.className}`}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80">
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold opacity-80">{card.title}</p>
            <p className="mt-1 text-4xl font-black">{card.value}</p>
          </div>
        );
      })}
    </section>
  );
}

export default StatsCard;
