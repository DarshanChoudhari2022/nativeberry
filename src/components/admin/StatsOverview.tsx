import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, DollarSign, Scale, TrendingUp } from "lucide-react";

interface StatsProps {
    totalOrders: number;
    pendingDeliveries: number;
    pendingPayments: number;
    totalWeight: number;
    totalRevenue: number; // New Prop
}

const StatsOverview = ({ totalOrders, pendingDeliveries, pendingPayments, totalWeight, totalRevenue }: StatsProps) => {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-green-50 to-white border-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-900">Total Revenue</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-700">₹{totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-green-600">Gross Sales</p>
                </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow bg-white text-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Total Orders</CardTitle>
                    <Package className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
                    <p className="text-xs text-gray-500">Lifetime orders</p>
                </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow bg-white text-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Pending Delivery</CardTitle>
                    <Truck className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{pendingDeliveries}</div>
                    <p className="text-xs text-gray-500">Orders in transit/queue</p>
                </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow bg-white text-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Pending Payments</CardTitle>
                    <DollarSign className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">{pendingPayments}</div>
                    <p className="text-xs text-gray-500">Action required</p>
                </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow bg-white text-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Total Weight</CardTitle>
                    <Scale className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{totalWeight.toFixed(1)} kg</div>
                    <p className="text-xs text-gray-500">Berries delivered</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default StatsOverview;
