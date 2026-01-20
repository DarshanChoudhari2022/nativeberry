import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

    const t = translations[lang];

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .neq('status', 'Cancelled')
            .neq('status', 'Delivered')
            .order('delivery_date', { ascending: true });

        if (error) {
            console.error('Error:', error);
        } else {
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

    const markDelivered = async (orderId: number) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: 'Delivered', payment_status: 'Paid' })
            .eq('id', orderId);

        if (error) {
            toast.error("Update failed");
        } else {
            toast.success(t.deliveryUpdated);
            fetchDeliveries();
        }
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
            message += `*${index + 1}. ${order.customer_name}* (${order.distance_km}km)\n`;
            if (type === 'active') message += `   👤 ${t.driver}: ${order.delivery_boy}\n`;
            message += `   📍 ${order.customer_address.slice(0, 40).replace(/\n/g, ', ')}...\n`;
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

    const unassigned = orders.filter(o => !o.delivery_boy);
    const active = orders.filter(o => o.delivery_boy);

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
                                            <SelectItem value="Ramesh">Ramesh (Bike 1)</SelectItem>
                                            <SelectItem value="Suresh">Suresh (Bike 2)</SelectItem>
                                            <SelectItem value="Mahesh">Mahesh (Van)</SelectItem>
                                            <SelectItem value="External">Dunzo/Porter</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>

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
                            <CardContent className="flex justify-between items-center pt-4">
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
                                <Button
                                    className="bg-green-600 hover:bg-green-700 shadow-sm shadow-green-200"
                                    onClick={() => markDelivered(order.id)}
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    {t.markDelivered}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                    {active.length === 0 && <p className="text-gray-500 italic ml-2">{t.noActive}</p>}
                </div>
            </div>

        </div>
    );
};

export default DeliveryManager;
