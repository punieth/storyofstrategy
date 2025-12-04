// Defines the core data structures for the payment simulation.
// This file defines the data structures used throughout the application.

export type CaptureMode = 'auto' | 'manual';
export type PayoutSchedule = 'T+2' | 'T+7' | 'instant';
export type RefundPolicy = 'instant' | 'after_payout';
export type ScenarioType = 'normal_payment' | 'refund' | 'auth_capture_fail' | 'chargeback' | 'chargeback_win' | 'chargeback_loss' | 'partial_refund';
export type CoreScenarioType = 'normal_payment' | 'refund' | 'auth_capture_fail';

export interface Levers {
  captureMode: CaptureMode;
  payoutSchedule: PayoutSchedule;
  refundPolicy: RefundPolicy;
}

export interface ActorBalances {
  customerCash: number;
  customerHold: number;
  gatewayCash: number;
  gatewayMerchantLiability: number;
  gatewayFees: number;
  merchantCash: number;
}

export interface ScenarioStep {
  label: string;
  day: number;
  balances: ActorBalances;
  explanation: string;
}
