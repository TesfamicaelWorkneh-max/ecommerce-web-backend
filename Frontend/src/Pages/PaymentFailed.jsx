import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { XCircle, ArrowLeft, Home } from "lucide-react";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const txRef = searchParams.get("tx_ref");
  const reason = searchParams.get("reason");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20 dark:border-slate-700/50 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Payment Failed
        </h1>

        <p className="text-slate-600 dark:text-slate-300 mb-6">
          We couldn't process your payment. Please try again or contact support
          if the issue persists.
        </p>

        {(error || reason) && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
            {error && (
              <p className="text-sm text-red-800 dark:text-red-300">
                <span className="font-medium">Error:</span> {error}
              </p>
            )}
            {reason && (
              <p className="text-sm text-red-800 dark:text-red-300">
                <span className="font-medium">Reason:</span> {reason}
              </p>
            )}
            {txRef && (
              <p className="text-sm text-red-800 dark:text-red-300 mt-1">
                <span className="font-medium">Transaction ID:</span> {txRef}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/cart"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Cart
          </Link>

          <Link
            to="/"
            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-red-600 dark:text-red-400 hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
