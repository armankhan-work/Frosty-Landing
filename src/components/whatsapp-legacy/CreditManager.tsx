'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, TrendingDown, Zap, Activity as ActivityIcon, RefreshCw, ArrowRightLeft, History as HistoryIcon, Loader2, Wallet, Bot
} from 'lucide-react';
import { getToken } from '@/lib/session';
import { formatCreditsAsRupees } from '@/lib/unified-legacy/creditsMoney';

const adminHeaders = async (): Promise<Record<string, string>> => {
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

interface CreditManagerProps {
  feature: {
    id: string;
    name: string;
    allocated_credits: number;
  };
  mainBalance: number;
  onSuccess?: () => void;
}

export default function CreditManager({ feature, mainBalance, onSuccess }: CreditManagerProps) {
  const [amount, setAmount] = useState<string>('');
  const [mode, setMode] = useState<'allocate' | 'reclaim'>('allocate');
  const [isTransferring, setIsTransferring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  const fetchHistory = useCallback(async () => {
    setFetchingHistory(true);
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
      const headers = await adminHeaders();
      const res = await fetch(`${baseUrl}/api/billing/transactions?type=allocations&limit=20`, { 
        headers 
      });
      if (!res.ok) { setFetchingHistory(false); return; }
      const data = await res.json();
      if (data.items) {
        const filtered = data.items.filter((tx: any) => tx.bot_id === feature.id);
        setHistory(filtered);
      }
    } catch (err) {
      console.error('Failed to fetch credit history', err);
    } finally {
      setFetchingHistory(false);
    }
  }, [feature.id]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleTransfer = async () => {
    const num = parseInt(amount);
    if (!num || num <= 0) { setError('Please enter a valid amount'); return; }
    if (mode === 'allocate' && num > mainBalance) { setError('Insufficient balance in main wallet'); return; }
    if (mode === 'reclaim' && num > feature.allocated_credits) { setError('Insufficient balance in bot budget'); return; }

    setIsTransferring(true);
    setError(null);

    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
      const endpoint = mode === 'allocate' ? '/api/wallet/allocate' : '/api/wallet/deallocate';
      const headers = await adminHeaders();
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({ bot_id: feature.id, credits: num })
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.detail?.error || d?.error || 'Transfer failed');
      }

      setAmount('');
      if (onSuccess) onSuccess();
      fetchHistory();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsTransferring(false);
    }
  };

  const maxAmount = mode === 'allocate' ? mainBalance : feature.allocated_credits;
  const amountNum = parseInt(amount) || 0;
  const progressPct = maxAmount > 0 ? Math.min((amountNum / maxAmount) * 100, 100) : 0;

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

      {/* ── 1. Balance Cards ── */}
      <div className="grid grid-cols-2 gap-3">

        {/* Main Wallet */}
        <div className="relative overflow-hidden p-5 rounded-2xl border border-panel-border bg-input-bg group hover:border-[#00BFA640] transition-all cursor-default">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#00BFA6]/05 rounded-full -translate-y-6 translate-x-6 pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl bg-slate-500/10 border border-panel-border flex items-center justify-center">
              <Wallet size={13} className="text-muted" />
            </div>
            <p className="text-muted text-[9px] font-black uppercase tracking-[0.2em]">Main Wallet</p>
          </div>
          <div className="text-[26px] font-black text-foreground leading-none tabular-nums">
            {Math.round(mainBalance).toLocaleString()}
          </div>
          <div className="text-[10px] font-semibold text-muted mt-1">{formatCreditsAsRupees(mainBalance)}</div>
          <div className="text-[9px] font-bold text-muted uppercase tracking-widest mt-1.5 opacity-60">credits available</div>
        </div>

        {/* Bot Balance */}
        <div className="relative overflow-hidden p-5 rounded-2xl border border-[#00BFA630] bg-gradient-to-br from-[#00BFA608] to-[#00d4ff05] group hover:border-[#00BFA6] transition-all cursor-default">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#00BFA6]/10 rounded-full -translate-y-6 translate-x-6 pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl bg-[#00BFA615] border border-[#00BFA630] flex items-center justify-center">
              <Bot size={13} className="text-[#00BFA6]" />
            </div>
            <p className="text-[#00BFA6] text-[9px] font-black uppercase tracking-[0.2em]">{feature.name}</p>
          </div>
          <div className="text-[26px] font-black text-[#00BFA6] leading-none tabular-nums">
            {Math.round(feature.allocated_credits).toLocaleString()}
          </div>
          <div className="text-[10px] font-semibold text-[#00BFA6]/70 mt-1">{formatCreditsAsRupees(feature.allocated_credits)}</div>
          <div className="text-[9px] font-bold text-[#00BFA6]/50 uppercase tracking-widest mt-1.5">credits allocated</div>
        </div>

      </div>

      {/* ── 2. Transfer Panel ── */}
      <div className="rounded-2xl border border-panel-border bg-input-bg overflow-hidden">

        {/* Mode toggle tabs */}
        <div className="flex border-b border-panel-border">
          <button
            onClick={() => { setMode('allocate'); setError(null); }}
            className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all ${
              mode === 'allocate'
                ? 'bg-[#00BFA612] text-[#00BFA6] border-b-2 border-[#00BFA6]'
                : 'text-muted hover:text-foreground hover:bg-panel/50'
            }`}
          >
            <TrendingUp size={13} />
            Allocate to Bot
          </button>
          <div className="w-px bg-panel-border" />
          <button
            onClick={() => { setMode('reclaim'); setError(null); }}
            className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all ${
              mode === 'reclaim'
                ? 'bg-red-500/10 text-red-500 border-b-2 border-red-500'
                : 'text-muted hover:text-foreground hover:bg-panel/50'
            }`}
          >
            <TrendingDown size={13} />
            Reclaim to Main
          </button>
        </div>

        {/* Input area */}
        <div className="p-5 space-y-4">

          {/* Amount Input */}
          <div className="relative group">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
              mode === 'allocate' ? 'text-[#00BFA6]' : 'text-red-500'
            }`}>
              <Zap size={17} />
            </div>
            <input
              type="number"
              value={amount}
              onChange={e => { setAmount(e.target.value); setError(null); }}
              placeholder="Amount to transfer..."
              min={1}
              max={maxAmount}
              className={`w-full bg-panel border rounded-xl px-12 py-3.5 text-foreground font-bold text-base focus:outline-none transition-all placeholder:text-muted placeholder:font-normal border-panel-border focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA620]`}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-muted opacity-40 uppercase tracking-widest">

            </div>
          </div>

          {/* Progress bar */}
          {amountNum > 0 && (
            <div className="space-y-1.5 animate-in slide-in-from-top-1 duration-200">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                <span className="text-muted">Transfer Amount</span>
                <span className={mode === 'allocate' ? 'text-[#00BFA6]' : 'text-red-500'}>
                  {progressPct.toFixed(0)}% of available
                </span>
              </div>
              <div className="text-[10px] font-semibold text-muted text-right">
                {formatCreditsAsRupees(amountNum)}
              </div>
              <div className="h-1.5 bg-panel rounded-full overflow-hidden border border-panel-border">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    mode === 'allocate'
                      ? 'bg-gradient-to-r from-[#00BFA6] to-[#00d4ff]'
                      : 'bg-gradient-to-r from-red-500 to-orange-400'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2.5 animate-in slide-in-from-top-1">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <p className="text-red-500 text-[11px] font-bold">{error}</p>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleTransfer}
            disabled={isTransferring || !amount || amountNum <= 0}
            className={`w-full py-3.5 rounded-xl font-black text-[12px] tracking-widest uppercase shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed ${
              mode === 'allocate'
                ? 'bg-gradient-to-r from-[#00BFA6] to-[#00d4ff] text-white hover:shadow-blue-500/30 hover:shadow-xl btn-glow-blue'
                : 'bg-gradient-to-r from-red-500 to-orange-400 text-white hover:shadow-red-500/30 hover:shadow-xl btn-glow-red'
            }`}
          >
            {isTransferring
              ? <><Loader2 size={16} className="animate-spin" /> Processing...</>
              : <><ArrowRightLeft size={16} /> {mode === 'allocate' ? 'Complete Allocation' : 'Complete Reclamation'}</>
            }
          </button>

        </div>
      </div>

      {/* ── 3. Transaction Log ── */}
      <div>
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-input-bg flex items-center justify-center text-muted border border-panel-border">
              <HistoryIcon size={12} />
            </div>
            <h3 className="text-muted text-[9px] font-black uppercase tracking-[0.2em]">Usage Audit</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchHistory} className="text-muted hover:text-foreground transition-colors">
              <RefreshCw size={11} className={fetchingHistory ? 'animate-spin' : ''} />
            </button>
            <span className="text-[9px] font-black text-muted opacity-40 uppercase tracking-widest">Verified Activity</span>
          </div>
        </div>

        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
          {fetchingHistory ? (
            <div className="flex justify-center py-8">
              <RefreshCw size={16} className="text-muted animate-spin" />
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-10 bg-input-bg rounded-2xl border border-dashed border-panel-border">
              <ActivityIcon size={20} className="text-muted opacity-30 mx-auto mb-2" />
              <div className="text-muted opacity-40 uppercase text-[9px] font-black tracking-[0.3em]">No activity found</div>
            </div>
          ) : (
            history.map((tx, i) => (
              <div
                key={tx.id || i}
                className="flex items-center justify-between p-3.5 rounded-xl bg-input-bg border border-panel-border hover:border-[#00BFA640] transition-colors animate-in slide-in-from-left-2 duration-300"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    tx.credits < 0
                      ? 'bg-red-500/10 text-red-500 border-red-500/20'
                      : 'bg-blue-500/10 text-[#00BFA6] border-blue-500/20'
                  }`}>
                    {tx.credits < 0 ? <TrendingDown size={13} /> : <TrendingUp size={13} />}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-foreground leading-tight">
                      {tx.transaction_type === 'allocation' ? 'Allocated to bot' : tx.transaction_type === 'deallocation' ? 'Reclaimed from bot' : tx.transaction_type}
                    </div>
                    <div className="text-[9px] font-bold text-muted uppercase mt-1 opacity-50">
                      {new Date(tx.created_at).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                      {' · '}
                      {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-black tabular-nums ${tx.credits > 0 ? 'text-[#00BFA6]' : 'text-red-500'}`}>
                    {tx.credits > 0 ? '+' : ''}{Math.round(tx.credits).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
