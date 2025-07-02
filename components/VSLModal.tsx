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
    // Sempre que abrir o modal, garantir que o player VTurb começa do início
    if (isOpen) {
      // Limpa localStorage do VTurb para evitar continuar de onde parou
      try {
        Object.keys(localStorage)
          .filter(k => k.includes('vturb') || k.includes('vsl') || k.includes('converteai'))
          .forEach(k => localStorage.removeItem(k));
      } catch (e) { /* ignore */ }
      // Remove o player antigo e cria um novo após a limpeza
      setTimeout(() => {
        if (vturbContainerRef.current) {
          // Remove player antigo
          while (vturbContainerRef.current.firstChild) {
            vturbContainerRef.current.removeChild(vturbContainerRef.current.firstChild);
          }
          // Cria novo player
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
          
          // Monitora o player VTurb após carregamento
          const checkVTurbPlayer = () => {
            const vturbPlayer = document.getElementById('vid-686465f756e58ef04d99705b');
            if (vturbPlayer) {
              console.log('Player VTurb encontrado!');
              
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
                  }
                }
                
                return videoElement;
              };
              
              const videoElement = findVideoElement();
              if (videoElement) {
                videoRef.current = videoElement;
                
                console.log('Elemento de vídeo encontrado:', videoElement);
                
                // Adiciona event listeners para monitorar progresso
                videoElement.addEventListener('timeupdate', handleTimeUpdate);
                videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
                videoElement.addEventListener('ended', handleVideoEnd);
                
                console.log('Player VTurb conectado com sucesso!');
              } else {
                console.log('Elemento de vídeo não encontrado, tentando novamente...');
                // Tenta novamente após 500ms se não encontrou o vídeo
                setTimeout(checkVTurbPlayer, 500);
              }
            } else {
              console.log('Player VTurb não encontrado, tentando novamente...');
              // Tenta novamente após 500ms se não encontrou o player
              setTimeout(checkVTurbPlayer, 500);
            }
          };
          
          // Inicia a verificação após o script carregar
          setTimeout(checkVTurbPlayer, 1000);
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
    setVideoEnded(true);
    onVideoEnd();
    // Removido disparo do evento de Lead e CompleteRegistration do término do vídeo
    // O evento de Lead será disparado apenas após o envio do formulário
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      
      // Dispara pixel quando usuário assiste 50% do vídeo
      if (!fiftyPercentTracked && total > 0 && current / total >= 0.5) {
        setFiftyPercentTracked(true);
        
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "AddToCart", {
            content_name: "VSL 50% Watched",
            value: 50,
            currency: "BRL"
          });
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    // Função mantida para compatibilidade mas sem ação
  };

  // Bloqueia tentativas de pular o vídeo - simplificado
  const handleSeeking = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!videoEnded) {
      e.preventDefault();
    }
  };

  // Bloqueia pause
  const handlePause = () => {
    if (videoRef.current && !videoEnded) {
      // Pequeno delay para evitar conflitos
      setTimeout(() => {
        if (videoRef.current && !videoEnded) {
          videoRef.current.play().catch(console.error);
        }
      }, 100);
    }
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
      <div className="relative w-full max-w-6xl mx-4 h-full flex flex-col justify-center">
        {/* Header do modal */}
        <div className="mb-4 text-center relative z-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            🎥 Assista ao Vídeo Completo
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Descubra como limpar seu nome de forma definitiva
          </p>
        </div>

        {/* Container do vídeo substituído pelo player VTurb */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl flex-1 max-h-[70vh]">
          <div
            id="vsl-vturb-container"
            style={{ width: "100%", minHeight: 360 }}
            ref={vturbContainerRef}
          />
        </div>





      </div>



      {/* Instruções principais */}
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
