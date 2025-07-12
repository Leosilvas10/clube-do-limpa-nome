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
            const vturbPlayer = document.getElementById('vid-686465f756e58ef04d99705b');
            if (vturbPlayer) {
<<<<<<< HEAD
              // Encontra o elemento de vídeo dentro do player VTurb
              const findVideoElement = () => {
                // Procura em diferentes possíveis localizações
                let videoElement = vturbPlayer.querySelector('video');
                
                // Se não encontrou, tenta no shadow DOM
                if (!videoElement && vturbPlayer.shadowRoot) {
                  videoElement = vturbPlayer.shadowRoot.querySelector('video');
                }
                
                // Se ainda não encontrou, procura em iframes
                if (!videoElement) {
                  const iframe = vturbPlayer.querySelector('iframe');
                  if (iframe && iframe.contentDocument) {
                    videoElement = iframe.contentDocument.querySelector('video');
=======
              // Configurar eventos do VTurb - Múltiplas abordagens
              try {
                setTimeout(() => {
                  // Método NOVO: Observer para mudanças no DOM do player
                  const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                      // Verifica se apareceu algum elemento que indica fim do vídeo
                      mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                          const element = node as Element;
                          // Procura por elementos que indicam fim do vídeo no VTurb
                          if (element.textContent?.includes('QUERO') || 
                              element.textContent?.includes('OFERTA') ||
                              element.textContent?.includes('COMPRAR') ||
                              element.className?.includes('ended') ||
                              element.className?.includes('finished')) {
                            handleVideoEnd();
                          }
                        }
                      });
                    });
                  });
                  
                  // Observa mudanças no player VTurb
                  observer.observe(vturbPlayer, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['class', 'style', 'data-ended', 'data-finished']
                  });
                  
                  // Método 1: API do SmartPlayer
                  if (window.SmartPlayer && window.SmartPlayer.instances) {
                    const instance = window.SmartPlayer.instances['vid-686465f756e58ef04d99705b'];
                    if (instance) {
                      instance.on('ended', () => {
                        handleVideoEnd();
                      });
                      
                      instance.on('progress', (data: any) => {
                        if (data && data.percent >= 50 && !fiftyPercentTracked) {
                          setFiftyPercentTracked(true);
                          
                          if (typeof window !== "undefined" && window.fbq) {
                            window.fbq("track", "AddToCart", {
                              content_name: "VSL 50% Watched",
                              value: 50,
                              currency: "BRL"
                            });
                          }
                        }
                      });
                    }
>>>>>>> 32c53fc401c25e50458965ba2878033b28f567f9
                  }
                  
                  // Método 2: Eventos DOM personalizados do VTurb
                  ['smartplayer:ended', 'smartplayer:complete', 'vturb:ended', 'vturb:complete', 'video:ended'].forEach(eventName => {
                    vturbPlayer.addEventListener(eventName, (event) => {
                      handleVideoEnd();
                    });
                  });
                  
                  // Método 3: Listener global para eventos VTurb via PostMessage
                  const handleVTurbMessage = (event: MessageEvent) => {
                    if (event.data && typeof event.data === 'object') {
                      const data = event.data;
                      if (data.type === 'smartplayer:ended' || 
                          data.event === 'ended' || 
                          data.type === 'vturb:ended' ||
                          data.type === 'video:ended' ||
                          data.action === 'ended' ||
                          (data.type === 'smartplayer:progress' && data.percent >= 99)) {
                        handleVideoEnd();
                      }
                      
                      if ((data.type === 'smartplayer:progress' || data.type === 'vturb:progress') && 
                          data.percent >= 50 && !fiftyPercentTracked) {
                        setFiftyPercentTracked(true);
                      }
                    }
                  };
                  
                  window.addEventListener('message', handleVTurbMessage);
                  
                  // Método 4: Polling inteligente - verifica iframe
                  let checkCount = 0;
                  const intervalCheck = setInterval(() => {
                    checkCount++;
                    
                    try {
                      // Verifica o iframe interno do VTurb
                      const iframe = vturbPlayer.querySelector('iframe');
                      if (iframe) {
                        // Tenta verificar se há botões de CTA no iframe (indica fim do vídeo)
                        try {
                          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                          if (iframeDoc) {
                            const buttons = iframeDoc.querySelectorAll('button, .button, [role="button"]');
                            const ctaTexts = ['comprar', 'quero', 'oferta', 'sim', 'aceito', 'continuar'];
                            
                            buttons.forEach(btn => {
                              const text = btn.textContent?.toLowerCase() || '';
                              if (ctaTexts.some(cta => text.includes(cta))) {
                                clearInterval(intervalCheck);
                                handleVideoEnd();
                              }
                            });
                          }
                        } catch (e) {
                          // Cross-origin restriction, normal
                        }
                      }
                      
                      // Se passou muito tempo (assumindo vídeo de ~8 minutos)
                      if (checkCount > 50) { // 50 * 10s = ~8 minutos
                        clearInterval(intervalCheck);
                        handleVideoEnd();
                      }
                      
                    } catch (e) {
                      // Ignore errors
                    }
                  }, 10000); // Verifica a cada 10 segundos
                  
                  // Método 5: Escuta clicks no player (usuário clicando em CTA)
                  vturbPlayer.addEventListener('click', (event) => {
                    const target = event.target as Element;
                    if (target) {
                      const text = target.textContent?.toLowerCase() || '';
                      const ctaTexts = ['comprar', 'quero', 'oferta', 'sim', 'aceito', 'continuar'];
                      if (ctaTexts.some(cta => text.includes(cta))) {
                        handleVideoEnd();
                      }
                    }
                  });
                  
                  // Cleanup function para remover listeners
                  return () => {
                    window.removeEventListener('message', handleVTurbMessage);
                    clearInterval(intervalCheck);
                    observer.disconnect();
                  };
                  
                }, 3000); // Aguarda 3 segundos para o player carregar completamente
                
