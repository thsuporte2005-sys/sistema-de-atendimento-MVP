"use client"

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Smartphone, QrCode, Settings, List, RefreshCw, PowerOff } from 'lucide-react';

export default function WhatsAppPage() {
  const [activeTab, setActiveTab] = useState<'conexao' | 'config' | 'logs'>('conexao');
  const [status, setStatus] = useState('disconnected'); // connected, connecting, disconnected

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b px-8 py-4 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Smartphone className="text-primary" />
            WhatsApp
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Gerencie a conexão e integração com o WhatsApp</p>
        </header>

        <div className="p-8">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button 
              className={`px-4 py-2 font-medium flex items-center gap-2 border-b-2 ${activeTab === 'conexao' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('conexao')}
            >
              <QrCode size={18} /> Conexão
            </button>
            <button 
              className={`px-4 py-2 font-medium flex items-center gap-2 border-b-2 ${activeTab === 'config' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('config')}
            >
              <Settings size={18} /> Configurações
            </button>
            <button 
              className={`px-4 py-2 font-medium flex items-center gap-2 border-b-2 ${activeTab === 'logs' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('logs')}
            >
              <List size={18} /> Logs
            </button>
          </div>

          {/* Tab Content: Conexão */}
          {activeTab === 'conexao' && (
            <div className="bg-card border rounded-xl p-6 max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Status da Conexão</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="font-medium text-foreground">
                      {status === 'connected' ? 'Conectado' : 'Desconectado'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Instância: <strong className="text-foreground">Atendimento01</strong></p>
                  <p className="text-sm text-muted-foreground">Número: <strong className="text-foreground">Não sincronizado</strong></p>
                </div>
              </div>

              <div className="border-t pt-6 flex flex-col items-center justify-center min-h-[300px] bg-slate-50 dark:bg-slate-900 rounded-lg">
                {status === 'disconnected' ? (
                  <div className="text-center space-y-4">
                    <QrCode size={64} className="mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Nenhuma instância conectada via Evolution API.</p>
                    <button className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto">
                      <RefreshCw size={18} /> Gerar QR Code
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Smartphone size={64} className="mx-auto text-green-500" />
                    <p className="text-green-600 font-medium">WhatsApp conectado com sucesso!</p>
                    <button 
                      onClick={() => setStatus('disconnected')}
                      className="px-6 py-2 bg-destructive text-white rounded-md font-medium hover:bg-destructive/90 transition-colors flex items-center gap-2 mx-auto"
                    >
                      <PowerOff size={18} /> Desconectar WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab Content: Config */}
          {activeTab === 'config' && (
            <div className="bg-card border rounded-xl p-6 max-w-2xl space-y-4">
              <h3 className="text-lg font-semibold mb-4">Configuração da API Externa</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Modo de Conexão</label>
                <select className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary">
                  <option value="qr">Evolution API (QR Code / Baileys)</option>
                  <option value="cloud">WhatsApp Cloud API Oficial</option>
                  <option value="zapi">Z-API</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">URL da API</label>
                <input type="text" placeholder="https://api.evolution.suaempresa.com" className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Global API Key</label>
                <input type="password" placeholder="sk-..." className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Webhook URL do Sistema (para receber mensagens)</label>
                <input type="text" readOnly value="https://app.bussinesleads.com/api/whatsapp/webhook" className="w-full bg-muted border rounded-md px-3 py-2 text-sm text-muted-foreground" />
              </div>

              <div className="pt-4 flex gap-3">
                <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90">
                  Salvar Configurações
                </button>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium border hover:bg-secondary/80">
                  Testar Conexão
                </button>
              </div>
            </div>
          )}

          {/* Tab Content: Logs */}
          {activeTab === 'logs' && (
            <div className="bg-card border rounded-xl overflow-hidden">
              <div className="p-4 border-b bg-muted/30">
                <h3 className="text-sm font-semibold text-foreground">Logs de Webhook e Disparos</h3>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Data/Hora</th>
                    <th className="px-4 py-3 font-medium">Evento</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Detalhes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-muted-foreground">17/05/2026 14:30:00</td>
                    <td className="px-4 py-3">messages.upsert</td>
                    <td className="px-4 py-3"><span className="text-green-500 font-medium">200 OK</span></td>
                    <td className="px-4 py-3 text-muted-foreground">Recebido de 5511999...</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-muted-foreground">17/05/2026 14:30:02</td>
                    <td className="px-4 py-3">send.message</td>
                    <td className="px-4 py-3"><span className="text-green-500 font-medium">200 OK</span></td>
                    <td className="px-4 py-3 text-muted-foreground">IA enviou resposta para 5511999...</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-muted-foreground">17/05/2026 14:28:10</td>
                    <td className="px-4 py-3">connection.update</td>
                    <td className="px-4 py-3"><span className="text-destructive font-medium">401 Error</span></td>
                    <td className="px-4 py-3 text-muted-foreground">Falha na autenticação da Evolution API</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
