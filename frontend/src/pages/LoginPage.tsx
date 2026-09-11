import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

/** Login — sem credenciais pré-preenchidas. */
export function LoginPage() {
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
    } catch {
      setError('E-mail ou senha não conferem. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth">
      <div className="auth-box">
        <div className="auth-brand">
          <img src="/assets/fm-logo.png" alt="FM Transportes" />
        </div>

        <form className="auth-card" onSubmit={onSubmit} noValidate>
          <div>
            <h1 className="auth-title">Entrar no portal</h1>
            <p className="auth-sub">Use suas credenciais da FM Transportes.</p>
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              placeholder="nome@fmtransportes.com"
              autoComplete="username"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="senha">Senha</label>
            <input
              className="input"
              id="senha"
              type="password"
              name="senha"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              minLength={6}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            {error ? <p className="field-error">{error}</p> : null}
          </div>

          <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={submitting}>
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>

          <p style={{ textAlign: 'center' }}>
            <a className="link" href="#" onClick={(ev) => ev.preventDefault()}>
              Esqueci minha senha
            </a>
          </p>
        </form>

        <p className="auth-foot">Portal interno · Prottus</p>
      </div>
    </main>
  );
}
