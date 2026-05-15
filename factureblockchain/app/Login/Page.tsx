'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MOCK_USERS = [
  { email: 'abonne@eneo.cm', password: '1234', role: 'abonne' },
  { email: 'admin@eneo.cm', password: 'admin123', role: 'admin' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    )
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0070f3, #00c6ff)',
    }}>
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        width: '360px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#0070f3', fontSize: '1.8rem', margin: 0 }}>
            ⚡ Facturechain
          </h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>
            Gestion des factures ENEO
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee', color: '#c00',
            padding: '0.75rem', borderRadius: '6px',
            marginBottom: '1rem', fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%', padding: '0.75rem',
            marginBottom: '1rem', borderRadius: '6px',
            border: '1px solid #ddd', fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%', padding: '0.75rem',
            marginBottom: '1.5rem', borderRadius: '6px',
            border: '1px solid #ddd', fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: '100%', padding: '0.85rem',
            background: '#0070f3', color: 'white',
            border: 'none', borderRadius: '6px',
            fontSize: '1rem', cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Se connecter
        </button>

        <div style={{
          marginTop: '1.5rem', padding: '1rem',
          background: '#f5f5f5', borderRadius: '6px',
          fontSize: '0.8rem', color: '#666'
        }}>
          <strong>Comptes de test :</strong><br/>
          📧 abonne@eneo.cm / 1234<br/>
          📧 admin@eneo.cm / admin123
        </div>
      </div>
    </div>
  )
}
