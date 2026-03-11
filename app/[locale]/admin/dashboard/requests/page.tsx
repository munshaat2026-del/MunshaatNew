import Link from "next/link";
import { getRequestsCount } from "@/app/server/requests/services";
import {getParkingRequestsCount} from "@/app/server/parkingsRequests/services"
import { Building2, Car, ArrowRight, ClipboardList } from "lucide-react"; 
import { cn } from "@/lib/utils";

async function RequestsPage() {
  const parkingsCount = (await getParkingRequestsCount()).data ?? 0;
  const realEstatesCount = (await getRequestsCount()).data ?? 0;

  const categories = [
    {
      title: "Real Estate Requests",
      description: "Manage store, depot, and office rental requests.",
      count: realEstatesCount,
      href: "/admin/dashboard/requests/real-estate-requests",
      icon: <Building2 className="w-10 h-10 text-[#2383c9]" />,
      color: "bg-blue-50",
      borderColor: "hover:border-blue-400",
    },
    {
      title: "Parking Requests",
      description: "Review requests for parking spots.",
      count: parkingsCount,
      href: "/admin/dashboard/requests/parkings-requests",
      icon: <Car className="w-10 h-10 text-emerald-400" />,
      color: "bg-emerald-50",
      borderColor: "hover:border-emerald-400",
    },
  ];

  return (
    <main className="ml-0 md:ml-6 lg:ml-10 mt-6 p-4 max-w-6xl">
      {/* Header Section */}
      <header className="mb-10 space-y-2">
        <div className="flex items-center gap-3 text-primary">
          <ClipboardList className="w-6 h-6" />
          <span className="text-sm font-bold uppercase tracking-widest">Management</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Inbound Requests
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Welcome back! You have <span className="font-bold text-slate-900">{parkingsCount + realEstatesCount}</span> requests across all categories.
        </p>
      </header>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <Link key={cat.title} href={cat.href} className="group">
            <div className={cn(
              "relative h-full p-8 transition-all duration-300 bg-white border-2 rounded-3xl shadow-sm",
              "group-hover:shadow-xl group-hover:-translate-y-1",
              cat.borderColor
            )}>
              {/* Icon & Count Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className={cn("p-4 rounded-2xl", cat.color)}>
                  {cat.icon}
                </div>
                <div className="text-right">
                  <span className="block text-4xl font-black text-slate-900">
                    {cat.count}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    Requests
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* "Manage" Button indicator */}
              <div className="mt-8 flex items-center text-sm font-bold text-slate-900">
                Manage Requests
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
              
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 -mr-2 -mt-2 w-24 h-24 bg-linear-to-br from-slate-100 to-transparent opacity-50 rounded-full blur-2xl" />
            </div>
          </Link>
        ))}
      </div>

      {/* General Information Footer */}
<footer className="mt-12 p-4 lg:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
  <div className="flex flex-col md:flex-row items-start gap-2 lg:gap-6">
    <div className="p-3 bg-primary/10 rounded-full">
      <ClipboardList className="w-10 h-10 text-primary" />
    </div>
    <div className="flex-1 text-left">
      <h4 className="text-lg font-bold text-slate-900">Request Management Center</h4>
      <p className="text-slate-500 text-xs md:text-base leading-relaxed">
        From this dashboard, you can <strong>see and manage</strong> the entire rental inquiries. 
        Select a category above to view detailed applicant information.
      </p>
    </div>
  </div>
</footer>
    </main>
  );
}

export default RequestsPage;