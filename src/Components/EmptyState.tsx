import { Inbox } from 'lucide-react';

function EmptyState() {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
        <Inbox className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-black text-slate-900">Henüz görev eklenmedi</h3>
      <p className="mx-auto mt-2 max-w-md text-slate-500">
        Soldaki formdan yeni bir görev oluşturarak listeleme, güncelleme ve silme işlemlerini test edebilirsin.
      </p>
    </div>
  );
}

export default EmptyState;
