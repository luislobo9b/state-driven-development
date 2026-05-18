import * as React from "react";

interface PaymentIdleViewProps {
  onPay: () => void;
  onSimulateError: () => void;
}

function PaymentIdleView({ onPay, onSimulateError }: PaymentIdleViewProps) {
  return (
    <>
      <button
        onClick={onPay}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Pagar agora
      </button>

      <button
        onClick={onSimulateError}
        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Simular erro
      </button>
    </>
  );
}

export { PaymentIdleView };