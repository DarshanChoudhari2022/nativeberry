
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Loader2, IndianRupee, Share2, CheckCircle, UserPlus, MoreHorizontal } from 'lucide-react';
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
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('status', 'Delivered')
            .eq('payment_status', 'Pending')
            .order('delivery_date', { ascending: true });

        if (error) {
            console.error('Error:', error);
            toast.error("Failed to fetch pending payments");
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
            console.error("Assign Error:", error);
            toast.error("Assignment failed. Check permissions.");
        } else {
            toast.success(`Assigned to ${name}`);
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, recovery_assigned_to: name } : o));
        }
    };

    const markPaid = async (orderId: number) => {
        if (!confirm("Confirm payment received?")) return;

        const { error } = await supabase
            .from('orders')
            .update({ payment_status: 'Paid' })
            .eq('id', orderId);

        if (error) {
            toast.error("Update failed");
        } else {
            toast.success("Payment Recorded!");
            // Remove from list immediately
            setOrders(prev => prev.filter(o => o.id !== orderId));
        }
    };

    const shareList = (person: string) => {
        const myOrders = orders.filter(o => o.recovery_assigned_to === person);
        if (myOrders.length === 0) {
            toast.warning(`No orders assigned to ${person}`);
            return;
        }

        let msg = `*💰 Recovery List: ${person}*\n\n`;
        let total = 0;

        myOrders.forEach((o, i) => {
            msg += `*${i + 1}. ${o.customer_name}* (₹${o.total_amount})\n`;
            msg += `   📍 ${o.customer_address}\n`;
            if (o.customer_phone) msg += `   📞 ${o.customer_phone}\n`;
            msg += `\n`;
            total += o.total_amount;
        });

        msg += `*Total Pending: ₹${total.toLocaleString()}*`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const assignedDarshan = orders.filter(o => o.recovery_assigned_to === 'Darshan');
    const assignedSuraj = orders.filter(o => o.recovery_assigned_to === 'Suraj');
    const assignedSushant = orders.filter(o => o.recovery_assigned_to === 'Sushant');
    const unassigned = orders.filter(o => !o.recovery_assigned_to);

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    const RecoveryTable = ({ data, showAssign = true }: { data: RecoveryOrder[], showAssign?: boolean }) => (
        <div className="rounded-md border bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="hidden md:table-cell">Address</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center h-16 text-gray-500">
                                No pending payments here.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <div className="font-medium">{order.customer_name}</div>
                                    <div className="text-xs text-gray-500 md:hidden">{order.customer_address}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200">
                                        ₹{order.total_amount}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-sm text-gray-500 max-w-[200px] truncate" title={order.customer_address}>
                                    {order.customer_address}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {showAssign && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <UserPlus className="h-4 w-4 text-blue-600" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => assignRecovery(order.id, 'Darshan')}>Assign Darshan</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => assignRecovery(order.id, 'Suraj')}>Assign Suraj</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => assignRecovery(order.id, 'Sushant')}>Assign Sushant</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                        <Button
                                            size="sm"
                                            className="h-8 bg-green-600 hover:bg-green-700 text-white"
                                            onClick={() => markPaid(order.id)}
                                        >
                                            Paid
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-red-50 border-red-100 col-span-2 md:col-span-1">
                    <CardHeader className="p-3 pb-0"><CardTitle className="text-xs text-red-700 uppercase">Total Pending</CardTitle></CardHeader>
                    <CardContent className="p-3">
                        <div className="text-2xl font-bold text-red-600">₹{orders.reduce((sum, o) => sum + o.total_amount, 0).toLocaleString()}</div>
                    </CardContent>
                </Card>
                {[
                    { name: 'Darshan', list: assignedDarshan, color: 'blue' },
                    { name: 'Suraj', list: assignedSuraj, color: 'indigo' },
                    { name: 'Sushant', list: assignedSushant, color: 'violet' }
                ].map(agent => (
                    <Card key={agent.name} className="col-span-2 md:col-span-1 relative hover:shadow-md transition-all">
                        <CardHeader className="p-3 pb-0 flex flex-row justify-between items-center space-y-0">
                            <CardTitle className="text-xs text-gray-500 uppercase">{agent.name}</CardTitle>
                            {agent.list.length > 0 && (
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => shareList(agent.name)}>
                                    <Share2 className="h-3 w-3 text-green-600" />
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="p-3">
                            <div className="text-xl font-bold text-gray-900">{agent.list.length} <span className="text-xs font-normal text-gray-500">orders</span></div>
                            <div className="text-xs font-medium text-red-500">₹{agent.list.reduce((s, o) => s + o.total_amount, 0).toLocaleString()} pending</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Col: Unassigned */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <Badge variant="outline" className="bg-gray-100 border-gray-300 text-gray-700">{unassigned.length}</Badge> Unassigned Limit
                    </h3>
                    <RecoveryTable data={unassigned} showAssign={true} />
                </div>

                {/* Right Col: Assigned & Active */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">{orders.length - unassigned.length}</Badge> In Recovery
                    </h3>
                    <div className="space-y-4">
                        {assignedDarshan.length > 0 && (
                            <div>
                                <div className="text-xs font-bold text-gray-400 mb-1 uppercase pl-1">Darshan</div>
                                <RecoveryTable data={assignedDarshan} showAssign={false} />
                            </div>
                        )}
                        {assignedSuraj.length > 0 && (
                            <div>
                                <div className="text-xs font-bold text-gray-400 mb-1 uppercase pl-1">Suraj</div>
                                <RecoveryTable data={assignedSuraj} showAssign={false} />
                            </div>
                        )}
                        {assignedSushant.length > 0 && (
                            <div>
                                <div className="text-xs font-bold text-gray-400 mb-1 uppercase pl-1">Sushant</div>
                                <RecoveryTable data={assignedSushant} showAssign={false} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
