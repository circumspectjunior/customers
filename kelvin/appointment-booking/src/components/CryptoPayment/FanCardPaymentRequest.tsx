import usePlan from "@/hooks/usePlan";
import { createQR, encodeURL } from "@solana/pay";
//import QRCodeStyling from "@solana/qr-code-styling";
import { Keypair, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import React, { useEffect } from "react";
import "./payment.css";

const FanCardPaymentRequest: React.FC = () => {
  const { selectedPlanPrice } = usePlan();
  //const [qrcodeState, setQrcodeState] = React.useState<QRCodeStyling | null>(null);
  useEffect(() => {
    const generatePaymentRequest = () => {
      const recipient = new PublicKey(
        "3eQ3HhhRtUeqy4zeCndw1H8bnnK37c6A2MA9rq1Fr524"
      ); // Replace with your address
      const amount = new BigNumber(selectedPlanPrice); // Payment amount in SOL
      const reference = Keypair.generate().publicKey;
      const paymentURL = encodeURL({
        recipient,
        amount,
        reference,
        label: "Your Business Name",
        message: "Thank you for your payment!",
      });

      const qrCode = createQR(paymentURL, 256);

      const qrCodeContainer = document.getElementById("qr-code-container");
      if (qrCodeContainer) {
        qrCode.append(qrCodeContainer);
      }
    };
    generatePaymentRequest();
  }, []);

  return (
    <div className="payment-request">
      <h2>Payment Request</h2>
      <p>
        Please use a wallet like coinbase, phantom or other solana supported
        wallet to scan and pay
      </p>
      <div id="qr-code-container"></div>
    </div>
  );
};
export default FanCardPaymentRequest;
