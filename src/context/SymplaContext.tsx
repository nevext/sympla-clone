"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SEED_EVENTS, SymplaEvent } from "@/data/events";
import { formatShortCode } from "@/lib/format";

export interface CartSelection {
  eventId: string;
  quantities: Record<string, number>;
  reservedUntil: number;
}

export interface AttendeeInfo {
  ticketId: string;
  ticketName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface TicketOrder {
  id: string;
  code: string;
  createdAt: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  paymentMethod: "pix" | "cartao" | "boleto";
  subtotal: number;
  feeTotal: number;
  total: number;
  buyerName: string;
  buyerEmail: string;
  attendees: AttendeeInfo[];
}

export interface UserSession {
  name: string;
  email: string;
}

interface SymplaContextValue {
  events: SymplaEvent[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  cart: CartSelection | null;
  setTicketReservation: (eventId: string, quantities: Record<string, number>) => void;
  clearCart: () => void;
  orders: TicketOrder[];
  completeOrder: (payload: Omit<TicketOrder, "id" | "code" | "createdAt">) => TicketOrder;
  addCustomEvent: (event: SymplaEvent) => void;
  user: UserSession | null;
  loginDemoUser: (name: string, email: string) => void;
  logoutUser: () => void;
}

const SymplaContext = createContext<SymplaContextValue | null>(null);

const STORAGE_KEYS = {
  city: "sympla_clone_city_v1",
  customEvents: "sympla_clone_custom_events_v1",
  cart: "sympla_clone_cart_v1",
  orders: "sympla_clone_orders_v1",
  user: "sympla_clone_user_v1",
};

export function SymplaProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState<string>("Qualquer lugar");
  const [customEvents, setCustomEvents] = useState<SymplaEvent[]>([]);
  const [cart, setCart] = useState<CartSelection | null>(null);
  const [orders, setOrders] = useState<TicketOrder[]>([]);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    try {
      const savedCity = localStorage.getItem(STORAGE_KEYS.city);
      if (savedCity) setSelectedCityState(savedCity);

      const savedCustom = localStorage.getItem(STORAGE_KEYS.customEvents);
      if (savedCustom) setCustomEvents(JSON.parse(savedCustom) as SymplaEvent[]);

      const savedCart = sessionStorage.getItem(STORAGE_KEYS.cart);
      if (savedCart) setCart(JSON.parse(savedCart) as CartSelection);

      const savedOrders = localStorage.getItem(STORAGE_KEYS.orders);
      if (savedOrders) setOrders(JSON.parse(savedOrders) as TicketOrder[]);

      const savedUser = localStorage.getItem(STORAGE_KEYS.user);
      if (savedUser) setUser(JSON.parse(savedUser) as UserSession);
    } catch {
      // Ignora falhas de leitura do storage em ambientes restritos
    }
  }, []);

  const events = useMemo(() => [...customEvents, ...SEED_EVENTS], [customEvents]);

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    try {
      localStorage.setItem(STORAGE_KEYS.city, city);
    } catch {
      // no-op
    }
  };

  const setTicketReservation = (eventId: string, quantities: Record<string, number>) => {
    const cleanQuantities: Record<string, number> = {};
    for (const [k, v] of Object.entries(quantities)) {
      if (v > 0) cleanQuantities[k] = v;
    }
    const nextCart: CartSelection = {
      eventId,
      quantities: cleanQuantities,
      reservedUntil: Date.now() + 15 * 60 * 1000,
    };
    setCart(nextCart);
    try {
      sessionStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(nextCart));
    } catch {
      // no-op
    }
  };

  const clearCart = () => {
    setCart(null);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.cart);
    } catch {
      // no-op
    }
  };

  const completeOrder = (payload: Omit<TicketOrder, "id" | "code" | "createdAt">): TicketOrder => {
    const id = `ord-${Date.now()}`;
    const order: TicketOrder = {
      ...payload,
      id,
      code: formatShortCode(`${id}-${payload.eventId}-${payload.buyerEmail}`),
      createdAt: new Date().toISOString(),
    };
    const nextOrders = [order, ...orders];
    setOrders(nextOrders);
    clearCart();
    try {
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(nextOrders));
    } catch {
      // no-op
    }
    return order;
  };

  const addCustomEvent = (event: SymplaEvent) => {
    const next = [event, ...customEvents];
    setCustomEvents(next);
    try {
      localStorage.setItem(STORAGE_KEYS.customEvents, JSON.stringify(next));
    } catch {
      // no-op
    }
  };

  const loginDemoUser = (name: string, email: string) => {
    const nextUser = { name, email };
    setUser(nextUser);
    try {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser));
    } catch {
      // no-op
    }
  };

  const logoutUser = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.user);
    } catch {
      // no-op
    }
  };

  return (
    <SymplaContext.Provider
      value={{
        events,
        selectedCity,
        setSelectedCity,
        cart,
        setTicketReservation,
        clearCart,
        orders,
        completeOrder,
        addCustomEvent,
        user,
        loginDemoUser,
        logoutUser,
      }}
    >
      {children}
    </SymplaContext.Provider>
  );
}

export function useSympla(): SymplaContextValue {
  const ctx = useContext(SymplaContext);
  if (!ctx) {
    throw new Error("useSympla deve ser utilizado dentro de SymplaProvider");
  }
  return ctx;
}
