
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, IndianRupee, Share2, CheckCircle, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface RecoveryOrder {
    id: number;
    customer_name: string;
    customer_phone: string;
    total_amount: number;
    delivery_date: string;
    recovery_assigned_to: string | null;
    customer_address: string;
}

export default function PaymentRecovery() {
    const [orders, setOrders] = useState<RecoveryOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingPayments();
    }, []);

    const fetchPendingPayments = async () => {
        setLoading(true);
        // Fetch orders that are Delivered but Payment is Pending
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('status', 'Delivered')
            .eq('payment_status', 'Pending')
            .order('delivery_date', { ascending: true });

        if (error) {
            console.error('Error:', error);
        } else {
            setOrders(data || []);
        }
        setLoading(false);
    };

    const assignRecovery = async (orderId: number, name: string) => {
        const { error } = await supabase
            .from('orders')
            .update({ recovery_assigned_to: name })
            .eq('id', orderId);

        if (error) {
            toast.error("Assignment failed");
        } else {
            toast.success(`Assigned to ${name}`);
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, recovery_assigned_to: name } : o));
        }
    };

    const markPaid = async (orderId: number) => {
        if (!confirm("Create Reciept & Mark as PAID?")) return;

        const { error } = await supabase
            .from('orders')
            .update({ payment_status: 'Paid' })
            .eq('id', orderId);

        if (error) {
            toast.error("Update failed");
        } else {
            toast.success("Payment Recorded!");
            fetchPendingPayments(); // Remove from list
        }
    };

    const shareList = (person: string) => {
        const myOrders = orders.filter(o => o.recovery_assigned_to === person);
        if (myOrders.length === 0) {
            toast.error(`No orders assigned to ${person}`);
            return;
        }

        let msg = `*💰 Payment Recovery List (${person})*\n\n`;
        let total = 0;

        myOrders.forEach((o, i) => {
            msg += `*${i + 1}. ${o.customer_name}*\n`;
            msg += `   📍 ${o.customer_address.slice(0, 30)}...\n`;
            msg += `   📞 ${o.customer_phone}\n`;
            msg += `   💵 *₹${o.total_amount}* Pending\n\n`;
            total += o.total_amount;
        });

        msg += `*Total To Collect: ₹${total.toLocaleString()}*`;

        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const assignedDarshan = orders.filter(o => o.recovery_assigned_to === 'Darshan');
    const assignedSuraj = orders.filter(o => o.recovery_assigned_to === 'Suraj');
    const assignedSushant = orders.filter(o => o.recovery_assigned_to === 'Sushant');
    const unassigned = orders.filter(o => !o.recovery_assigned_to);

    if (loading) return <Loader2 className="animate-spin" />;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-red-50 border-red-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-red-900 text-sm">Total Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-700">₹{orders.reduce((sum, o) => sum + o.total_amount, 0).toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">Darshan's List</CardTitle></CardHeader>
                    <CardContent className="flex justify-between items-center">
                        <span className="font-bold">{assignedDarshan.length} orders</span>
                        <Button size="sm" variant="outline" onClick={() => shareList('Darshan')}><Share2 className="w-3 h-3" /></Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">Suraj's List</CardTitle></CardHeader>
                    <CardContent className="flex justify-between items-center">
                        <span className="font-bold">{assignedSuraj.length} orders</span>
                        <Button size="sm" variant="outline" onClick={() => shareList('Suraj')}><Share2 className="w-3 h-3" /></Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">Sushant's List</CardTitle></CardHeader>
                    <CardContent className="flex justify-between items-center">
                        <span className="font-bold">{assignedSushant.length} orders</span>
                        <Button size="sm" variant="outline" onClick={() => shareList('Sushant')}><Share2 className="w-3 h-3" /></Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-t-4 border-t-red-500 shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <IndianRupee className="w-5 h-5 text-red-600" />
                        Pending Payments ({orders.length})
                    </CardTitle>
                    <CardDescription>Assign a person to visit/call the customer for payment.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {orders.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No pending payments! 🎉</p>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-900">{order.customer_name}</span>
                                            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">₹{order.total_amount}</Badge>
                                        </div>
                                        <p className="text-sm text-gray-500">{order.customer_address}</p>
                                        <div className="text-xs text-gray-400">Delivered on: {new Date(order.delivery_date).toLocaleDateString()}</div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full md:w-auto">
                                        <Select
                                            value={order.recovery_assigned_to || ''}
                                            onValueChange={(val) => assignRecovery(order.id, val)}
                                        >
                                            <SelectTrigger className="w-[180px] bg-white">
                                                <SelectValue placeholder="Assign To..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Darshan">Darshan</SelectItem>
                                                <SelectItem value="Suraj">Suraj</SelectItem>
                                                <SelectItem value="Sushant">Sushant</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => markPaid(order.id)}>
                                            <CheckCircle className="w-4 h-4 mr-1" /> Paid
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
