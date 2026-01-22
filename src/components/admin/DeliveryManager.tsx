import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2, Truck, MapPin, CheckCircle, Navigation, Phone, Share2, ClipboardList, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface DeliveryOrder {
    id: number;
    customer_name: string;
    customer_address: string;
    customer_phone: string;
    distance_km: number;
    status: string;
    delivery_boy: string | null;
    delivery_date: string;
    payment_status: string;
    total_amount: number;
    order_items?: {
        weight_kg: number;
        quantity: number;
        product_type: string;
    }[];
}

type Language = 'en' | 'mr';

const translations = {
    en: {
        pendingAssignments: "Pending Assignment",
        shareWhatsApp: "Share List",
        outForDelivery: "Out for Delivery",
        shareRunSheet: "Share Run Sheet",
        driver: "Driver",
        amountDue: "Amount Due",
        paid: "Paid",
        pending: "Pending",
        markDelivered: "Mark Delivered",
        assign: "Assign",
        selectDriver: "Select Driver...",
        navigate: "Navigate",
        allAssigned: "All orders have been assigned.",
        noActive: "No active deliveries at the moment.",
        phoneCopied: "Phone number copied!",
        assignedTo: "Assigned to",
        deliveryUpdated: "Order marked Delivered & Paid!",
        waHeader: "Native Berry - Delivery List",
        waPendingHeader: "Native Berry - Pending Assignments",
        waDue: "Due",
        waPaid: "PAID",
        distance: "away"
    },
    mr: {
        pendingAssignments: "बाकी ऑर्डर्स (Pending)",
        shareWhatsApp: "यादी पाठवा (Share)",
        outForDelivery: "वितरणासाठी बाहेर (Out for Delivery)",
        shareRunSheet: "डिलिव्हरी यादी पाठवा (Run Sheet)",
        driver: "ड्रायव्हर",
        amountDue: "येणे बाकी (Amount Due)",
        paid: "जमा (Paid)",
        pending: "बाकी (Pending)",
        markDelivered: "पोहोचले (Mark Delivered)",
        assign: "नेमा (Assign)",
        selectDriver: "ड्रायव्हर निवडा...",
        navigate: "पत्ता (Map)",
        allAssigned: "सर्व ऑर्डर्सना ड्रायव्हर दिले आहेत.",
        noActive: "सध्या कोणतीही डिलिव्हरी चालू नाही.",
        phoneCopied: "फोन नंबर कॉपी केला!",
        assignedTo: "यांना नेमले:",
        deliveryUpdated: "ऑर्डर पूर्ण झाली (Delivered)!",
        waHeader: "नेटिव्ह बेरी - डिलिव्हरी यादी",
        waPendingHeader: "नेटिव्ह बेरी - बाकी ऑर्डर्स",
        waDue: "बाकी",
        waPaid: "जमा (Paid)",
        distance: "लांब"
    }
};

