"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowRight, ArrowUpRight, Bell, BookOpen,
  CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp,
  Clock3, Command, FileText, HeartHandshake, LayoutDashboard,
  Menu, MessageSquare, Moon, MoreHorizontal, Plus, Search, Settings2,
  ShieldCheck, Sparkles, Sun, Users, Wallet, type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { useDashboardStore } from "@/lib/store";

const navigation: { title: string; icon: LucideIcon; badge?: string }[] = [
  { title: "Visão geral", icon: LayoutDashboard },
  { title: "Pessoas", icon: Users },
  { title: "Ministérios", icon: HeartHandshake },
  { title: "Eventos", icon: CalendarDays, badge: "3" },
  { title: "Financeiro", icon: Wallet },
  { title: "Cursos", icon: BookOpen },
  { title: "Comunicação", icon: MessageSquare },
  { title: "Documentos", icon: FileText },
];

const cashflow = [
  { month: "Mai", income: 38, expenses: 25 }, { month: "Jun", income: 45, expenses: 28 },
  { month: "Jul", income: 40, expenses: 27 }, { month: "Ago", income: 56, expenses: 34 },
  { month: "Set", income: 50, expenses: 31 }, { month: "Out", income: 65, expenses: 38 },
  { month: "Nov", income: 59, expenses: 35 }, { month: "Dez", income: 78, expenses: 43 },
];
const attendance = [
  { name: "Cultos", value: 48, color: "#2563eb" },
  { name: "Células", value: 28, color: "#38bdf8" },
  { name: "Cursos", value: 16, color: "#a78bfa" },
  { name: "Outros", value: 8, color: "#e5e7eb" },
];
const events = [
  { day: "08", month: "NOV", time: "09:00", title: "Encontro de voluntários", place: "Auditório principal", color: "blue" },
  { day: "09", month: "NOV", time: "19:30", title: "Culto de celebração", place: "Templo central", color: "violet" },
  { day: "12", month: "NOV", time: "20:00", title: "Reunião de liderança", place: "Sala de reuniões", color: "amber" },
];
const tasks = [
  { title: "Confirmar equipe de recepção", meta: "Ministério · Hoje, 14:00", initials: "MC", color: "bg-sky-100 text-sky-700" },
  { title: "Revisar orçamento do evento", meta: "Financeiro · Hoje, 16:30", initials: "RA", color: "bg-violet-100 text-violet-700" },
  { title: "Enviar comunicado semanal", meta: "Comunicação · Amanhã", initials: "JL", color: "bg-amber-100 text-amber-700" },
];

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`grid ${small ? "size-9" : "size-10"} place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20`}>
        <span className="text-[17px] font-black tracking-tighter">A</span>
      </div>
      <div className="leading-tight">
        <div className="text-[14px] font-extrabold tracking-[.13em]">ATRYON <span className="text-blue-600">HUB</span></div>
        {!small && <div className="mt-1 text-[10px] tracking-wide text-[var(--muted)]">Gestão com propósito</div>}
      </div>
    </div>
  );
}

