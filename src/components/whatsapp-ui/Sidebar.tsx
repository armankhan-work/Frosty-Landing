import React, { useState } from 'react';
import { MessageSquare, MoreVertical, CircleDashed, Users, User, Search, PenSquare, X, Send, Calculator, Activity } from 'lucide-react';

export interface Contact {
  id: string;
  name?: string;
  phoneNumber: string;
  lastMessage?: {
    content: string;
    timestamp: string;
    direction: 'inbound' | 'outbound';
  };
  botActive?: boolean;
}

interface SidebarProps {
  contacts: Contact[];
  activeContactId: string | null;
  onSelectContact: (id: string) => void;
  onNewChat: (phone: string, message: string) => Promise<void>;
  onOpenCalculator: () => void;
  onOpenTokens: () => void;
}

export default function Sidebar({ contacts, activeContactId, onSelectContact, onNewChat, onOpenCalculator, onOpenTokens }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const filtered = contacts.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phoneNumber.includes(searchTerm)
  );

  const handleOpenModal = () => {
    setShowNewChatModal(true);
    setSendError('');
    setNewPhone('');
    setNewMessage('');
  };

  const handleCloseModal = () => {
    setShowNewChatModal(false);
    setSendError('');
  };

  const handleNewChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.trim() || !newMessage.trim()) return;
    setSending(true);
    setSendError('');
    try {
      await onNewChat(newPhone.trim(), newMessage.trim());
      setShowNewChatModal(false);
      setNewPhone('');
      setNewMessage('');
    } catch (err: any) {
      const msg = err?.response?.data?.error || err.message || 'Failed to send. Check the number and try again.';
      setSendError(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {showNewChatModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              background: 'var(--panel-bg)',
              borderRadius: '16px',
              padding: '32px 28px 24px',
              width: '380px',
              boxShadow: 'var(--neu-shadow, 0 24px 64px rgba(0,0,0,0.45))',
              border: '1px solid var(--border-strong)',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #00a884, #25d366)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PenSquare size={20} color="#fff" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: 'var(--foreground)' }}>New Chat</h2>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Start a conversation with anyone</p>
              </div>
            </div>

            <form onSubmit={handleNewChatSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#00a884', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 919876543210 (with country code)"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'var(--input-bg)',
                    border: '1.5px solid var(--border-strong)',
                    borderRadius: '10px',
                    padding: '11px 14px',
                    fontSize: '14px',
                    color: 'var(--foreground)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#00a884')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border-strong)')}
                />
                <p style={{ margin: '5px 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>
                  Include country code, no spaces or dashes (India 91 + number)
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#00a884', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  First Message
                </label>
                <textarea
                  placeholder="Type your first message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'var(--input-bg)',
                    border: '1.5px solid var(--border-strong)',
                    borderRadius: '10px',
                    padding: '11px 14px',
                    fontSize: '14px',
                    color: 'var(--foreground)',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#00a884')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border-strong)')}
                />
              </div>

              {sendError && (
                <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#f87171' }}>
                  ⚠️ {sendError}
                </div>
              )}

              <button
                type="submit"
                disabled={sending || !newPhone.trim() || !newMessage.trim()}
                style={{
                  width: '100%',
                  background: sending ? '#1a3a2a' : 'linear-gradient(135deg, #00a884, #25d366)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '13px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: sending || !newPhone.trim() || !newMessage.trim() ? 'not-allowed' : 'pointer',
                  opacity: !newPhone.trim() || !newMessage.trim() ? 0.5 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'opacity 0.2s',
                }}
              >
                {sending ? (
                  <>⏳ Sending...</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={{ 
        width: '320px', 
        minWidth: '320px',
        backgroundColor: 'var(--panel-bg)',
        borderRight: '1px solid var(--border-strong)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10
      }}>
        <div style={{
          height: '59px',
          backgroundColor: 'var(--input-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border-strong)',
          flexShrink: 0
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--foreground)'
          }}>
            <User size={24} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--text-muted)' }}>
            <Users size={20} style={{ cursor: 'pointer', transition: 'color 0.2s' }} />
            <CircleDashed size={20} style={{ cursor: 'pointer', transition: 'color 0.2s' }} />
            
            <button
              onClick={onOpenCalculator}
              title="Billing Calculator"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center', borderRadius: '6px',
              }}
            >
              <Calculator size={20} />
            </button>
            <button
              onClick={onOpenTokens}
              title="API Token Usage & Costs"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center', borderRadius: '6px',
              }}
            >
              <Activity size={20} />
            </button>
            <button
              onClick={handleOpenModal}
              title="Start a new chat"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center', borderRadius: '6px',
              }}
            >
              <PenSquare size={20} />
            </button>
            <MoreVertical size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div style={{ padding: '8px 12px', backgroundColor: 'var(--panel-bg)', borderBottom: '1px solid var(--border-strong)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', backgroundColor: 'var(--input-bg)',
            borderRadius: '8px', padding: '6px 12px', gap: '12px', border: '1px solid var(--border-strong)'
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none', background: 'transparent', width: '100%',
                fontSize: '14px', color: 'var(--foreground)', outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--panel-bg)' }}>
          {filtered.map(contact => {
            const isActive = contact.id === activeContactId;
            const lastMsg = contact.lastMessage;
            const time = lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

            return (
              <div
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
                style={{
                  display: 'flex', padding: '0 12px', cursor: 'pointer',
                  backgroundColor: isActive ? 'var(--input-bg)' : 'transparent',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => !isActive && (e.currentTarget.style.backgroundColor = 'var(--input-bg)')}
                onMouseLeave={e => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ padding: '12px 12px 12px 0', display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-strong)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)'
                  }}>
                    <User size={24} />
                  </div>
                </div>

                <div style={{
                  flex: 1, padding: '12px 0', borderBottom: '1px solid var(--border-strong)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {contact.name && contact.name !== 'Unknown' ? contact.name : contact.phoneNumber}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{time}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      {lastMsg ? (
                        <>
                          {lastMsg.direction === 'outbound' && (
                            <svg viewBox="0 0 16 15" width="16" height="15" style={{ display: 'inline-block', flexShrink: 0 }}>
                              <path fill="#53bdeb" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.74a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l2.294 2.2a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                            </svg>
                          )}
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {lastMsg.content}
                          </span>
                        </>
                      ) : 'No messages yet'}
                    </div>
                    {contact.botActive ? (
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00a884', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginLeft: '6px'
                      }} title="AI Bot Active">
                        🤖
                      </div>
                    ) : (
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--text-muted)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginLeft: '6px'
                      }} title="Manual Mode (Bot Paused)">
                        👤
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
              {searchTerm ? 'No results found' : (
                <div>
                  <p style={{ margin: '0 0 8px' }}>No chats yet</p>
                  <button
                    onClick={handleOpenModal}
                    style={{ background: 'none', border: '1px solid #00a884', borderRadius: '8px', color: '#00a884', padding: '6px 14px', cursor: 'pointer', fontSize: '13px' }}
                  >
                    + Start a new chat
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
