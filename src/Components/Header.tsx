import { CheckCircle2, Github, Rocket, Underline } from 'lucide-react';

function Header() {
  return (
    <header className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-300 md:px-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            TaskFlow ile görevlerini kolayca yönet.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Eğitim yönergesine uygun olarak geliştirilmiş bu uygulamada görev ekleme, listeleme,
            güncelleme ve silme işlemleri yapılabilir. Veriler tarayıcıdaki localStorage üzerinde saklanır.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-72 lg:grid-cols-1">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <Github className="mb-3 h-7 w-7 text-violet-300" />
            <p className="text-sm text-slate-300">GitHub Link:</p>
            <p className="text-lg font-bold"><a href='https://github.com/EgeGokbayir/React_TaskFlow' target='_blank'>github.com/EgeGokbayir</a></p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
