import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { Loader2, Sprout, Share2, Copy, Trophy, Target, TrendingUp, ShoppingBag, RefreshCcw, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';

interface OrderItem {
    product_type: string;
    quantity: number;
    weight_kg: number;
}

interface Order {
    id: number;
    created_at: string;
    delivery_date: string;
    salesperson: string;
    total_amount: number;
    status: string;
    order_items: OrderItem[];
}

interface SalesStat {
    name: string;
    totalKg: number;
    totalAmount: number;
    orderCount: number;
}

interface ProcurementReq {
    product: string;
    totalQty: number;
    totalWeight: number;
}

const FarmerOrderSummary = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<SalesStat[]>([]);
    const [procurement, setProcurement] = useState<ProcurementReq[]>([]);
    const [weekOffset, setWeekOffset] = useState(0);
    const [showAllActive, setShowAllActive] = useState(false);
    const [buyRate, setBuyRate] = useState<string>('300'); // Default buying rate

    useEffect(() => {
        fetchData();
    }, [weekOffset, showAllActive]);

    const fetchData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    product_type,
                    quantity,
                    weight_kg
                )
            `)
            .neq('status', 'Cancelled');

        if (error) {
            console.error('Error fetching data:', error);
        } else if (data) {
            setOrders(data);
            calculateStats(data, weekOffset, showAllActive);
            calculateProcurement(data);
        }
        setLoading(false);
    };

    const calculateStats = (allOrders: Order[], offset: number, showAll: boolean) => {
        const now = new Date();
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + (offset * 7));

        const weekStart = startOfWeek(targetDate, { weekStartsOn: 1 }); // Monday
        const weekEnd = endOfWeek(targetDate, { weekStartsOn: 1 });

        // Base reset date (only show data from Jan 23 onwards)
        const BASE_RESET_DATE = new Date('2026-01-23T00:00:00+05:30');

        const salesMap: Record<string, SalesStat> = {
            'Darshan': { name: 'Darshan', totalKg: 0, totalAmount: 0, orderCount: 0 },
            'Suraj': { name: 'Suraj', totalKg: 0, totalAmount: 0, orderCount: 0 },
            'Sushant': { name: 'Sushant', totalKg: 0, totalAmount: 0, orderCount: 0 },
        };

        allOrders.forEach(order => {
            const orderDate = new Date(order.created_at);

            let shouldInclude = false;

            if (showAll && offset === 0) {
                // Batch View: Include all orders since BASE_RESET_DATE that aren't cancelled
                shouldInclude = orderDate >= BASE_RESET_DATE;
            } else {
                // Weekly View: Include orders within the target week interval
                shouldInclude = isWithinInterval(orderDate, { start: weekStart, end: weekEnd }) && orderDate >= BASE_RESET_DATE;
            }

            if (shouldInclude) {
                const seller = order.salesperson || 'Other';
                if (!salesMap[seller]) {
                    salesMap[seller] = { name: seller, totalKg: 0, totalAmount: 0, orderCount: 0 };
                }

                salesMap[seller].orderCount += 1;
                salesMap[seller].totalAmount += order.total_amount || 0;
                order.order_items.forEach(item => {
                    salesMap[seller].totalKg += item.weight_kg;
                });
            }
        });

        setStats(Object.values(salesMap).sort((a, b) => b.totalKg - a.totalKg));
    };

    const calculateProcurement = (allOrders: Order[]) => {
        // Procurement is based on orders NOT YET DELIVERED
        const pendingOrders = allOrders.filter(o => o.status !== 'Delivered');
        const procMap: Record<string, ProcurementReq> = {};

        pendingOrders.forEach(order => {
            order.order_items.forEach(item => {
                if (!procMap[item.product_type]) {
                    procMap[item.product_type] = { product: item.product_type, totalQty: 0, totalWeight: 0 };
                }
                procMap[item.product_type].totalQty += item.quantity;
                procMap[item.product_type].totalWeight += item.weight_kg;
            });
        });

        setProcurement(Object.values(procMap));
    };

    // WhatsApp function removed as per request to remove "Share with Gade"
    // and treat this as internal procurement investment tracking.

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-red-500 h-8 w-8" /></div>;

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-xl text-white shadow-lg">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Target className="h-6 w-6" /> Supply Chain Dashboard
                        </h2>
                        <p className="text-red-50 opacity-90">Manage sales performance and procurement requirements.</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg border border-white/30 backdrop-blur-sm">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white/20" onClick={() => { setWeekOffset(prev => prev - 1); setShowAllActive(false); }}>&larr;</Button>
                            <span className="text-xs font-bold text-white min-w-[140px] text-center">
                                {showAllActive ? "Active Batch View" : `${format(startOfWeek(new Date(new Date().getTime() + (weekOffset * 7 * 24 * 60 * 60 * 1000)), { weekStartsOn: 1 }), 'MMM d')} - ${format(endOfWeek(new Date(new Date().getTime() + (weekOffset * 7 * 24 * 60 * 60 * 1000)), { weekStartsOn: 1 }), 'MMM d')}`}
                            </span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white/20" onClick={() => { setWeekOffset(prev => prev + 1); setShowAllActive(false); }}>&rarr;</Button>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    if (window.confirm("Warning: Do you want to refresh all sales and procurement data?")) {
                                        fetchData();
                                    }
                                }}
                                className="bg-yellow-500 hover:bg-yellow-600 border-none text-white gap-2 transition-all shadow-md"
                            >
                                <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                Sync
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => { setShowAllActive(!showAllActive); setWeekOffset(0); }}
                                className={`${showAllActive ? 'bg-green-600 border-none text-white' : 'bg-white/20 text-white border-white/30'} gap-2 transition-all shadow-md`}
                            >
                                {showAllActive ? 'Weekly View' : 'Extend/Batch View'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1. Sales Leaderboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800 px-1">
                        <Trophy className="h-5 w-5 text-yellow-500" /> Weekly Sales Leaderboard
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stats.map((s, idx) => (
                            <Card key={s.name} className={`relative overflow-hidden border-2 transition-all hover:shadow-md ${idx === 0 ? 'border-yellow-200 bg-yellow-50/30' : 'border-slate-100'}`}>
                                {idx === 0 && <div className="absolute top-0 right-0 p-1 bg-yellow-400 text-white rounded-bl-lg"><Trophy className="h-4 w-4" /></div>}
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center text-center space-y-2">
                                        <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-lg">
                                            {s.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{s.name}</h4>
                                            <p className="text-xs text-slate-500">{s.orderCount} Orders this week</p>
                                        </div>
                                        <div className="w-full pt-2 grid grid-cols-2 border-t mt-2">
                                            <div className="text-center border-r">
                                                <p className="text-[10px] uppercase text-slate-400 font-bold">Total KG</p>
                                                <p className="font-bold text-slate-900">{s.totalKg.toFixed(1)}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] uppercase text-slate-400 font-bold">Revenue</p>
                                                <p className="font-bold text-green-600">₹{s.totalAmount.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800 px-1">
                        <TrendingUp className="h-5 w-5 text-blue-500" /> Overall Progress
                    </h3>
                    <Card className="h-full bg-slate-900 text-white overflow-hidden relative">
                        <div className="absolute right-0 bottom-0 opacity-10"><ShoppingBag size={120} /></div>
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div className="space-y-1">
                                <p className="text-slate-400 text-xs font-bold uppercase">Weekly Target Strength</p>
                                <div className="text-4xl font-bold">{stats.reduce((a, b) => a + b.totalKg, 0).toFixed(1)} <span className="text-sm font-normal opacity-60">kg booked</span></div>
                            </div>
                            <div className="mt-8 space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span>Capacity (Example 200kg)</span>
                                        <span>{Math.round((stats.reduce((a, b) => a + b.totalKg, 0) / 200) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-red-500 h-full" style={{ width: `${Math.min((stats.reduce((a, b) => a + b.totalKg, 0) / 200) * 100, 100)}%` }}></div>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-400 italic">"Sales must confirm payments before procurement is drafted."</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* 2. Procurement Requirement */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800 px-1">
                        <IndianRupee className="h-5 w-5 text-green-600" />
                        Procurement Investment & Needs
                    </h3>

                    {/* Investment Calculator */}
                    {procurement.length > 0 && (
                        <div className="flex items-center gap-3 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-green-800">Buy Rate:</span>
                                <div className="relative">
                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">₹</span>
                                    <Input
                                        type="number"
                                        value={buyRate}
                                        onChange={(e) => setBuyRate(e.target.value)}
                                        className="h-8 w-20 pl-5 bg-white text-xs"
                                    />
                                </div>
                            </div>
                            <div className="h-8 w-[1px] bg-green-200"></div>
                            <div className="text-sm font-bold text-green-700">
                                Est. Investment: <span className="text-lg">₹{Math.round(procurement.reduce((acc, curr) => acc + curr.totalWeight, 0) * (parseFloat(buyRate) || 0)).toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {procurement.length === 0 ? (
                        <Card className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 bg-white dashed border">
                            <ShoppingBag className="h-8 w-8 mb-2 opacity-20" />
                            <p>No pending orders to procure.</p>
                        </Card>
                    ) : (
                        procurement.map(p => (
                            <Card key={p.product} className="border-l-4 border-l-green-500 shadow-sm bg-white">
                                <CardHeader className="pb-2">
                                    <CardDescription className="uppercase text-[10px] font-bold tracking-wider">{p.product}</CardDescription>
                                    <CardTitle className="text-2xl font-bold text-slate-900">{p.totalWeight.toFixed(1)} <span className="text-sm font-normal text-slate-500">kg</span></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100">
                                        {p.totalQty} Boxes needed
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            {/* 3. Procurement Workflow Instruction */}
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-start gap-4 shadow-sm">
                <div className="bg-blue-600 text-white p-2 rounded-lg shadow-sm">Step-by-Step</div>
                <div className="text-sm text-blue-900 space-y-2">
                    <p className="font-bold">Follow this business logic:</p>
                    <ul className="list-disc ml-5 space-y-1 opacity-90">
                        <li><strong>Mon-Fri:</strong> Sales team (Darshan, Suraj, Sushant) adds orders continuously.</li>
                        <li><strong>Friday Evening:</strong> Check the "Procurement Investment" section to see total weight & cost.</li>
                        <li><strong>Investment:</strong> Arrange the funds and confirm the purchase with the farm.</li>
                        <li><strong>Dispatch:</strong> Once stock arrives, switch to the "Delivery" tab to assign boys.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FarmerOrderSummary;
