export {};

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }

  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
