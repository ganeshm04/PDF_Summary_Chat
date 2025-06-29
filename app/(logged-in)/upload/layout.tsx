const AuthLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <div className="relative mx-auto flex flex-col justify-center items-center max-w-7xl px-4 sm:px-6 lg:px-12 z-0">
        {children}
      </div>
    );
  };
  
  export default AuthLayout;
  