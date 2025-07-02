export {};

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    SmartPlayer?: {
      instances?: {
        [key: string]: {
          on: (event: string, callback: (data?: any) => void) => void;
          off: (event: string, callback?: (data?: any) => void) => void;
          play: () => void;
          pause: () => void;
          seek: (time: number) => void;
          getCurrentTime: () => number;
          getDuration: () => number;
        };
      };
    };
  }

  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string;
        'data-start-at'?: string;
      };
    }
  }
}
