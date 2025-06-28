"use client";

import { useState, useEffect, useRef } from "react";

interface VSLModalProps {
  isOpen: boolean;
  onVideoEnd: () => void;
  onOpenForm?: () => void;
}

export default function VSLModal({ isOpen, onVideoEnd, onOpenForm }: VSLModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fiftyPercentTracked, setFiftyPercentTracked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Força o vídeo a tocar quando o modal abre
      const playVideo = async () => {
        try {
          await videoRef.current!.play();
          console.log('Vídeo iniciado com sucesso');
        } catch (error) {
          console.error('Erro ao iniciar vídeo:', error);
        }
      };
      
      playVideo();
      
      // REMOVIDO: Tentativa automática de fullscreen que causava erro
      // Fullscreen só funciona com interação do usuário
      
      // Dispara pixel do Facebook quando VSL inicia
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "ViewContent", {
          content_name: "VSL - Clube Limpa Nome",
          content_category: "Video"
        });
        
        // Pixel adicional para início de visualização
        window.fbq("track", "InitiateCheckout", {
          content_name: "VSL Started"
        });
      }
    }
  }, [isOpen]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onVideoEnd();
    
    // Dispara pixel de conversão quando vídeo termina
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "VSL Completed"
      });
      
      // Pixel de conversão principal
      window.fbq("track", "CompleteRegistration", {
        content_name: "Ready to Convert"
      });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      
      setCurrentTime(current);
      
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
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Bloqueia tentativas de pular o vídeo
  const handleSeeking = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!videoEnded) {
      e.preventDefault();
      if (videoRef.current) {
        // Em vez de forçar voltar, permite avançar mas não retroceder
        const target = e.currentTarget;
        if (target.currentTime < currentTime) {
          target.currentTime = currentTime;
        }
      }
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
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = !video.muted;
      setIsMuted(video.muted);
      
      // Se ativar som, garantir que vídeo continue reproduzindo
      if (!video.muted) {
        if (video.paused) {
          video.play().catch(console.error);
        }
        console.log('Som ativado com sucesso!');
      } else {
        console.log('Som desativado');
      }
    }
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

        {/* Container do vídeo */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl flex-1 max-h-[70vh]">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted={isMuted}
            onEnded={handleVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onSeeking={handleSeeking}
            onPause={handlePause}
            onContextMenu={handleContextMenu}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            poster="/images/homem-preocupado.png"
            style={{
              WebkitAppearance: 'none',
            }}
          >
            <source src="/videos/vsl-clube-v2.mp4" type="video/mp4" />
            Seu navegador não suporta o vídeo.
          </video>

          {/* Controles customizados */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-30">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
                  {videoEnded ? "✓" : "▶️"}
                </div>
                <span className="text-sm">
                  {videoEnded ? "Vídeo concluído!" : "Reproduzindo..."}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>
            
            {/* Barra de progresso */}
            <div className="w-full bg-white/20 rounded-full h-2 mt-3">
              <div 
                className="bg-[#00B5BF] h-2 rounded-full transition-all duration-300"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Botão de som FIXO - posicionamento absoluto independente */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={toggleMute}
              className="w-20 h-20 flex items-center justify-center bg-[#00B5BF] hover:bg-[#FF6A00] rounded-full transition-all duration-200 shadow-2xl border-4 border-white"
              title={isMuted ? "🔊 CLIQUE AQUI PARA ATIVAR O SOM" : "🔇 Desativar som"}  
              type="button"
              data-mute-button
              style={{ 
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 99999,
                pointerEvents: 'all'
              }}
            >
              <span className="text-3xl">{isMuted ? "🔇" : "🔊"}</span>
            </button>
          </div>

          {/* Overlay que previne cliques no vídeo (mas não no botão de som) */}
          <div 
            className="absolute inset-0 bg-transparent z-10"
            onClick={(e) => {
              // Previne cliques apenas se não for no botão de som
              const target = e.target as HTMLElement;
              if (!target.closest('[data-mute-button]')) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            style={{ 
              pointerEvents: 'auto',
              // Cria um "buraco" visual para o botão de som
              clipPath: 'polygon(0% 0%, 0% 100%, calc(100% - 120px) 100%, calc(100% - 120px) 0%, calc(100% - 120px) 120px, 100% 120px, 100% 0%)'
            }}
          />
        </div>

        {/* Instruções - posicionamento fixo no topo */}
        <div className="absolute top-20 left-0 right-0 z-40 px-4">
          {isMuted && !videoEnded && (
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-yellow-300 text-lg mb-3 flex items-center justify-center space-x-2 bg-red-900/80 p-4 rounded-lg animate-pulse border-2 border-red-500/50 backdrop-blur-sm">
                <span className="text-3xl animate-bounce">🔇</span>
                <span className="font-bold text-xl">CLIQUE NO BOTÃO AZUL NO CANTO SUPERIOR DIREITO PARA ATIVAR O SOM</span>
                <span className="text-3xl animate-bounce">👆</span>
              </div>
            </div>
          )}
          {!isMuted && !videoEnded && (
            <div className="mx-auto max-w-lg text-center">
              <div className="text-green-400 text-lg mb-2 bg-green-900/80 p-3 rounded-lg backdrop-blur-sm">
                ✅ Som ativado! Continue assistindo...
              </div>
            </div>
          )}
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

      {/* CSS adicional para bloquear controles */}
      <style jsx>{`
        video::-webkit-media-controls {
          display: none !important;
        }
        video::-webkit-media-controls-panel {
          display: none !important;
        }
        video::-webkit-media-controls-play-button {
          display: none !important;
        }
        video::-webkit-media-controls-start-playback-button {
          display: none !important;
        }
        video::-moz-media-controls {
          display: none !important;
        }
        video::-ms-media-controls {
          display: none !important;
        }
        
        /* Garante que o botão de som seja sempre clicável */
        [data-mute-button] {
          pointer-events: all !important;
          position: relative !important;
          z-index: 99999 !important;
        }
      `}</style>
    </div>
  );
}