const DeliveryManager = () => {
    const [orders, setOrders] = useState<DeliveryOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState<Language>('en');
    const [deliveryData, setDeliveryData] = useState<Record<number, { bikeUsed: boolean, travelCharge: string, comments: string, receivedBy?: string }>>({});

    const t = translations[lang];

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    weight_kg,
                    quantity,
                    product_type
                )
            `)
            .neq('status', 'Cancelled')
            // .neq('status', 'Delivered') // FETCH DELIVERED TOO for history
            .order('delivery_date', { ascending: true });

        if (error) {
            console.error('Error:', error);
        } else {
            console.log("Orders with items:", data);
            setOrders(data || []);
        }
        setLoading(false);
    };

    const assignDriver = async (orderId: number, driverName: string) => {
        const { error } = await supabase
            .from('orders')
            .update({
                delivery_boy: driverName,
                status: 'Out for Delivery'
            })
            .eq('id', orderId);

        if (error) {
            toast.error("Failed to assign driver");
        } else {
            toast.success(`${t.assignedTo} ${driverName}`);
            fetchDeliveries();
        }
    };

    const markDelivered = async (orderId: number, paymentCollected: boolean) => {
        const order = orders.find(o => o.id === orderId);
        const data = deliveryData[orderId] || { bikeUsed: false, travelCharge: '0', comments: '', receivedBy: '' };

        const updateData: any = {
            status: 'Delivered',
            payment_status: paymentCollected ? 'Paid' : 'Pending',
            bike_used: data.bikeUsed,
            travel_charge: parseFloat(data.travelCharge || '0'),
            delivery_notes: data.comments
        };

        if (paymentCollected) {
            // Default to delivery boy if not specified
            updateData.payment_received_by = data.receivedBy || order?.delivery_boy || 'Darshan';
        }

        const { error } = await supabase
            .from('orders')
            .update(updateData)
            .eq('id', orderId);

        if (error) {
            toast.error("Update failed");
        } else {
            toast.success(paymentCollected ? "Delivered & Paid!" : "Delivered (Payment Pending)");

            // Optimistic update
            setOrders(prev => prev.map(o =>
                o.id === orderId
                    ? { ...o, ...updateData }
                    : o
            ));

            // Clear data for this order
            setDeliveryData(prev => {

                const newState = { ...prev };
                delete newState[orderId];
                return newState;
            });
        }
    };

    const updateDeliveryData = (id: number, field: string, value: any) => {
        setDeliveryData(prev => ({
            ...prev,
            [id]: {
                ...(prev[id] || { bikeUsed: false, travelCharge: '', comments: '', receivedBy: '' }),
                [field]: value
            }
        }));
    };

    const openNav = (address: string) => {
        const dest = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}`, '_blank');
    };

    const copyPhone = (phone: string) => {
        if (!phone) {
            toast.error("No phone number available");
            return;
        }
        navigator.clipboard.writeText(phone);
        toast.success(t.phoneCopied);
    }

    const generateWhatsAppShare = (type: 'pending' | 'active', data: DeliveryOrder[]) => {
        if (data.length === 0) {
            toast.info("No orders to share.");
            return;
        }

        const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        const header = type === 'pending' ? t.waPendingHeader : t.waHeader;

        let message = `*📦 ${header} (${dateStr})*\n\n`;

        data.forEach((order, index) => {
            const itemsText = order.order_items?.map(i => `${i.quantity}x ${i.product_type} (${i.weight_kg}kg)`).join(', ') || 'No items';

            message += `   📦 ${itemsText}\n`;
            message += `   📍 ${order.customer_address.slice(0, 40).replace(/\n/g, ', ')}...`;
            if (order.distance_km) message += ` (${order.distance_km}km)`;
            message += `\n`;
            message += `   📞 ${order.customer_phone || 'No Phone'}\n`;

            const statusIcon = order.payment_status === 'Paid' ? '✅' : '🔴';
            const statusText = order.payment_status === 'Paid' ? t.waPaid : `₹${order.total_amount} ${t.waDue}`;

            message += `   💰 ${statusIcon} ${statusText}\n\n`;
        });

        // Encode for URL
        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMsg}`, '_blank');
    };

    if (loading) return <Loader2 className="animate-spin" />;

    const unassigned = orders.filter(o => !o.delivery_boy && o.status !== 'Delivered');
    const active = orders.filter(o => o.delivery_boy && o.status !== 'Delivered');
    const deliveredOrders = orders.filter(o => o.status === 'Delivered');

    return (
        <div className="space-y-8 pb-12">

            {/* Header with Language Toggle */}
            <div className="flex justify-end sticky top-0 bg-slate-50 z-10 py-2">
                <Button
                    variant="outline"
                    onClick={() => setLang(l => l === 'en' ? 'mr' : 'en')}
                    className={`gap-2 border-2 ${lang === 'mr' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200'}`}
                >
                    <Globe className="h-4 w-4" />
                    {lang === 'en' ? 'Switch to Marathi 🇮🇳' : 'इंग्रजी (English)'}
                </Button>
            </div>

            {/* SECTION 1: Unassigned Orders */}
            <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                        <div className="bg-yellow-100 p-2 rounded-full"><Truck className="text-yellow-600 h-5 w-5" /></div>
                        {t.pendingAssignments} ({unassigned.length})
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => generateWhatsAppShare('pending', unassigned)} className="bg-white border-green-500 text-green-600 hover:bg-green-50">
                        <Share2 className="w-4 h-4 mr-2" /> {t.shareWhatsApp}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unassigned.length === 0 ? <p className="text-gray-500 italic ml-2">{t.allAssigned}</p> :
                        unassigned.map(order => (
                            <Card key={order.id} className="border-l-4 border-l-yellow-400 shadow-sm hover:shadow-md transition-all bg-white">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <Badge variant="outline" className="w-fit mb-1 text-gray-700 border-gray-300">#{order.id}</Badge>
                                            <span className="text-xs text-gray-500 font-medium">{order.distance_km} km {t.distance}</span>
                                        </div>
                                        {order.total_amount > 0 && (
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                                                ₹{order.total_amount}
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-base truncate pt-1 text-gray-900">{order.customer_name}</CardTitle>
                                    <CardDescription className="line-clamp-2 min-h-[40px] text-xs text-gray-500">{order.customer_address}</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <Select onValueChange={(val) => assignDriver(order.id, val)}>
                                        <SelectTrigger className="w-full bg-white text-gray-900 border-gray-300">
                                            <SelectValue placeholder={t.selectDriver} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white text-gray-900">
                                            <SelectItem value="Darshan">Darshan</SelectItem>
                                            <SelectItem value="Suraj">Suraj</SelectItem>
                                            <SelectItem value="Sushant">Sushant</SelectItem>
                                            <SelectItem value="Deepak">Deepak</SelectItem>
                                            <SelectItem value="External">External (Dunzo/Porter)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>

            {/* SECTION 2: Active Deliveries */}
            {/* SECTION 2: Active Deliveries */}
            <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pt-4 border-t gap-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                        <div className="bg-blue-100 p-2 rounded-full"><Navigation className="text-blue-600 h-5 w-5" /></div>
                        {t.outForDelivery} ({active.length})
                    </h3>
                    <Button size="sm" onClick={() => generateWhatsAppShare('active', active)} className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
                        <ClipboardList className="w-4 h-4 mr-2" /> {t.shareRunSheet}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {active.map(order => (
                        <Card key={order.id} className="border-l-4 border-l-blue-500 shadow-md bg-white">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg text-gray-900">{order.customer_name}</CardTitle>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="secondary" className="text-blue-700 bg-blue-50">
                                                {t.driver}: {order.delivery_boy}
                                            </Badge>
                                            {order.customer_phone && (
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => copyPhone(order.customer_phone)}>
                                                    <Phone className="h-3 w-3 text-gray-500" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => openNav(order.customer_address)}>
                                        <MapPin className="h-4 w-4" />
                                        {t.navigate}
                                    </Button>
                                </div>
                                <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded border border-gray-100">
                                    {order.customer_address}
                                </p>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                {/* Delivery Inputs */}
                                <div className="space-y-3 bg-gray-50 p-3 rounded-md border border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id={`bike-${order.id}`}
                                            checked={deliveryData[order.id]?.bikeUsed || false}
                                            onCheckedChange={(checked) => updateDeliveryData(order.id, 'bikeUsed', checked)}
                                        />
                                        <Label htmlFor={`bike-${order.id}`} className="cursor-pointer text-sm font-medium text-gray-700">Bike Used?</Label>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1/3">
                                            <Input
                                                type="number"
                                                placeholder="Travel Charge"
                                                className="h-8 text-xs bg-white"
                                                value={deliveryData[order.id]?.travelCharge || ''}
                                                onChange={(e) => updateDeliveryData(order.id, 'travelCharge', e.target.value)}
                                            />
                                        </div>
                                        <div className="w-2/3">
                                            <Select
                                                value={deliveryData[order.id]?.receivedBy || order.delivery_boy || ''}
                                                onValueChange={(val) => updateDeliveryData(order.id, 'receivedBy', val)}
                                            >
                                                <SelectTrigger className="h-8 text-xs bg-white border-green-200">
                                                    <SelectValue placeholder="Paid to..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Sushant">Paid to Sushant</SelectItem>
                                                    <SelectItem value="Suraj">Paid to Suraj</SelectItem>
                                                    <SelectItem value="Darshan">Paid to Darshan</SelectItem>
                                                    <SelectItem value="Deepak">Paid to Deepak</SelectItem>
                                                    <SelectItem value="Online">Online Transfer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Input
                                        placeholder="Comments / Notes"
                                        className="h-8 text-xs bg-white"
                                        value={deliveryData[order.id]?.comments || ''}
                                        onChange={(e) => updateDeliveryData(order.id, 'comments', e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{t.amountDue}</span>
                                        <span className="text-xl font-bold text-gray-900">
                                            {order.payment_status === 'Paid' ? (
                                                <span className="text-green-600 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> {t.paid}</span>
                                            ) : (
                                                <span className="text-red-600">₹{order.total_amount || 0}</span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                            onClick={() => markDelivered(order.id, false)}
                                            title="Mark Delivered but Payment Pending"
                                        >
                                            Credit
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 shadow-sm shadow-green-200"
                                            onClick={() => markDelivered(order.id, true)}
                                        >
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            {t.markDelivered}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {active.length === 0 && <p className="text-gray-500 italic ml-2">{t.noActive}</p>}
                </div>
            </div>

            {/* SECTION 3: Delivered History */}
            <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pt-4 border-t gap-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                        <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="text-green-600 h-5 w-5" /></div>
                        Delivered Today ({deliveredOrders.length})
                    </h3>
                </div>

                <div className="rounded-md border bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="h-10 px-4 text-left font-medium text-gray-500">Order ID</th>
                                    <th className="h-10 px-4 text-left font-medium text-gray-500">Customer</th>
                                    <th className="h-10 px-4 text-left font-medium text-gray-500">Driver</th>
                                    <th className="h-10 px-4 text-left font-medium text-gray-500">Collected By</th>
                                    <th className="h-10 px-4 text-right font-medium text-gray-500">Amount</th>
                                    <th className="h-10 px-4 text-right font-medium text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-gray-500">No deliveries completed yet today.</td>
                                    </tr>
                                ) : (
                                    deliveredOrders.map((order) => (
                                        <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="p-3 font-mono text-xs">#{order.id}</td>
                                            <td className="p-3 font-medium">{order.customer_name}</td>
                                            <td className="p-3 text-gray-600">{order.delivery_boy || '-'}</td>
                                            <td className="p-3">
                                                <Badge variant="outline" className="text-xs bg-slate-50">
                                                    {(order as any).payment_received_by || '-'}
                                                </Badge>
                                            </td>
                                            <td className="p-3 text-right">₹{order.total_amount}</td>
                                            <td className="p-3 text-right">
                                                <Badge className="bg-green-100 text-green-800 border-green-200">Delivered</Badge>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DeliveryManager;
