"use client";

import { useState } from "react";
import Link from "next/link";
import { login, register } from "@/services/auth.service";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDKpo8Nix2ywNqLcAcSbFXTcIIEZuD8TJVMHsxhrqR_iBidl7qJZSCDi3y-CvgvPG2ifAKniy9M5sDuSyaAAypthoR3Jn6W7vnazEAzbWsV_7JBLA5irfL5koMZpeFG22fX_Xl9qFo3aPRhXRGJ5wpqsSDrRGX6ZXTRQBJv8w-JqrLhVyPY0tVm7LCi4DXA_iQUbta84k5mXcaQmwaf1lODoHn_ejVQ21jV5N5lIGWkm5-yp2u32ZsKEyfbMgam8rziEIwJrF_JxbU";

const googleIcon =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC6BTj4QDXsOV-2qWF5-Qi6mG6BTpABRsCMA550WXkcgZNaa02z3Z3lWQKrkhj-GcYDj4nsZf5LCsw1o8ZQeLJLWZvozKR2bE2PoTWNwp-FJhMH-pUUCKXXLF8sbnu4RohnB9wl0mj_lAM0ICD1CRut5UH2CDqBZP5UVRcu8HqkawQYCJzg_SxYRpDMMroV6grYPRuyBMBfWSQukgF-OXno5L0rNO7ntroaPPIC-s1QuvhkQFOAo6g3bR0_3cQaJUHxgzuqEol-_nE";

