import * as React from "react";
import { tv } from "tailwind-variants";

import { PaymentIdleView } from "./PaymentIdleView";
import { PaymentLoadingView } from "./PaymentLoadingView";
import { PaymentSuccessView } from "./PaymentSuccessView";
import { PaymentErrorView } from "./PaymentErrorView";
import { PaymentReceiptModal } from "./PaymentReceiptModal";

type PaymentStatus = "idle" | "loading" | "success" | "error";

type PaymentView = {
  label: string;
  description: string;
  amountLabel: string;
  statusText: string;
};

const PAYMENT_CONTENT = {
  title: "Fatura de maio",
  amountValue: "R$ 148,90",
  cardLabel: "Cartão final 1234",
} as const;

const PAYMENT_VIEW: Record<PaymentStatus, PaymentView> = {
  idle: {
    label: "Pagamento pendente",
    description: "Revise os dados antes de confirmar o pagamento.",
    amountLabel: "Total",
    statusText: "Aguardando ação",
  },
  loading: {
    label: "Processando pagamento",
    description: "Estamos validando os dados com a operadora do cartão.",
    amountLabel: "Total",
    statusText: "Em processamento",
  },
  success: {
    label: "Pagamento aprovado",
    description:
      "O pagamento foi confirmado e o comprovante já está disponível.",
    amountLabel: "Pago",
    statusText: "Concluído",
  },
  error: {
    label: "Falha no pagamento",
    description:
      "Não foi possível concluir o pagamento. Revise os dados e tente novamente.",
    amountLabel: "Total",
    statusText: "Erro na transação",
  },
};

const paymentCardStyles = tv({
  variants: {
    status: {
      idle: "border-slate-200 bg-white",
      loading: "border-amber-300 bg-amber-50/70",
      success: "border-emerald-300 bg-emerald-50/70",
      error: "border-red-300 bg-red-50/70",
    },
  },
});

const labelStyles = tv({
  base: "text-xs font-medium uppercase tracking-[0.12em]",
  variants: {
    status: {
      idle: "text-slate-500",
      loading: "text-amber-700",
      success: "text-emerald-700",
      error: "text-red-700",
    },
  },
});

const statusBadgeStyles = tv({
  base: "rounded-full px-2.5 py-1 text-xs font-medium",
  variants: {
    status: {
      idle: "bg-slate-100 text-slate-700",
      loading: "bg-amber-100 text-amber-800",
      success: "bg-emerald-100 text-emerald-800",
      error: "bg-red-100 text-red-800",
    },
  },
});

const indicatorStyles = tv({
  base: "inline-block size-2 rounded-full",
  variants: {
    status: {
      idle: "bg-slate-400",
      loading: "bg-amber-500",
      success: "bg-emerald-500",
      error: "bg-red-500",
    },
  },
});

function PaymentCard({ className = "" }: { className?: string }) {
  const [paymentStatus, setPaymentStatus] =
    React.useState<PaymentStatus>("idle");
  const [isViewingReceipt, setIsViewingReceipt] = React.useState(false);

  const view = PAYMENT_VIEW[paymentStatus];

  const isIdle = paymentStatus === "idle";
  const isLoading = paymentStatus === "loading";
  const isSuccess = paymentStatus === "success";
  const isError = paymentStatus === "error";

  async function handlePay() {
    setPaymentStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setPaymentStatus("success");
    } catch {
      setPaymentStatus("error");
    }
  }

  return (
    <>
      <section
        data-state={paymentStatus}
        className={paymentCardStyles({
          status: paymentStatus,
          class: "w-full max-w-md rounded-2xl border p-5 shadow-sm transition-colors " + className,
        })}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className={labelStyles({ status: paymentStatus })}>
              {view.label}
            </p>

            <h2 className="text-lg font-semibold text-slate-900">
              {PAYMENT_CONTENT.title}
            </h2>

            <p className="text-sm text-slate-600">{view.description}</p>
          </div>

          <div className={statusBadgeStyles({ status: paymentStatus })}>
            {view.statusText}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-black/5 bg-white/80 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{view.amountLabel}</span>
            <strong className="text-base text-slate-900">
              {PAYMENT_CONTENT.amountValue}
            </strong>
          </div>

          <div className="mt-3 h-px bg-slate-200" />

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
            <span className={indicatorStyles({ status: paymentStatus })} />

            <span>{PAYMENT_CONTENT.cardLabel}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {isIdle && (
            <PaymentIdleView
              onPay={handlePay}
              onSimulateError={() => setPaymentStatus("error")}
            />
          )}

          {isLoading && <PaymentLoadingView />}

          {isSuccess && (
            <PaymentSuccessView
              onReset={() => setPaymentStatus("idle")}
              onOpenReceipt={() => setIsViewingReceipt(true)}
            />
          )}

          {isError && (
            <PaymentErrorView
              onRetry={handlePay}
              onReset={() => setPaymentStatus("idle")}
            />
          )}
        </div>
      </section>

      {isViewingReceipt && (
        <PaymentReceiptModal
          onClose={() => setIsViewingReceipt(false)}
          title={PAYMENT_CONTENT.title}
          amountValue={PAYMENT_CONTENT.amountValue}
          cardLabel={PAYMENT_CONTENT.cardLabel}
        />
      )}
    </>
  );
}

export { PaymentCard };