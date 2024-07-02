import { useEffect, useRef } from "react";

export function useServerSendEvent(
  url: string,
  eventHandler: (event: MessageEvent) => void
) {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    eventSourceRef.current = new EventSource(url);
    eventSourceRef.current.onmessage = eventHandler;

    return () => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
  }, [url, eventHandler]);
}