function KpiCard({ title, value, change, foot, icon: Icon, tone }: {
  title: string; value: string; change: string; foot: string; icon: LucideIcon; tone: string;
}) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.18 }} className="surface rounded-2xl border border-ui p-5 shadow-sm shadow-slate-200/30">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-[var(--muted)]">{title}</p>
          <p className="mt-3 text-[27px] font-bold tracking-tight">{value}</p>
        </div>
        <div className={`grid size-10 place-items-center rounded-xl ${tone}`}><Icon size={19} /></div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px]">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700"><ArrowUpRight size={12} />{change}</span>
        <span className="text-[var(--muted)]">{foot}</span>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { activeSection, setActiveSection, sidebarCollapsed, toggleSidebar } = useDashboardStore();
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const sidebar = (
    <aside className={`${sidebarCollapsed ? "w-[76px]" : "w-[250px]"} flex h-full shrink-0 flex-col border-r border-ui bg-[var(--surface)] transition-[width] duration-300`}>
      <div className={`flex h-[76px] items-center ${sidebarCollapsed ? "justify-center px-3" : "px-6"}`}>
        <Logo small={sidebarCollapsed} />
      </div>
      {!sidebarCollapsed && <div className="mx-4 mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-ui bg-[var(--surface-muted)] p-2.5">
        <div className="grid size-9 place-items-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700">IC</div>
        <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">Igreja Caminho</p><p className="mt-1 text-[10px] text-[var(--muted)]">Unidade Central</p></div>
        <ChevronDown size={15} className="text-[var(--muted)]" />
      </div>}
      <div className="mt-7 px-3">
        {!sidebarCollapsed && <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.13em] text-slate-400">Workspace</p>}
        <nav className="space-y-1">
          {navigation.map(({ title, icon: Icon, badge }) => (
            <button key={title} onClick={() => { setActiveSection(title); setMobileNav(false); }} title={sidebarCollapsed ? title : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition ${activeSection === title ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"} ${sidebarCollapsed ? "justify-center" : ""}`}>
              <Icon size={18} strokeWidth={1.8} /><span className={sidebarCollapsed ? "hidden" : "flex-1"}>{title}</span>
              {!sidebarCollapsed && badge && <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700">{badge}</span>}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-8 px-3">
        {!sidebarCollapsed && <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.13em] text-slate-400">Organização</p>}
        <button className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[var(--muted)] hover:bg-[var(--surface-muted)] ${sidebarCollapsed ? "justify-center" : ""}`}><ShieldCheck size={18} /><span className={sidebarCollapsed ? "hidden" : ""}>Atryon AI</span>{!sidebarCollapsed && <span className="ml-auto rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold text-violet-700">PRO</span>}</button>
        <button className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[var(--muted)] hover:bg-[var(--surface-muted)] ${sidebarCollapsed ? "justify-center" : ""}`}><Settings2 size={18} /><span className={sidebarCollapsed ? "hidden" : ""}>Configurações</span></button>
      </div>
      <div className="mt-auto p-3">
        {!sidebarCollapsed && <div className="mb-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4 text-white">
          <div className="mb-3 grid size-8 place-items-center rounded-lg bg-white/15"><Sparkles size={16} /></div>
          <p className="text-xs font-semibold">Seu espaço, do seu jeito</p>
          <p className="mt-1 text-[10px] leading-relaxed text-blue-100">Explore os módulos e simplifique sua gestão.</p>
          <button className="mt-3 flex items-center gap-1 text-[10px] font-semibold">Conhecer módulos <ArrowRight size={12} /></button>
        </div>}
        <button onClick={toggleSidebar} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-[var(--muted)] hover:bg-[var(--surface-muted)] ${sidebarCollapsed ? "justify-center" : ""}`}><ChevronLeft size={17} className={sidebarCollapsed ? "rotate-180" : ""} />{!sidebarCollapsed && "Recolher menu"}</button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <div className="hidden lg:block">{sidebar}</div>
      <AnimatePresence>{mobileNav && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setMobileNav(false)}>
        <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "tween", duration: .22 }} className="h-full w-[270px]" onClick={(event) => event.stopPropagation()}>{sidebar}</motion.div>
      </motion.div>}</AnimatePresence>

      <main className="min-w-0 flex-1">
        <header className="surface sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-ui px-4 sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <button aria-label="Abrir menu" onClick={() => setMobileNav(true)} className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--surface-muted)] lg:hidden"><Menu size={19} /></button>
            <div className="hidden items-center gap-2 text-xs text-[var(--muted)] sm:flex"><span>Workspace</span><ChevronRight size={13} /><span className="font-semibold text-[var(--foreground)]">{activeSection}</span></div>
            <button onClick={() => setSearchOpen(true)} className="flex h-9 w-[min(34vw,280px)] items-center gap-2 rounded-xl border border-ui bg-[var(--surface-muted)] px-3 text-xs text-[var(--muted)] sm:ml-5"><Search size={15} /><span className="flex-1 text-left">Buscar em tudo...</span><kbd className="hidden items-center gap-0.5 rounded border border-ui bg-[var(--surface)] px-1.5 py-0.5 text-[10px] sm:flex"><Command size={10} /> K</kbd></button>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button aria-label="Alternar tema" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="grid size-9 place-items-center rounded-xl text-[var(--muted)] hover:bg-[var(--surface-muted)]">{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button aria-label="Ajuda" className="hidden size-9 place-items-center rounded-xl text-[var(--muted)] hover:bg-[var(--surface-muted)] sm:grid"><CircleHelp size={18} /></button>
            <button aria-label="Notificações" className="relative grid size-9 place-items-center rounded-xl text-[var(--muted)] hover:bg-[var(--surface-muted)]"><Bell size={18} /><span className="absolute right-2 top-2 size-2 rounded-full border-2 border-[var(--surface)] bg-rose-500" /></button>
            <div className="mx-1 h-7 border-l border-ui" />
            <button className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-1 sm:pr-2">
              <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-orange-300 text-[11px] font-bold text-amber-900">PM</div>
              <div className="hidden text-left sm:block"><p className="text-[11px] font-semibold">Paulo Martins</p><p className="mt-0.5 text-[10px] text-[var(--muted)]">Administrador</p></div>
              <ChevronDown size={14} className="hidden text-[var(--muted)] sm:block" />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-4 pb-10 pt-7 sm:px-7 lg:px-9">
          {activeSection === "Visão geral" ? (
            <>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"><span className="size-1.5 rounded-full bg-blue-500" /> QUARTA-FEIRA, 04 DE NOVEMBRO</div>
              <h1 className="text-[25px] font-bold tracking-tight sm:text-[29px]">Bom dia, Paulo <span>👋</span></h1>
              <p className="mt-1.5 text-[13px] text-[var(--muted)]">Aqui está o resumo da sua organização hoje.</p>
            </div>
            <button className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"><Plus size={16} /> Novo registro</button>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard title="Total de membros" value="1.284" change="+8,2%" foot="vs. mês passado" icon={Users} tone="bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300" />
            <KpiCard title="Membros ativos" value="1.096" change="+4,6%" foot="vs. mês passado" icon={Activity} tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300" />
            <KpiCard title="Voluntários" value="156" change="+12,3%" foot="vs. mês passado" icon={HeartHandshake} tone="bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300" />
            <KpiCard title="Receita do mês" value="R$ 48.650" change="+6,8%" foot="vs. mês passado" icon={Wallet} tone="bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300" />
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.85fr)]">
            <div className="surface rounded-2xl border border-ui p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><h2 className="text-sm font-bold">Fluxo financeiro</h2><p className="mt-1 text-[11px] text-[var(--muted)]">Acompanhe receitas e despesas ao longo do tempo</p></div>
                <button className="flex items-center gap-2 rounded-lg border border-ui px-3 py-2 text-[10px] font-medium text-[var(--muted)]">Últimos 8 meses <ChevronDown size={13} /></button>
              </div>
              <div className="mt-5 flex items-center gap-5">
                <div><p className="text-[10px] text-[var(--muted)]">Receita total</p><p className="mt-1 text-lg font-bold">R$ 386.420</p></div>
                <div className="h-8 border-l border-ui" />
                <div><p className="text-[10px] text-[var(--muted)]">Despesas</p><p className="mt-1 text-lg font-bold">R$ 214.890</p></div>
                <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 sm:flex"><ArrowUpRight size={12} /> 12,5%</span>
              </div>
              <div className="mt-4 h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashflow} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={.16} /><stop offset="95%" stopColor="#2563eb" stopOpacity={0} /></linearGradient>
                      <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#38bdf8" stopOpacity={.12} /><stop offset="95%" stopColor="#38bdf8" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#98a2b3", fontSize: 10 }} dy={9} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#98a2b3", fontSize: 10 }} tickFormatter={(v) => `${v}k`} />
                    <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 11 }} formatter={(value) => [`R$ ${value} mil`]} />
                    <Area type="monotone" dataKey="income" name="Receitas" stroke="#2563eb" strokeWidth={2.5} fill="url(#incomeFill)" />
                    <Area type="monotone" dataKey="expenses" name="Despesas" stroke="#38bdf8" strokeWidth={2} fill="url(#expenseFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex justify-center gap-5 text-[10px] text-[var(--muted)]"><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-blue-600" />Receitas</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-sky-400" />Despesas</span></div>
            </div>

            <div className="surface rounded-2xl border border-ui p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between"><div><h2 className="text-sm font-bold">Participação</h2><p className="mt-1 text-[11px] text-[var(--muted)]">Distribuição por atividade</p></div><button aria-label="Mais opções"><MoreHorizontal size={18} className="text-[var(--muted)]" /></button></div>
              <div className="relative mt-2 h-[190px]">
                <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={attendance} dataKey="value" nameKey="name" innerRadius={59} outerRadius={83} paddingAngle={4} stroke="none">{attendance.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 11 }} /></PieChart></ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-[23px] font-bold">86%</span><span className="text-[10px] text-[var(--muted)]">presença média</span></div>
              </div>
              <div className="space-y-3 px-1">
                {attendance.map((item) => <div key={item.name} className="flex items-center justify-between text-[11px]"><span className="flex items-center gap-2 text-[var(--muted)]"><i className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span><span className="font-semibold">{item.value}%</span></div>)}
              </div>
              <button onClick={() => { setActiveSection("Pessoas"); }} className="mt-5 flex w-full items-center justify-center gap-1 border-t border-ui pt-4 text-[11px] font-semibold text-blue-600">Ver relatório completo <ArrowRight size={13} /></button>
            </div>
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(300px,.9fr)_minmax(250px,.8fr)]">
            <div className="surface rounded-2xl border border-ui p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between"><div><h2 className="text-sm font-bold">Próximos eventos</h2><p className="mt-1 text-[11px] text-[var(--muted)]">Sua agenda para os próximos dias</p></div><button onClick={() => setActiveSection("Eventos")} className="text-[11px] font-semibold text-blue-600">Ver agenda</button></div>
              <div className="space-y-2.5">
                {events.map((event) => <div key={event.title} className="flex items-center gap-3 rounded-xl border border-ui p-3 transition hover:bg-[var(--surface-muted)]">
                  <div className={`flex h-12 w-11 shrink-0 flex-col items-center justify-center rounded-lg ${event.color === "blue" ? "bg-blue-50 text-blue-700" : event.color === "violet" ? "bg-violet-50 text-violet-700" : "bg-amber-50 text-amber-700"}`}><span className="text-base font-bold leading-none">{event.day}</span><span className="mt-1 text-[8px] font-bold tracking-wide">{event.month}</span></div>
                  <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{event.title}</p><p className="mt-1 truncate text-[10px] text-[var(--muted)]">{event.place}</p></div>
                  <span className="flex shrink-0 items-center gap-1 text-[10px] text-[var(--muted)]"><Clock3 size={12} />{event.time}</span>
                </div>)}
              </div>
              <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-[11px] font-medium text-[var(--muted)] hover:bg-[var(--surface-muted)]"><Plus size={13} /> Adicionar evento</button>
            </div>

            <div className="surface rounded-2xl border border-ui p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between"><div><h2 className="text-sm font-bold">Tarefas pendentes</h2><p className="mt-1 text-[11px] text-[var(--muted)]">3 itens precisam da sua atenção</p></div><button aria-label="Opções"><MoreHorizontal size={18} className="text-[var(--muted)]" /></button></div>
              <div className="space-y-1">
                {tasks.map((task, index) => <div key={task.title} className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-[var(--surface-muted)]">
                  <button aria-label={checked.includes(index) ? "Marcar como pendente" : "Concluir tarefa"} onClick={() => setChecked((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index])} className={`mt-0.5 grid size-[17px] shrink-0 place-items-center rounded-md border ${checked.includes(index) ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 text-transparent"}`}>{checked.includes(index) && <Check size={12} />}</button>
                  <div className="min-w-0 flex-1"><p className={`text-[11px] font-semibold ${checked.includes(index) ? "text-[var(--muted)] line-through" : ""}`}>{task.title}</p><p className="mt-1.5 text-[9px] text-[var(--muted)]">{task.meta}</p></div>
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[8px] font-bold ${task.color}`}>{task.initials}</span>
                </div>)}
              </div>
              <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-[11px] font-medium text-blue-600 hover:bg-blue-50"><Plus size={13} /> Nova tarefa</button>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#172554] via-[#1e40af] to-[#2563eb] p-5 text-white shadow-lg shadow-blue-900/10">
                <div className="absolute -right-7 -top-8 size-36 rounded-full border border-white/10" /><div className="absolute -right-2 -top-3 size-24 rounded-full border border-white/10" />
                <div className="relative flex items-center gap-2"><div className="grid size-8 place-items-center rounded-lg bg-white/15"><Sparkles size={16} /></div><span className="text-xs font-bold">Atryon AI</span><span className="rounded-full bg-white/15 px-2 py-0.5 text-[8px] font-bold tracking-wide">BETA</span></div>
                <p className="relative mt-4 text-[17px] font-semibold leading-snug">Sua gestão, com uma ajuda inteligente.</p>
                <p className="relative mt-1.5 text-[10px] leading-relaxed text-blue-100">Pergunte sobre sua organização e encontre respostas em segundos.</p>
                <button className="relative mt-4 flex h-9 w-full items-center gap-2 rounded-xl bg-white px-3 text-[10px] text-slate-500"><Search size={13} /><span className="flex-1 text-left">Pergunte qualquer coisa...</span><ArrowRight size={13} className="text-blue-600" /></button>
                <div className="relative mt-3 flex items-center gap-1.5 text-[9px] text-blue-100"><ShieldCheck size={12} /> Assistente demonstrativo · integração futura</div>
              </div>
              <div className="surface rounded-2xl border border-ui p-4 shadow-sm">
                <div className="flex items-center justify-between"><span className="text-[11px] font-semibold">Resumo do dia</span><span className="size-2 rounded-full bg-emerald-500" /></div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[var(--surface-muted)] p-3"><p className="text-[9px] text-[var(--muted)]">Na agenda</p><p className="mt-1 text-lg font-bold">4 <span className="text-[10px] font-medium text-[var(--muted)]">eventos</span></p></div>
                  <div className="rounded-xl bg-[var(--surface-muted)] p-3"><p className="text-[9px] text-[var(--muted)]">Para aprovar</p><p className="mt-1 text-lg font-bold">2 <span className="text-[10px] font-medium text-[var(--muted)]">solicitações</span></p></div>
                </div>
              </div>
            </div>
          </section>
          <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-ui pt-5 text-[10px] text-[var(--muted)]"><span>© 2026 Atryon Hub · Conectando pessoas, processos e propósito.</span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-amber-500" /> Ambiente de demonstração · dados fictícios</span></footer>
            </>
          ) : (
            <section className="surface mx-auto mt-10 max-w-2xl rounded-2xl border border-ui p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300"><Sparkles size={21} /></div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[.14em] text-blue-600">Módulo Atryon Hub</p>
              <h1 className="mt-2 text-2xl font-bold">{activeSection}</h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">Esta área está preparada para receber os fluxos da sua organização. Os dados e indicadores de demonstração estão disponíveis na visão geral.</p>
              <button onClick={() => setActiveSection("Visão geral")} className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"><LayoutDashboard size={15} /> Voltar à visão geral</button>
            </section>
          )}
        </div>
      </main>

      <AnimatePresence>{searchOpen && <motion.div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/40 px-4 pt-[16vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
        <motion.div initial={{ y: -12, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8, scale: .98 }} className="surface w-full max-w-[540px] overflow-hidden rounded-2xl border border-ui shadow-2xl">
          <div className="flex items-center gap-3 border-b border-ui px-4"><Search size={18} className="text-[var(--muted)]" /><input autoFocus placeholder="Busque pessoas, eventos, módulos..." className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]" /><button onClick={() => setSearchOpen(false)} className="rounded-md border border-ui px-1.5 py-1 text-[10px] text-[var(--muted)]">ESC</button></div>
          <div className="p-3"><p className="px-2 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">Acesso rápido</p>{navigation.slice(0, 5).map(({ title, icon: Icon }) => <button key={title} onClick={() => { setActiveSection(title); setSearchOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs hover:bg-[var(--surface-muted)]"><Icon size={16} className="text-[var(--muted)]" /><span className="flex-1">{title}</span><ArrowRight size={13} className="text-[var(--muted)]" /></button>)}</div>
          <div className="flex items-center justify-between border-t border-ui px-4 py-3 text-[9px] text-[var(--muted)]"><span>Navegue pelo Atryon Hub</span><span className="flex items-center gap-1"><Command size={10} /> K para abrir</span></div>
        </motion.div>
      </motion.div>}</AnimatePresence>
    </div>
  );
}
