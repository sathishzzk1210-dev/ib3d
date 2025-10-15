import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseWebSocketOptions {
  url?: string;
  autoConnect?: boolean;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const {
    url = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001',
    autoConnect = true,
  } = options;

  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [url, autoConnect]);

  const connect = () => {
    if (socketRef.current?.connected) return;

    socketRef.current = io(url, {
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      setConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setConnected(false);
    });
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setConnected(false);
    }
  };

  const emit = (event: string, data?: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  };

  const on = (event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  const off = (event: string, callback?: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  };

  return {
    socket: socketRef.current,
    connected,
    connect,
    disconnect,
    emit,
    on,
    off,
  };
}

export function useOrderTracking(orderId: string) {
  const { emit, on, off, connected } = useWebSocket();
  const [orderStatus, setOrderStatus] = useState<any>(null);

  useEffect(() => {
    if (connected && orderId) {
      // Join order room
      emit('join-order', { orderId });

      // Listen for status updates
      const handleStatusUpdate = (data: any) => {
        if (data.orderId === orderId) {
          setOrderStatus(data);
        }
      };

      on('order-status', handleStatusUpdate);

      return () => {
        off('order-status', handleStatusUpdate);
        emit('leave-order', { orderId });
      };
    }
  }, [connected, orderId, emit, on, off]);

  return { orderStatus, connected };
}