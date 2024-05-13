import { CreditCard, DollarSign, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getStockCount } from "@/actions/get-stock-count";
import { formatter } from "@/lib/utils";

interface DashboardPageProps {
    params: {
        storeId: string;
    };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Ini Dashboard" description="Halaman Dashboard" />
            </div>
        </div>
    );
};

export default DashboardPage;
