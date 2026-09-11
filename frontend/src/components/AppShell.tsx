import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Icon } from './Icon';

const titles: Record<string, string> = {
  '/': 'Início',
  '/remessas': 'Remessas',
  '/usuarios': 'Usuários',
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase() || 'FM';
}

/** Layout autenticado: sidebar FM + topbar + Outlet. */
export function AppShell() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = titles[location.pathname] ?? 'Portal';

  return (
    <div className="app">
      <aside className={`sidebar${menuOpen ? ' open' : ''}`} id="sidebar">
        <div className="sidebar-head">
          <NavLink className="mark" to="/" onClick={() => setMenuOpen(false)}>
            <img src="/assets/fm-mark.png" alt="" />
            <span className="mark-name">
              FM Transportes
              <span>Portal de operações</span>
            </span>
          </NavLink>
        </div>

        <nav className="nav">
          <NavLink
            to="/"
            end
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="home" />
            Início
          </NavLink>
          <NavLink
            to="/remessas"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="truck" />
            Remessas
          </NavLink>
          <NavLink
            to="/usuarios"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="users" />
            Usuários
          </NavLink>

          <p className="nav-group">Em breve</p>
          <span className="nav-item is-locked">
            <Icon name="lock" />
            Manifestos
          </span>
          <span className="nav-item is-locked">
            <Icon name="chart" />
            Indicadores
          </span>
          <span className="nav-item is-locked">
            <Icon name="gear" />
            Automações
          </span>
        </nav>

        <div className="sidebar-foot">
          <div className="user">
            <span className="avatar">{initials(user?.name ?? '')}</span>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">Expedição</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button
            className="btn btn-quiet menu-btn"
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name="menu" size={20} />
          </button>
          <span className="topbar-title">{title}</span>
          <div className="topbar-actions">
            <button type="button" className="btn btn-quiet" onClick={() => void logout()}>
              <Icon name="logout" size={16} />
              Sair
            </button>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
