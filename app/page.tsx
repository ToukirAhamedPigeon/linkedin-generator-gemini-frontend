import GeneratorForm from './components/GeneratorForm';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-800">
      <div className="container mx-auto py-12">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          LinkedIn Post Generator
        </h1>
        <GeneratorForm />
      </div>
    </main>
  );
}
