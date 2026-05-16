'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MOCK_USERS = [
  { email: 'abonne@eneo.cm', password: '1234', role: 'abonne' },
  { email: 'admin@eneo.cm', password: 'admin123', role: 'admin' },
]

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard')
    } else {
      setError('Email ou mot de passe incorrect')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '1rem',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '2rem', margin: 0 }}>
          <span style={{ fontWeight: 300 }}>Facture</span>
          <span style={{ color: '#f97316', fontWeight: 700 }}>Chain</span>
        </h1>
        <p style={{ color: '#94a3b8', fontFamily: 'monospace', marginTop: '0.5rem' }}>
          Vérification Blockchain ENEO Cameroon
        </p>
      </div>

      <div style={{
        background: '#1e293b',
        borderRadius: '16px',
        padding: '2rem',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}>
        <div style={{
          display: 'flex',
          background: '#0f172a',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '1.5rem',
        }}>
          {['login', 'register'].map((t) => (
            <button key={t} onClick={() => setTab(t as 'login' | 'register')}
              style={{
                flex: 1, padding: '0.6rem',
                borderRadius: '8px', border: 'none',
                cursor: 'pointer', fontWeight: 600,
                background: tab === t ? '#f97316' : 'transparent',
                color: tab === t ? 'white' : '#64748b',
                transition: 'all 0.2s',
              }}>
              {t === 'login' ? 'Connexion' : 'Inscription'}
            </button>
          ))}
        </div>

        {error && (
          <div style={{
            background: '#450a0a', color: '#fca5a5',
            padding: '0.75rem', borderRadius: '8px',
            marginBottom: '1rem', fontSize: '0.85rem'
          }}>{error}</div>
        )}

        <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Email ou Contrat</label>
        <input type="email" placeholder="nom@exemple.cm"
          value={email} onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%', padding: '0.75rem',
            margin: '0.4rem 0 1rem', borderRadius: '8px',
            border: '1px solid #334155', background: '#0f172a',
            color: 'white', fontSize: '1rem', boxSizing: 'border-box'
          }} />

        <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Mot de passe</label>
        <input type="password" placeholder="••••••••"
          value={password} onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%', padding: '0.75rem',
            margin: '0.4rem 0 0.5rem', borderRadius: '8px',
            border: '1px solid #334155', background: '#0f172a',
            color: 'white', fontSize: '1rem', boxSizing: 'border-box'
          }} />

        <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
          <span style={{ color: '#f97316', fontSize: '0.85rem', cursor: 'pointer' }}>
            Identifiants perdus ?
          </span>
        </div>

        <button onClick={handleLogin} style={{
          width: '100%', padding: '0.85rem',
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          color: 'white', border: 'none', borderRadius: '10px',
          fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
          marginBottom: '1.5rem',
        }}>
          Se connecter →
        </button>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginBottom: '1rem' }}>
          OU EXPLORER
        </div>

        <button onClick={() => router.push('/dashboard')} style={{
          width: '100%', padding: '0.75rem',
          background: 'transparent', color: 'white',
          border: '1px solid #334155', borderRadius: '10px',
          fontSize: '0.95rem', cursor: 'pointer', fontWeight: 600,
        }}>
          🚀 Accéder à la démo
        </button>
      </div>
      <div style={{
  marginTop: '1.5rem',
  padding: '1rem',
  background: 'rgba(249, 115, 22, 0.1)',
  border: '1px solid rgba(249, 115, 22, 0.3)',
  borderRadius: '10px',
  fontSize: '0.8rem',
  color: '#94a3b8',
}}>
  <strong style={{ color: '#f97316' }}>Comptes de test :</strong><br/>
  📧 abonne@eneo.cm / 1234<br/>
  📧 admin@eneo.cm / admin123
</div>
    </div>
  )
}
