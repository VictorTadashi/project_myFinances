export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md px-12 py-10 text-center max-w-sm w-full">
        <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span>🚧</span>
          <span>Em Desenvolvimento</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Em produção</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-base max-w-xs mx-auto">
          Esta seção estará disponível em breve.
        </p>
      </div>
    </div>
  )
}