<<<<<<< HEAD
                // Procura também por elementos com data-* ou class específicas do VTurb
                if (!videoElement) {
                  videoElement = vturbPlayer.querySelector('[data-vturb-video]') || 
                                vturbPlayer.querySelector('.vturb-video') || 
                                vturbPlayer.querySelector('video[src*="vturb"]');
                }
                
                return videoElement;
              };
              
              const videoElement = findVideoElement();
              if (videoElement) {
                videoRef.current = videoElement;
                
                // Remove listeners antigos se existirem
                videoElement.removeEventListener ('timeupdate', handleTimeUpdate);
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
                videoElement.removeEventListener('ended', handleVideoEnd);
                
                // Adiciona event listeners para monitorar progresso
                videoElement.addEventListener('timeupdate', handleTimeUpdate);
                videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
                videoElement.addEventListener('ended', handleVideoEnd);
                
                // Listener adicional para garantir detecção do fim
                videoElement.addEventListener('pause', () => {
                  if (videoElement.ended) {
                    handleVideoEnd();
                  }
                });
                
                // Listener para detectar mudanças no tempo
                videoElement.addEventListener('durationchange', () => {
                  // Duração carregada
                });
                
              } else {
                // Tenta novamente após 500ms se não encontrou o vídeo
                setTimeout(checkVTurbPlayer, 500);
=======
              } catch (error) {
                // Silently handle errors in production
>>>>>>> 32c53fc401c25e50458965ba2878033b28f567f9
              }
              
            } else {
<<<<<<< HEAD
              // Tenta novamente após 500ms se não encontrou o player
              setTimeout(checkVTurbPlayer, 500);
            }
          };
          
          // Inicia a verificação após o script carregar
          setTimeout(checkVTurbPlayer, 1000);
          
          // Também tenta detectar via API do VTurb se disponível
          const checkVTurbAPI = () => {
            if ((window as any).vturb && (window as any).vturb.ready) {
              console.log('🔧 API VTurb detectada');
              (window as any).vturb.onEnd = () => {
                console.log('🎯 Fim do vídeo detectado via API VTurb');
                handleVideoEnd();
              };
            } else {
              setTimeout(checkVTurbAPI, 1000);
            }
          };
          setTimeout(checkVTurbAPI, 2000);
          
          // Observer para detectar mudanças no DOM (caso o player seja inserido dinamicamente)
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.addedNodes.length > 0) {
                const vturbPlayer = document.getElementById('vid-686465f756e58ef04d99705b');
                if (vturbPlayer && !videoRef.current) {
                  checkVTurbPlayer();
                }
              }
            });
          });
          
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
          
          // Escuta eventos globais do VTurb
          const handleVTurbEvents = (event: Event) => {
            if (event.type === 'vturb-ended' || event.type === 'video-ended' || 
                event.type === 'player-ended' || event.type === 'smartplayer-ended') {
              handleVideoEnd();
            }
          };
          
          // Adiciona listeners para vários possíveis eventos do VTurb
          const vTurbEvents = ['vturb-ended', 'video-ended', 'player-ended', 'smartplayer-ended'];
          vTurbEvents.forEach(eventType => {
            window.addEventListener(eventType, handleVTurbEvents);
          });
          
          // Escuta mensagens do player VTurb (caso use postMessage)
          const handlePostMessage = (event: MessageEvent) => {
            if (event.data && typeof event.data === 'object') {
              if (event.data.type === 'video_ended' || 
                  event.data.type === 'vturb_ended' || 
                  event.data.event === 'ended' ||
                  event.data.action === 'ended') {
                handleVideoEnd();
              }
            }
          };
          
          window.addEventListener('message', handlePostMessage);
          
          // Monitor para detectar fim do vídeo
          const endMonitor = setInterval(() => {
            if (videoRef.current && !videoEnded) {
              const current = videoRef.current.currentTime;
              const total = videoRef.current.duration;
              
              // Se chegou ao final (com margem de 1 segundo)
              if (total && current >= total - 1) {
                handleVideoEnd();
                clearInterval(endMonitor);
              }
            }
          }, 1000);
          
          // Cleanup
          return () => {
            clearInterval(endMonitor);
            observer.disconnect();
            // Remove os event listeners globais
            const vTurbEvents = ['vturb-ended', 'video-ended', 'player-ended', 'smartplayer-ended'];
            vTurbEvents.forEach(eventType => {
              window.removeEventListener(eventType, handleVTurbEvents);
            });
            window.removeEventListener('message', handlePostMessage);
          };
=======
              // Tentar novamente se o player não carregou ainda
              setTimeout(checkVTurbPlayer, 1000);
            }
          };
          
          // Inicia verificação após script carregar
          setTimeout(checkVTurbPlayer, 2000);
>>>>>>> 32c53fc401c25e50458965ba2878033b28f567f9
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
    console.log('🎬 handleVideoEnd chamado!');
    if (!videoEnded) {
      setVideoEnded(true);
      console.log('✅ Estado videoEnded atualizado para true');
      console.log('📞 Chamando onVideoEnd...');
      onVideoEnd();
    }
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
