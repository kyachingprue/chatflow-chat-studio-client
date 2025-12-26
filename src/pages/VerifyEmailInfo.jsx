import { MailCheck } from "lucide-react";

export const VerifyEmailInfo = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
        <MailCheck className="mx-auto text-blue-600 mb-4" size={48} />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Verify your email
        </h2>

        <p className="text-gray-600">
          We have sent a verification link to your email address.
          <br />
          Please check your inbox and click the link to activate your account.
        </p>
      </div>
    </div>
  );
};
