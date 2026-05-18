import * as React from "react";

interface PaymentErrorViewProps {
  onRetry: () => void;
  onReset: () => void;
}

function PaymentErrorView({ onRetry, onReset }: PaymentErrorViewProps) {
  return (
    <>
      <button
        onClick={onRetry}
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Tentar novamente
      </button>

      <button
        onClick={onReset}
        className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-800 transition hover:bg-red-50"
      >
        Revisar dados
      </button>
    </>
  );
}

export { PaymentErrorView };