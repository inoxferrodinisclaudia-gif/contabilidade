import ThemeSettings from '../ThemeSettings';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 rounded-none border-b border-border bg-surface/95 px-4 py-3 backdrop-blur print:hidden">
      <div className="flex items-center justify-between gap-4 container">
        <div className="flex items-center gap-4">
          <div className="logo">INOX FERRO</div>
          <div className="brand-sub hidden md:block">Sistema de Orçamentos</div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSettings />
        </div>
      </div>
    </header>
  );
}
