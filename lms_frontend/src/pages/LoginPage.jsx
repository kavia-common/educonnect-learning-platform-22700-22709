import React, { useMemo, useState } from 'react';

// Utility to build API base URL from env without introducing new vars
function useApiBase() {
  // PUBLIC_INTERFACE
  const getApiBase = () => {
    /** Determine the API base URL from existing environment variables in this order:
     * 1) REACT_APP_API_BASE
     * 2) REACT_APP_BACKEND_URL
     * Returns undefined if not provided.
     */
    const base = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL;
    return base ? base.replace(/\/+$/, '') : undefined;
  };
  return useMemo(() => ({ base: getApiBase(), getApiBase }), []);
}

// Basic email check
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Renders the Ocean Professional themed hero with a login modal, with accessible labels and validation. */
  const { base } = useApiBase();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: '' });

  const validate = () => {
    const next = {};
    if (!form.email) next.email = 'Email is required';
    else if (!emailRegex.test(form.email)) next.email = 'Enter a valid email address';
    if (!form.password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ loading: true, message: '' });

    const url = base ? `${base}/auth/login` : undefined;
    const payload = { email: form.email, password: form.password, remember: form.remember };

    try {
      if (url) {
        // Mocked network call; replace with real fetch integration when backend is ready.
        const res = await fakePost(url, payload);
        setStatus({ loading: false, message: `Success: ${res.message}` });
      } else {
        // Fallback stub: log and show success
        // eslint-disable-next-line no-console
        console.log('Login payload (stub):', payload);
        setStatus({ loading: false, message: 'Logged in (stub). Configure REACT_APP_API_BASE or REACT_APP_BACKEND_URL for API.' });
      }
    } catch (err) {
      setStatus({ loading: false, message: 'Login failed. Please try again.' });
    }
  };

  return (
    <main className="hero" role="main">
      {/* Background gradient layers */}
      <div className="hero__bg hero__bg--top-left" aria-hidden="true" />
      <div className="hero__bg hero__bg--top-right" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__container">
        <div className="hero__copy">
          <h1 className="hero__title">Your New AI Assistant</h1>
          <p className="hero__subtitle">Get AI-Generated Data Solutions in Seconds.</p>
          <a className="cta" href="#login">Get Started →</a>
        </div>

        {/* Modal-style login card */}
        <section id="login" className="modal" role="region" aria-label="Login">
          <header className="modal__header">
            <h2 className="modal__title">Welcome back</h2>
            <p className="modal__subtitle">Sign in to continue to your courses</p>
          </header>

          <form className="form" onSubmit={submit} noValidate>
            <div className="form__group">
              <label className="form__label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`input ${errors.email ? 'input--error' : ''}`}
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email && (
                <span id="email-error" className="form__error" role="alert">{errors.email}</span>
              )}
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={`input ${errors.password ? 'input--error' : ''}`}
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                required
              />
              {errors.password && (
                <span id="password-error" className="form__error" role="alert">{errors.password}</span>
              )}
            </div>

            <div className="form__row">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={onChange}
                />
                <span>Remember me</span>
              </label>
              <a className="ec-link" href="#forgot">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={status.loading}
              aria-busy={status.loading}
            >
              {status.loading ? 'Signing in…' : 'Sign in'}
            </button>

            {status.message && (
              <div className="form__status" role="status">
                {status.message}
              </div>
            )}

            <div className="form__divider" role="separator" aria-label="Or continue with" />
            <div className="social">
              <button type="button" className="social__btn" aria-label="Sign in with Google">Google</button>
              <button type="button" className="social__btn" aria-label="Sign in with GitHub">GitHub</button>
            </div>

            <p className="form__alt">
              Don&apos;t have an account? <a className="ec-link" href="#create">Create account</a>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

// Mocked POST for stub; replace with real fetch when API is ready
async function fakePost(url, payload) {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 600));
  // eslint-disable-next-line no-console
  console.log('POST', url, payload);
  return { ok: true, message: 'Authenticated (mock)' };
}
