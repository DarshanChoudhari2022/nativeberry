import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Loader2, Sprout, Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface Requirement {
    date: string;
    plastic_250g: number;
    cardboard_1kg: number;
    total_weight: number;
}

const FarmerOrderSummary = () => {
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequirements();
    }, []);

    const fetchRequirements = async () => {
        setLoading(true);
        // Fetch all active orders (not Cancelled or Delivered)
        // We want to know what we need to PROCURE for upcoming deliveries
        const { data: orders, error } = await supabase
            .from('orders')
            .select(`
        id,
        delivery_date,
        status,
        order_items (
          product_type,
          quantity,
          weight_kg
        )
      `)
            .neq('status', 'Cancelled')
            .neq('status', 'Delivered') // If delivered, we don't need to ask farmer
            .order('delivery_date', { ascending: true });

        if (error) {
            console.error('Error fetching requirements:', error);
        } else if (orders) {
            const grouped: Record<string, Requirement> = {};

            orders.forEach(order => {
                const date = order.delivery_date || 'Unscheduled';
                if (!grouped[date]) {
                    grouped[date] = { date, plastic_250g: 0, cardboard_1kg: 0, total_weight: 0 };
                }

                order.order_items.forEach((item: any) => {
                    if (item.product_type.includes('250g')) {
                        grouped[date].plastic_250g += item.quantity;
                    } else {
                        grouped[date].cardboard_1kg += item.quantity;
                    }
                    grouped[date].total_weight += item.weight_kg;
                });
            });

            setRequirements(Object.values(grouped).sort((a, b) => {
                if (a.date === 'Unscheduled') return 1;
                if (b.date === 'Unscheduled') return -1;
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }));
        }
        setLoading(false);
    };

    const copyToClipboard = (req: Requirement) => {
        const dateStr = req.date === 'Unscheduled' ? 'Pending Schedule' : format(new Date(req.date), 'dd MMM yyyy');
        const text = `*New Order Requirement for ${dateStr}*\n\n` +
            `Total Weight: ${req.total_weight.toFixed(1)} kg\n` +
            `-------------------\n` +
            `📦 250g Punnets: ${req.plastic_250g}\n` +
            `📦 1kg Boxes: ${req.cardboard_1kg}\n\n` +
            `Please confirm availability.`;

        navigator.clipboard.writeText(text);
        toast.success("Requirement copied to clipboard!");
    };

    if (loading) return <Loader2 className="animate-spin" />;

    return (
        <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 flex items-start gap-4 shadow-sm">
                <div className="bg-green-100 p-3 rounded-full">
                    <Sprout className="h-6 w-6 text-green-700" />
                </div>
                <div>
                    <h3 className="font-semibold text-green-900 text-lg">Farmer Procurement List (Rushi Gade)</h3>
                    <p className="text-green-800 text-sm">
                        This list shows the total quantity needed from the farm based on upcoming orders.
                        Use the "Copy" button to send this summary via WhatsApp.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requirements.map((req) => (
                    <Card key={req.date} className="overflow-hidden border-t-4 border-t-green-600 shadow hover:shadow-lg transition-all bg-white">
                        <CardHeader className="bg-gray-50 pb-2 border-b">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg text-gray-900">
                                    {req.date === 'Unscheduled' ? 'Needs Scheduling' : format(new Date(req.date), 'EEEE, MMM do')}
                                </CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(req)} title="Copy for WhatsApp">
                                    <Copy className="h-4 w-4 text-gray-500 hover:text-green-600" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div className="bg-white p-3 rounded border border-green-100">
                                <div className="text-sm text-gray-500 mb-1 font-medium">Total Procurement Weight</div>
                                <div className="text-3xl font-bold text-green-700">{req.total_weight.toFixed(1)} <span className="text-lg text-gray-500">kg</span></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="p-3 bg-red-50 rounded text-center border border-red-100">
                                    <div className="font-bold text-2xl text-red-700">{req.plastic_250g}</div>
                                    <div className="text-xs font-semibold text-red-900 uppercase tracking-wide">250g Punnet</div>
                                </div>
                                <div className="p-3 bg-orange-50 rounded text-center border border-orange-100">
                                    <div className="font-bold text-2xl text-orange-700">{req.cardboard_1kg}</div>
                                    <div className="text-xs font-semibold text-orange-900 uppercase tracking-wide">1kg Box</div>
                                </div>
                            </div>

                            <Button className="w-full mt-2 bg-green-600 hover:bg-green-700" onClick={() => copyToClipboard(req)}>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share Requirement
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                {requirements.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed flex flex-col items-center justify-center">
                        <Sprout className="h-12 w-12 text-gray-300 mb-2" />
                        <p>No pending requirements.</p>
                        <p className="text-xs">All orders delivered or cancelled.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FarmerOrderSummary;
