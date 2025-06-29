import Link from 'next/link';

export const UpgradeBanner = () => {
  return (
    <div className="w-full mt-6 rounded-xl border border-green-400 bg-green-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base">
      <p className="text-green-800 font-medium mb-2 sm:mb-0">
        🎉 <strong>Unlimited Access</strong> - Upload as many PDFs as you want!
      </p>
      <Link
        href="/upload"
        className="text-green-600 underline hover:text-green-700 font-medium transition"
      >
        Start Uploading
      </Link>
    </div>
  );
};
