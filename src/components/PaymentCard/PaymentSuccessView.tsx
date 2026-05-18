import * as React from "react";

interface PaymentSuccessViewProps {
  onReset: () => void;
  onOpenReceipt: () => void;
}

function PaymentSuccessView({ onReset, onOpenReceipt }: PaymentSuccessViewProps) {
  return (
    <>
      <button
        onClick={onReset}
        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        Fazer novo pagamento
      </button>

      <button
        onClick={onOpenReceipt}
        className="rounded-xl border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50"
      >
        Ver comprovante
      </button>
    </>
  );
}

export { PaymentSuccessView };