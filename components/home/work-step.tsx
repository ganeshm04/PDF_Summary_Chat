export const WorkStep = ({
    icon: IconComponent,
    title,
    description,
  }: {
    id: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    title: string;
    description: string;
  }) => {
    return (
      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-lg transition-all hover:scale-101 hover:border-2 hover:border-amber-400 hover:bg-amber-50">
        {/* Icon with subtle background color and transition */}
        <div className="flex justify-center items-center bg-amber-100 text-amber-600 rounded-lg h-16 w-16 transition-all hover:bg-amber-200 mb-4">
          <IconComponent className="h-8 w-8" />
        </div>
  
        {/* Title */}
        <h2 className="font-bold text-lg text-amber-600">{title}</h2>
  
        {/* Description */}
        <p className="text-gray-600 mt-3 text-sm">{description}</p>
      </div>
    );
  };
  