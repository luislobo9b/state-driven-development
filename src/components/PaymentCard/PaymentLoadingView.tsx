import * as React from "react";

function PaymentLoadingView() {
  return (
    <div className="flex items-center gap-2 text-sm text-amber-800">
      <span className="size-4 animate-spin rounded-full border-2 border-amber-300 border-t-amber-700" />
      <span>Confirmando pagamento...</span>
    </div>
  );
}

export { PaymentLoadingView };
