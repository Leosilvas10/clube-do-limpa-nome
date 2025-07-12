import { useEffect, useRef } from "react";

export default function VTurbPlayer() {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.document.getElementById('vid-687265fd54bc1a7af7bd9d83')) return;
    if (!playerRef.current) return;

    // Cria o elemento custom VTurb
    const el = document.createElement("vturb-smartplayer");
    el.id = "vid-687265fd54bc1a7af7bd9d83";
    el.style.display = "block";
    el.style.margin = "0 auto";
    el.style.width = "100%";
    playerRef.current.appendChild(el);

    // Injeta o script do player (carrega só 1x)
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/373f60ba-0f5e-4a3d-9d10-14b049d4eb9b/players/687265fd54bc1a7af7bd9d83/v4/player.js";
    s.async = true;
    document.head.appendChild(s);

    // Clean-up ao desmontar o componente
    return () => {
      if (playerRef.current) playerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div ref={playerRef} style={{ width: "100%" }} />
  );
}
