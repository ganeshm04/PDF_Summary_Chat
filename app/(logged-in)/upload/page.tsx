
import UploadForm from '@/components/upload/upload-from';
import { UploadHeader } from '@/components/upload/upload-header';

const Upload = () => {
  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
};

export default Upload;
