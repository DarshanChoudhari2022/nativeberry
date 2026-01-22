import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { Loader2, Sprout, Share2, Copy, Trophy, Target, TrendingUp, ShoppingBag } from 'lucide-react';
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

    useEffect(() => {
        fetchData();
    }, []);

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
            calculateStats(data);
            calculateProcurement(data);
        }
        setLoading(false);
    };

    const calculateStats = (allOrders: Order[]) => {
        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
        const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

        const salesMap: Record<string, SalesStat> = {
            'Darshan': { name: 'Darshan', totalKg: 0, totalAmount: 0, orderCount: 0 },
            'Suraj': { name: 'Suraj', totalKg: 0, totalAmount: 0, orderCount: 0 },
            'Sushant': { name: 'Sushant', totalKg: 0, totalAmount: 0, orderCount: 0 },
        };

        allOrders.forEach(order => {
            const orderDate = new Date(order.created_at);
            // We count orders created this week for the leaderboard
            if (isWithinInterval(orderDate, { start: weekStart, end: weekEnd })) {
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

    const generateWhatsAppProcurement = () => {
        const dateStr = format(new Date(), 'dd MMM');
        let message = `*🍓 NATIVE BERRY - PROCUREMENT REQ (${dateStr})*\n`;
        message += `*TO: Rushi Gade*\n`;
        message += `--------------------------\n`;

        let totalKg = 0;
        procurement.forEach(p => {
            message += `📦 *${p.product}*: ${p.totalQty} units (${p.totalWeight.toFixed(1)} kg)\n`;
            totalKg += p.totalWeight;
        });

        message += `--------------------------\n`;
        message += `🚀 *TOTAL WEIGHT: ${totalKg.toFixed(1)} KG*\n\n`;
        message += `Please arrange the supply. Thank you!`;

        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMsg}`, '_blank');
    };

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
                    <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm text-sm border border-white/30">
                        Week: {format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'MMM d')} - {format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'MMM d')}
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
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800 px-1">
                        <Sprout className="h-5 w-5 text-green-600" /> Gade Procurement Requirements
                    </h3>
                    <Button onClick={generateWhatsAppProcurement} className="bg-green-600 hover:bg-green-700 text-white shadow-md">
                        <Share2 className="h-4 w-4 mr-2" /> Share with Gade
                    </Button>
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
                        <li><strong>Friday Evening:</strong> Admin checks the Leaderboard above to confirm total demand.</li>
                        <li><strong>Procurement:</strong> Click "Share with Gade" to send the requirements to the farm.</li>
                        <li><strong>Dispatch:</strong> Once stock arrives, switch to the "Delivery" tab to assign boys.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FarmerOrderSummary;
