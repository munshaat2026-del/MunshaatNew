import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider  style={{
    "--sidebar-width": "13rem",
    "--sidebar-width-mobile": "16rem",
  } as React.CSSProperties}>
      <AppSidebar />
      <main className="flex-1 ">
        <header className="sticky top-0 z-20 flex h-14 mb-4 items-center gap-4 border-b border-white/5 bg-[#050505] backdrop-blur-md px-6">
            <div className="flex items-center gap-2">
              <div className="hover:bg-white/5 p-1 rounded-md transition-colors">
                <SidebarTrigger className="text-[#2383c9]  hover:text-[#3aa7f5] hover:font-bold scale-110 hover:bg-[#050505] hover:scale-125" />
              </div>
              <div className="h-4 w-px bg-white/10 mx-2" />
              <nav className="flex items-center space-x-2">
                <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-widest">System</span>
                <span className="text-[10px] font-mono text-gray-400">/</span>
                <span className="text-[10px]  font-bold font-mono text-[#2383c9]/80 uppercase tracking-widest">Dashboard</span>
              </nav>
            </div>

          
            <div className="ml-auto flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1 bg-[#2383c9]/5 border border-[#2383c9]/10 rounded-full">
                  <div className="h-3.5 w-3.5 bg-[#2383c9] rounded-full hidden md:block animate-pulse" />
                  <div className="h-3 w-3 bg-[#2383c9] rounded-full animate-pulse" />
                  <div className="h-2.5 w-2.5 bg-[#2383c9] rounded-full animate-pulse" />
                  <div className="h-2 w-2 bg-[#2383c9] rounded-full animate-pulse" />
                  <div className="h-1.5 w-1.5 bg-[#2383c9] rounded-full animate-pulse" />
               </div>
            </div>
          </header>
      
        <section className="relative z-10 flex-1  animate-in fade-in duration-700"> {children}</section>
       
       
      </main>

    </SidebarProvider>
  )
}