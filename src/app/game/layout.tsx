

export default function gameLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <div className="flex flex-col max-w-screen w-full min-h-screen pt-9 px-12 pb-20 sm:px-20">
            <h1 className="font-silkscreen text-5xl sm:text-7xl text-center">speed io</h1>
            {children}
        </div>
    );
}