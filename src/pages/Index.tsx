import ProjectStatus from "@/components/ProjectStatus";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Your Roof Project</h1>
          <p className="text-secondary max-w-2xl mx-auto">
            Track every step of your roofing project, from initial consultation to completion.
          </p>
        </div>
        <ProjectStatus />
      </div>
    </div>
  );
};

export default Index;