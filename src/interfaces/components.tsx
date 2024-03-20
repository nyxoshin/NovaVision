/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface ISuspenceCustom {
  children: ReactNode;
  fallback: ReactNode;
  fallbackDelayMs: number;
  fallbackMinDurationMs: number;
}

export interface IFallbackDelayer {
  fallback: ReactNode;
  fallbackDelayMs: number;
  onShowFallback: () => void;
}

export interface IMidFiveCards {
  backGroundImage: string;
  url: string;
  title: string;
  style: string;
}

export interface IBotFiveCards {
  backGroundImage: string;
  url: string;
  title: string;
  title_two: string | null;
  subtext: string | null;
  style: string;
}
