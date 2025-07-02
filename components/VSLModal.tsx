"use client";

import { useState, useEffect, useRef } from "react";

// Declaração global movida para global.d.ts para evitar erro de JSX/TS

interface VSLModalProps {
  isOpen: boolean;
  onVideoEnd: () => void;
  onOpenForm?: () => void;
}

export default function VSLModal({ isOpen, onVideoEnd, onOpenForm }: VSLModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const vturbRef = useRef<any>(null);
  const vturbContainerRef = useRef<HTMLDivElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [fiftyPercentTracked, setFiftyPercentTracked] = useState(false);

  useEffect(() => {
    // Adiciona listener para tecla ESC
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        console.log('🔐 ESC pressionado - fechando VSL');
        onVideoEnd();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onVideoEnd]);

  useEffect(() => {
    // Sempre que abrir o modal, garantir que o player VTurb começa do início
    if (isOpen) {
      // Limpa localStorage do VTurb para evitar continuar de onde parou
      try {
        Object.keys(localStorage)
          .filter(k => k.includes('vturb') || k.includes('vsl') || k.includes('converteai'))
          .forEach(k => localStorage.removeItem(k));
      } catch (e) { /* ignore */ }
      
      // Remove o player antigo e cria um novo iframe embed
      setTimeout(() => {
        if (vturbContainerRef.current) {
          // Remove player antigo
          while (vturbContainerRef.current.firstChild) {
            vturbContainerRef.current.removeChild(vturbContainerRef.current.firstChild);
          }
          
          // Cria novo player VTurb (método correto)
          const player = document.createElement('vturb-smartplayer');
          player.id = 'vid-686465f756e58ef04d99705b';
          player.style.display = 'block';
          player.style.margin = '0 auto';
          player.style.width = '100%';
          player.setAttribute('data-start-at', '0');
          vturbContainerRef.current.appendChild(player);
          vturbRef.current = player;
          
          // Remove script antigo se existir
          const oldScript = document.getElementById('vturb-script');
          if (oldScript) oldScript.remove();
          
          // Adiciona script do player
          const script = document.createElement('script');
          script.src = 'https://scripts.converteai.net/373f60ba-0f5e-4a3d-9d10-14b049d4eb9b/players/686465f756e58ef04d99705b/v4/player.js';
          script.async = true;
          script.id = 'vturb-script';
          document.head.appendChild(script);
          
          console.log('✅ Player VTurb criado com sucesso!');
          
          // Monitora o player VTurb após carregamento e adiciona eventos
          const checkVTurbPlayer = () => {
            console.log('🔍 Verificando player VTurb...');
            const vturbPlayer = document.getElementById('vid-686465f756e58ef04d99705b');
            if (vturbPlayer) {
              console.log('✅ Player VTurb encontrado:', vturbPlayer);
              
              // Configurar eventos do VTurb - Múltiplas abordagens
              try {
                setTimeout(() => {
                  console.log('🔧 Configurando eventos VTurb...');
                  
                  // Método 1: API do SmartPlayer
                  if (window.SmartPlayer && window.SmartPlayer.instances) {
                    const instance = window.SmartPlayer.instances['vid-686465f756e58ef04d99705b'];
                    if (instance) {
                      console.log('📡 SmartPlayer API encontrada');
                      instance.on('ended', () => {
                        console.log('🎬 VTurb API: Vídeo terminou!');
                        handleVideoEnd();
                      });
                      
                      instance.on('progress', (data: any) => {
                        console.log('📊 VTurb progress:', data);
                        if (data && data.percent >= 50 && !fiftyPercentTracked) {
                          setFiftyPercentTracked(true);
                          console.log('📊 VTurb API: 50% do vídeo assistido');
                          
                          if (typeof window !== "undefined" && window.fbq) {
                            window.fbq("track", "AddToCart", {
                              content_name: "VSL 50% Watched",
                              value: 50,
                              currency: "BRL"
                            });
                          }
                        }
                      });
                      
                      console.log('✅ Eventos VTurb API configurados');
                    } else {
                      console.log('❌ Instância SmartPlayer não encontrada');
                    }
                  } else {
                    console.log('❌ SmartPlayer API não disponível');
                  }
                  
                  // Método 2: Eventos DOM personalizados do VTurb
                  vturbPlayer.addEventListener('smartplayer:ended', (event) => {
                    console.log('🎬 VTurb DOM: Vídeo terminou!', event);
                    handleVideoEnd();
                  });
                  
                  vturbPlayer.addEventListener('smartplayer:timeupdate', (event: any) => {
                    console.log('⏰ VTurb timeupdate:', event.detail);
                    if (event.detail && event.detail.percent >= 50 && !fiftyPercentTracked) {
                      setFiftyPercentTracked(true);
                      console.log('📊 VTurb DOM: 50% do vídeo assistido');
                    }
                  });
                  
                  // Método 3: Listener global para eventos VTurb
                  const handleVTurbMessage = (event: MessageEvent) => {
                    console.log('📬 VTurb Message recebida:', event.data);
                    if (event.data && typeof event.data === 'object') {
                      if (event.data.type === 'smartplayer:ended' || event.data.event === 'ended') {
                        console.log('🎬 VTurb Message: Vídeo terminou!');
                        handleVideoEnd();
                      }
                      
                      if (event.data.type === 'smartplayer:progress' && event.data.percent >= 50 && !fiftyPercentTracked) {
                        setFiftyPercentTracked(true);
                        console.log('📊 VTurb Message: 50% do vídeo assistido');
                      }
                    }
                  };
                  
                  window.addEventListener('message', handleVTurbMessage);
                  console.log('✅ Listener de mensagens VTurb configurado');
                  
                  // Método 4: Verificação periódica como fallback
                  let checkCount = 0;
                  const intervalCheck = setInterval(() => {
                    checkCount++;
                    console.log(`🔄 Check #${checkCount} - Verificando estado do player...`);
                    
                    // Verifica se passou tempo suficiente (assumindo vídeo de ~10 minutos)
                    if (checkCount > 60) { // 60 * 10s = 10 minutos
                      console.log('⏰ Timeout: Assumindo que vídeo terminou');
                      clearInterval(intervalCheck);
                      handleVideoEnd();
                    }
                  }, 10000); // Verifica a cada 10 segundos
                  
                  // Cleanup function para remover listeners
                  return () => {
                    window.removeEventListener('message', handleVTurbMessage);
                    clearInterval(intervalCheck);
                  };
                  
                }, 3000); // Aguarda 3 segundos para o player carregar completamente
                
              } catch (error) {
                console.error('❌ Erro ao configurar eventos VTurb:', error);
              }
              
            } else {
              console.log('❌ Player VTurb não encontrado, tentando novamente...');
              // Tentar novamente se o player não carregou ainda
              setTimeout(checkVTurbPlayer, 1000);
            }
          };
          
          // Inicia verificação após script carregar
          setTimeout(checkVTurbPlayer, 2000);
        }
      }, 200);
    }
    
    // Dispara pixel do Facebook quando VSL inicia
    if (isOpen && typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: "VSL - Clube Limpa Nome",
        content_category: "Video"
      });
      
      // Pixel adicional para início de visualização
      window.fbq("track", "InitiateCheckout", {
        content_name: "VSL Started"
      });
    }
  }, [isOpen]);

  const handleVideoEnd = () => {
    console.log('🎬 EVENTO: handleVideoEnd chamado!');
    setVideoEnded(true);
    console.log('📞 Chamando onVideoEnd...');
    onVideoEnd();
    console.log('✅ onVideoEnd executado - FormModal deveria abrir agora!');
    // Removido disparo do evento de Lead e CompleteRegistration do término do vídeo
    // O evento de Lead será disparado apenas após o envio do formulário
  };

  const handleTimeUpdate = () => {
    // Função mantida para compatibilidade mas sem ação
    // O tracking de 50% agora é feito pelos eventos do VTurb
  };

  const handleLoadedMetadata = () => {
    // Função mantida para compatibilidade mas sem ação
  };

  // Funções de controle de vídeo removidas pois VTurb gerencia isso internamente
  const handleSeeking = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    // VTurb gerencia seeking internamente
  };

  const handlePause = () => {
    // VTurb gerencia pause internamente
  };

  // Bloqueia clique direito no vídeo
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || seconds < 0) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };



  // Função para entrar em fullscreen (apenas se solicitado pelo usuário)
  const enterFullscreen = () => {
    try {
      const modal = document.querySelector('[data-vsl-modal]');
      if (modal && modal.requestFullscreen) {
        modal.requestFullscreen().catch(error => {
          console.log('Fullscreen não disponível:', error);
        });
      } else if (modal && (modal as any).webkitRequestFullscreen) {
        (modal as any).webkitRequestFullscreen();
      } else if (modal && (modal as any).msRequestFullscreen) {
        (modal as any).msRequestFullscreen();
      }
    } catch (error) {
      console.log('Erro ao tentar fullscreen:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      data-vsl-modal
    >
      {/* Estilo para funcionalidade de delay da Vturb */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .esconder { 
            display: none; 
          }
          .vturb-container {
            position: relative;
            width: 100%;
            height: 400px;
            background: #000;
            border-radius: 8px;
            overflow: hidden;
          }
          .vturb-container iframe {
            border: none !important;
            border-radius: 8px;
          }
        `
      }} />
      <div className="relative w-full max-w-6xl mx-4 h-full flex flex-col justify-center">
        {/* Botão fechar no canto superior direito */}
        <button
          onClick={onVideoEnd}
          className="absolute top-4 right-4 z-30 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition-all duration-300"
          title="Fechar VSL (ESC)"
        >
          ×
        </button>

        {/* Header do modal */}
        <div className="mb-4 text-center relative z-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            🎥 Assista ao Vídeo Completo
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Descubra como limpar seu nome de forma definitiva
          </p>
        </div>

        {/* Container do vídeo com iframe embed da Vturb */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl flex-1 max-h-[70vh] vturb-container">
          <div
            id="vsl-vturb-container"
            className="w-full h-full"
            style={{ minHeight: 400 }}
            ref={vturbContainerRef}
          />
        </div>





      </div>        {/* Instruções principais */}
        <div className="mt-4 text-center relative z-20">
          {videoEnded && (
            <div className="text-green-400 text-lg bg-green-900/20 p-3 rounded-lg">
              ✅ Vídeo concluído! Agora você pode prosseguir.
            </div>
          )}
          
          {/* Botões de teste temporários */}
          <div className="mt-4 space-y-2">
            <button
              onClick={() => {
                console.log('🧪 TESTE: Simulando fim do vídeo e abrindo popup');
                handleVideoEnd();
              }}
              className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm py-2 px-4 rounded transition-all mx-2"
            >
              🧪 TESTAR: Simular Fim do Vídeo
            </button>
            
            <button
              onClick={() => {
                console.log('🧪 TESTE: Forçando abertura do popup diretamente');
                onOpenForm && onOpenForm();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-all mx-2"
            >
              🧪 TESTAR: Forçar Popup
            </button>
          </div>
        </div>

      {/* Botão para fechar (só aparece após vídeo terminar) */}
      {videoEnded && (
        <div className="mt-6 text-center relative z-20 space-y-4">
          {/* CTA principal para abrir formulário */}
          <button
            onClick={() => onOpenForm && onOpenForm()}
            className="bg-[#FF6A00] hover:bg-[#00B5BF] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg shadow-xl"
          >
            🎯 QUERO MINHA OFERTA AGORA!
          </button>
          
          {/* Botão secundário para continuar sem formulário */}
          <div>
            <button
              onClick={onVideoEnd}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 text-sm"
            >
              Continuar navegando →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
