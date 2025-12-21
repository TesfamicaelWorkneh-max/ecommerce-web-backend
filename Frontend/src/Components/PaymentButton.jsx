import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaymentButton({ total }) {
  const navigate = useNavigate();

  const payNow = async () => {
    try {
      const { data } = await axios.post(
        "/api/payment/init",
        {},
        { withCredentials: true }
      );
      window.location.href = data.checkout_url;
    } catch (error) {
      alert("Payment init failed");
    }
  };

  return (
    <button
      onClick={payNow}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Pay With Chapa
    </button>
  );
}