function ArrowIcon({ type = "arrow" }) {
  return (
    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {type === "person" ? (
        <>
          <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 20c1.1-3.4 3.1-5 6-5 1.5 0 2.8.4 3.8 1.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 12v8M14 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      ) : (
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function EyeIcon({ hidden }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      {hidden ? (
        <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ) : null}
    </svg>
  );
}

export default function AuthForm({ mode = "login" }) {
  const [activeMode, setActiveMode] = useState(mode);
  const isRegister = activeMode === "register";
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setMessage("");

    if (isRegister && !isStrongPassword(registerForm.password)) {
      setMessage("Password must be at least 8 characters and include lowercase, uppercase, and a number.");
      return;
    }

    setIsSubmitting(true);
    const payload = isRegister ? registerForm : loginForm;

    try {
      const result = isRegister ? await register(payload) : await login(payload);
      window.location.href = result.user.role === "admin" || result.user.role === "staff" ? "/dashboard" : "/account";
    } catch (error) {
      setMessage(error.message);
      setIsSubmitting(false);
    }
  }

  function switchMode(nextMode) {
    setMessage("");
    setActiveMode(nextMode);
  }

  return (
    <main className="flex min-h-screen pt-20">
      <div className="relative hidden overflow-hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 z-10 bg-primary/20" />
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={heroImage}
          alt="Luxurious sun-drenched penthouse suite at The SUITES LLC in Monrovia"
        />
        <div className="absolute bottom-20 left-20 z-20 max-w-md">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary-fixed">The Experience</p>
          <h1 className="mb-6 font-serif text-5xl font-semibold leading-tight text-white">Quiet confidence. Unrivaled luxury.</h1>
          <p className="text-lg leading-relaxed text-white/80">
            Begin your journey into the heart of Liberian hospitality, where every detail is curated for the discerning traveler.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-surface-container-lowest p-8 md:p-20 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              {isRegister ? "Join The Circle" : "Welcome Back"}
            </p>
            <h2 className="mb-4 font-serif text-3xl font-semibold text-primary">
              {isRegister ? "Register with The SUITES" : "Login to The SUITES"}
            </h2>
            <div className="flex gap-8 border-b border-outline-variant/30">
              <button
                className={`pb-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all ${
                  !isRegister ? "border-b border-secondary text-secondary" : "text-outline hover:text-secondary"
                }`}
                type="button"
                onClick={() => switchMode("login")}
              >
                Login
              </button>
              <button
                className={`pb-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all ${
                  isRegister ? "border-b border-secondary text-secondary" : "text-outline hover:text-secondary"
                }`}
                type="button"
                onClick={() => switchMode("register")}
              >
                Register
              </button>
            </div>
          </div>

          <form className="space-y-8 transition-all duration-500" onSubmit={submit}>
            {isRegister ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={registerForm.first_name}
                    onChange={(value) => setRegisterForm({ ...registerForm, first_name: value })}
                  />
                  <Input
                    label="Last Name"
                    value={registerForm.last_name}
                    onChange={(value) => setRegisterForm({ ...registerForm, last_name: value })}
                  />
                </div>
                <Input
                  label="Email Address"
                  type="email"
                  value={registerForm.email}
                  onChange={(value) => setRegisterForm({ ...registerForm, email: value })}
                />
                <Input
                  label="Password"
                  type={showRegisterPassword ? "text" : "password"}
                  minLength={8}
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
                  placeholder="Min. 8 characters"
                  title="Use at least 8 characters with lowercase, uppercase, and a number."
                  value={registerForm.password}
                  onChange={(value) => setRegisterForm({ ...registerForm, password: value })}
                  action={
                    <PasswordToggle
                      shown={showRegisterPassword}
                      onClick={() => setShowRegisterPassword((current) => !current)}
                    />
                  }
                />
                <p className="-mt-4 text-xs leading-relaxed text-on-surface-variant">
                  Password must include at least 8 characters, one uppercase letter, one lowercase letter, and one number.
                </p>
                <Input
                  label="Phone"
                  required={false}
                  value={registerForm.phone}
                  onChange={(value) => setRegisterForm({ ...registerForm, phone: value })}
                />
                <p className="text-xs leading-relaxed text-on-surface-variant">
                  By creating an account, you agree to our{" "}
                  <Link className="text-secondary underline" href="/contact">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link className="text-secondary underline" href="/contact">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="email@example.com"
                  value={loginForm.email}
                  onChange={(value) => setLoginForm({ ...loginForm, email: value })}
                />
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.1em] text-outline">Password</span>
                    <Link className="text-xs text-secondary hover:underline" href="/contact">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      className="field pr-12"
                      placeholder="Password"
                      required
                      type={showLoginPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                    />
                    <PasswordToggle
                      shown={showLoginPassword}
                      onClick={() => setShowLoginPassword((current) => !current)}
                    />
                  </div>
                </div>
                <label className="flex items-center gap-3">
                  <input className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="leading-relaxed text-on-surface-variant">Remember me for 30 days</span>
                </label>
              </div>
            )}

            <button
              className={`group flex w-full items-center justify-between rounded-lg px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all ${
                isRegister ? "bg-secondary hover:bg-secondary/90" : "bg-primary hover:bg-primary-container"
              } disabled:cursor-not-allowed disabled:opacity-70`}
              disabled={isSubmitting}
              type="submit"
            >
              <span>{isSubmitting ? "Please wait..." : isRegister ? "Create Account" : "Continue to Portal"}</span>
              <ArrowIcon type={isRegister ? "person" : "arrow"} />
            </button>

            {message ? <p className="rounded-lg bg-error-container px-4 py-3 text-sm text-on-error-container">{message}</p> : null}

            {!isRegister ? (
              <>
                <div className="flex items-center gap-4 py-4">
                  <div className="h-px flex-1 bg-outline-variant/30" />
                  <span className="text-xs font-medium uppercase text-outline">Or join with</span>
                  <div className="h-px flex-1 bg-outline-variant/30" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-3 rounded-lg border border-outline-variant/50 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-all hover:bg-surface-container"
                    type="button"
                  >
                    <img alt="Google" className="h-4 w-4 opacity-70" src={googleIcon} />
                    Google
                  </button>
                  <button
                    className="flex items-center justify-center gap-3 rounded-lg border border-outline-variant/50 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-all hover:bg-surface-container"
                    type="button"
                  >
                    <span className="text-base">ID</span>
                    Apple ID
                  </button>
                </div>
              </>
            ) : null}
          </form>
        </div>
      </div>
    </main>
  );
}

function Input({ label, value, onChange, required = true, action, ...props }) {
  return (
    <label className="field-shell">
      <span className="label">{label}</span>
      <span className="relative block">
        <input
          className={`field ${action ? "pr-12" : ""}`}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          {...props}
        />
        {action}
      </span>
    </label>
  );
}

function PasswordToggle({ shown, onClick }) {
  return (
    <button
      aria-label={shown ? "Hide password" : "Show password"}
      className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-outline transition-colors hover:text-secondary"
      type="button"
      onClick={onClick}
    >
      <EyeIcon hidden={!shown} />
    </button>
  );
}

function isStrongPassword(password) {
  return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
}
