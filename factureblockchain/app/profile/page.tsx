"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
        <main className="w-full">
          <div className="mb-10 rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">⚙️ Gestion de compte</p>
                <h1 className="text-3xl font-black text-white">
                  Profil & Paramètres
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Gérez votre identité, la sécurité et les préférences de
                  notification
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                ← Retour au Dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.8fr_2.2fr]">
            <aside className="space-y-2">
              {[
                { id: "account", label: "Identité", icon: "👤" },
                { id: "security", label: "Sécurité", icon: "🔒" },
                { id: "notifications", label: "Notifications", icon: "🔔" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-orange-500/10 text-orange-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
            </aside>

            <div className="space-y-6">
              {/* Account Tab */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                    <h2 className="mb-6 text-lg font-bold text-white">
                      Informations Personnelles
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.28em] text-slate-400">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          defaultValue="Jean-Paul Mbarga"
                          className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white transition focus:border-orange-400/50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.28em] text-slate-400">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="jean.mbarga@email.com"
                          className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white transition focus:border-orange-400/50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.28em] text-slate-400">
                          NIU (Numéro d'Identité Unique)
                        </label>
                        <input
                          type="text"
                          defaultValue="CMR-YDE-2847391"
                          className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white transition focus:border-orange-400/50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.28em] text-slate-400">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+237 6 XX XXX XXX"
                          className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white transition focus:border-orange-400/50 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase tracking-[0.28em] text-slate-400">
                          Adresse
                        </label>
                        <input
                          type="text"
                          defaultValue="Yaoundé, Cameroon"
                          className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white transition focus:border-orange-400/50 focus:outline-none"
                        />
                      </div>
                    </div>
                    <button className="mt-6 rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400">
                      Enregistrer les modifications
                    </button>
                  </div>

                  <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                    <h2 className="mb-6 text-lg font-bold text-white">
                      Contract & Abonnement
                    </h2>
                    <div className="space-y-4">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                          Opérateur
                        </div>
                        <div className="mt-2 text-lg font-semibold text-white">
                          SOCADEL Cameroon
                        </div>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                          Type d'abonnement
                        </div>
                        <div className="mt-2 text-lg font-semibold text-sky-300">
                          Résidentiel
                        </div>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                          Date d'activation
                        </div>
                        <div className="mt-2 text-lg font-semibold text-slate-100">
                          01 Janvier 2024
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                    <h2 className="mb-6 text-lg font-bold text-white">
                      Authentification à Deux Facteurs (2FA)
                    </h2>
                    <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Vérification par SMS
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Recevez un code SMS lors de la connexion
                        </div>
                      </div>
                      <label className="relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full bg-slate-700 transition">
                        <input
                          type="checkbox"
                          checked={twoFAEnabled}
                          onChange={(e) => setTwoFAEnabled(e.target.checked)}
                          className="peer sr-only"
                        />
                        <span
                          className={`absolute left-1 inline-flex h-6 w-6 transform rounded-full bg-white transition peer-checked:translate-x-6 ${twoFAEnabled ? "bg-orange-400" : ""}`}
                        />
                      </label>
                    </div>
                    {twoFAEnabled && (
                      <div className="mt-4 rounded-3xl border border-orange-500/30 bg-orange-500/10 p-4">
                        <div className="text-sm text-orange-200">
                          ✓ 2FA activé avec succès. Vous recevrez un code SMS
                          lors de votre prochaine connexion.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                    <h2 className="mb-6 text-lg font-bold text-white">
                      Gestion du Mot de Passe
                    </h2>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.28em] text-slate-400 mb-3">
                        Ancien mot de passe
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white transition focus:border-orange-400/50 focus:outline-none"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-xs uppercase tracking-[0.28em] text-slate-400 mb-3">
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white transition focus:border-orange-400/50 focus:outline-none"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-xs uppercase tracking-[0.28em] text-slate-400 mb-3">
                        Confirmer le mot de passe
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white transition focus:border-orange-400/50 focus:outline-none"
                      />
                    </div>
                    <button className="mt-6 rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400">
                      Mettre à jour le mot de passe
                    </button>
                  </div>

                  <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                    <h2 className="mb-6 text-lg font-bold text-white">
                      Sessions Actives
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Navigateur actuel
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            Chrome · Windows · Yaoundé
                          </div>
                        </div>
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Safari
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            iPhone · Inactif depuis 2 jours
                          </div>
                        </div>
                        <button className="text-xs font-semibold text-red-300 hover:text-red-200">
                          Déconnecter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                    <h2 className="mb-6 text-lg font-bold text-white">
                      Préférences de Notification
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Alerte de facturation
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            Vous recevrez une notification à chaque nouvelle
                            facture
                          </div>
                        </div>
                        <label className="relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full bg-slate-700 transition">
                          <input
                            type="checkbox"
                            checked={billingAlerts}
                            onChange={(e) => setBillingAlerts(e.target.checked)}
                            className="peer sr-only"
                          />
                          <span
                            className={`absolute left-1 inline-flex h-6 w-6 transform rounded-full bg-white transition peer-checked:translate-x-6 ${billingAlerts ? "bg-orange-400" : ""}`}
                          />
                        </label>
                      </div>
                      <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Anomalie détectée
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            Alerte immédiate en cas de consommation anormale
                          </div>
                        </div>
                        <label className="relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full bg-slate-700 transition">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="peer sr-only"
                          />
                          <span className="absolute left-1 inline-flex h-6 w-6 transform rounded-full bg-orange-400 transition peer-checked:translate-x-6" />
                        </label>
                      </div>
                      <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Notification de sécurité
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            Alertes sur les activités de sécurité et accès
                          </div>
                        </div>
                        <label className="relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full bg-slate-700 transition">
                          <input
                            type="checkbox"
                            checked={securityAlerts}
                            onChange={(e) =>
                              setSecurityAlerts(e.target.checked)
                            }
                            className="peer sr-only"
                          />
                          <span
                            className={`absolute left-1 inline-flex h-6 w-6 transform rounded-full bg-white transition peer-checked:translate-x-6 ${securityAlerts ? "bg-orange-400" : ""}`}
                          />
                        </label>
                      </div>
                      <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Mise à jour de réclamation
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            Suivi en temps réel du statut de vos réclamations
                          </div>
                        </div>
                        <label className="relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full bg-slate-700 transition">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="peer sr-only"
                          />
                          <span className="absolute left-1 inline-flex h-6 w-6 transform rounded-full bg-orange-400 transition peer-checked:translate-x-6" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                    <h2 className="mb-6 text-lg font-bold text-white">
                      Canaux de Communication
                    </h2>
                    <div className="space-y-3 text-sm text-slate-300">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div className="font-semibold text-white">Email</div>
                        <div className="mt-1 text-xs text-slate-400">
                          jean.mbarga@email.com
                        </div>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <div className="font-semibold text-white">SMS</div>
                        <div className="mt-1 text-xs text-slate-400">
                          +237 6 XX XXX XXX
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
