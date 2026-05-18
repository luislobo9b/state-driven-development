import * as React from "react";

interface PaymentReceiptModalProps {
  onClose: () => void;
  title: string;
  amountValue: string;
  cardLabel: string;
}

function PaymentReceiptModal({
  onClose,
  title,
  amountValue,
  cardLabel,
}: PaymentReceiptModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Comprovante
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Descrição</span>
            <span className="text-slate-900">{title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Valor</span>
            <span className="text-slate-900">{amountValue}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Cartão</span>
            <span className="text-slate-900">{cardLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Data</span>
            <span className="text-slate-900">
              {new Date().toLocaleDateString("pt-BR")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status</span>
            <span className="text-emerald-600 font-medium">Aprovado</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export { PaymentReceiptModal };