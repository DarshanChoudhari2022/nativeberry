import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar as CalendarIcon, Loader2, Wand2, Calculator } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    customer_name: z.string().min(2, "Name is required"),
    customer_address: z.string().min(10, "Detailed address is required"),
    customer_phone: z.string().optional(),
    distance_km: z.string().min(1, "Distance is required"),
    plastic_box_250g: z.coerce.number().min(0),
    cardboard_box_1kg: z.coerce.number().min(0),
    payment_status: z.enum(['Pending', 'Paid']),
    payment_method: z.string().optional(),
    salesperson: z.string().min(1, "Salesperson is required"),
    delivery_date: z.date({
        required_error: "A delivery date is required.",
    }),
    notes: z.string().optional(),
});

interface OrderEntryFormProps {
    currentUser: string;
    onOrderCreated: () => void;
}

const OrderEntryForm = ({ currentUser, onOrderCreated }: OrderEntryFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    // Pricing State (Defaults)
    const [price250g, setPrice250g] = useState(100);
    const [price1kg, setPrice1kg] = useState(350);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            salesperson: currentUser,
            plastic_box_250g: 0,
            cardboard_box_1kg: 0,
            payment_status: 'Pending',
            distance_km: '',
            delivery_date: new Date(),
        },
    });

    const watchAddress = form.watch('customer_address');
    const watch250g = form.watch('plastic_box_250g');
    const watch1kg = form.watch('cardboard_box_1kg');

    const totalWeight = (watch250g * 0.25) + (watch1kg * 1.0);
    const totalAmount = (watch250g * price250g) + (watch1kg * price1kg);

    const calculateAutoDistance = async () => {
        if (!watchAddress) {
            toast.error("Please enter an address first");
            return;
        }
        setIsCalculating(true);
        try {
            // 1. Geocode Address using OpenStreetMap (Nominatim)
            // Appending "Pune" to help context if missing
            const query = encodeURIComponent(watchAddress + (watchAddress.toLowerCase().includes('pune') ? '' : ' Pune'));
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
            const data = await res.json();

            if (data && data.length > 0) {
                const destLat = parseFloat(data[0].lat);
                const destLon = parseFloat(data[0].lon);

                // Origin: Lords Residency, Kedari Nagar, Wanowrie
                const originLat = 18.491370;
                const originLon = 73.897395;

                // Haversine Formula for air distance
                const R = 6371; // Earth radius km
                const dLat = (destLat - originLat) * Math.PI / 180;
                const dLon = (destLon - originLon) * Math.PI / 180;
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(originLat * Math.PI / 180) * Math.cos(destLat * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const airDistance = R * c;

                // Road adjustment factor (1.4x is a safe city traffic proxy)
                const roadDistance = (airDistance * 1.4).toFixed(1);

                form.setValue('distance_km', roadDistance.toString());
                toast.success(`Estimated distance: ${roadDistance} km`, {
                    description: "Calculated via OpenStreetMap. Verify if needed."
                });
            } else {
                toast.error("Could not find address automatically.");
                // We do NOT open maps automatically anymore per user request
            }
        } catch (e) {
            console.error(e);
            toast.error("Calculation failed. Please enter manually.");
        } finally {
            setIsCalculating(false);
        }
    }

    const openGoogleMaps = () => {
        if (!watchAddress) {
            toast.error("Please enter an address first");
            return;
        }
        const origin = encodeURIComponent("Lords Residency Wanawadi Kedari Nagar Pune");
        const destination = encodeURIComponent(watchAddress);
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`, '_blank');
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            // 1. Create Order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    customer_name: values.customer_name,
                    customer_address: values.customer_address,
                    customer_phone: values.customer_phone,
                    distance_km: parseFloat(values.distance_km),
                    payment_status: values.payment_status,
                    payment_method: values.payment_method,
                    salesperson: values.salesperson,
                    delivery_date: format(values.delivery_date, 'yyyy-MM-dd'),
                    notes: values.notes,
                    status: 'Pending',
                    delivery_notes: `Total weight: ${totalWeight}kg`,
                    total_amount: totalAmount
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Order Items
            const items = [];
            if (values.plastic_box_250g > 0) {
                items.push({
                    order_id: orderData.id,
                    product_type: 'Plastic Box (250g)',
                    quantity: values.plastic_box_250g,
                    weight_kg: values.plastic_box_250g * 0.25,
                    unit_price: price250g
                });
            }
            if (values.cardboard_box_1kg > 0) {
                items.push({
                    order_id: orderData.id,
                    product_type: 'Cardboard Box (1kg)',
                    quantity: values.cardboard_box_1kg,
                    weight_kg: values.cardboard_box_1kg * 1.0,
                    unit_price: price1kg
                });
            }

            if (items.length > 0) {
                const { error: itemsError } = await supabase
                    .from('order_items')
                    .insert(items);

                if (itemsError) throw itemsError;
            }

            toast.success(`Order placed! Total Bill: ₹${totalAmount}`);
            form.reset({
                salesperson: currentUser,
                plastic_box_250g: 0,
                cardboard_box_1kg: 0,
                payment_status: 'Pending',
                distance_km: '',
                customer_name: '',
                customer_address: '',
                customer_phone: '',
                notes: '',
                payment_method: '',
                delivery_date: new Date()
            });
            onOrderCreated();

        } catch (error) {
            console.error('Error submitting order:', error);
            toast.error("Failed to submit order.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full border-t-4 border-t-red-600 shadow-md bg-white">
            <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                    Place New Order
                    {isCalculating && <Loader2 className="h-4 w-4 animate-spin text-red-500" />}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="salesperson"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Salesperson</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                                                    <SelectValue placeholder="Select Salesperson" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white text-gray-900">
                                                <SelectItem value="Darshan">Darshan</SelectItem>
                                                <SelectItem value="Suraj">Suraj</SelectItem>
                                                <SelectItem value="Sushant">Sushant</SelectItem>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="delivery_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-gray-700">Delivery Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal bg-white text-gray-900 border-gray-300",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 bg-white text-gray-900" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                                    }
                                                    initialFocus
                                                    className="bg-white text-gray-900"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="customer_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Customer Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter client name" {...field} className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customer_phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Phone (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+91..." {...field} className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="customer_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Delivery Address</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Full address including pincode" {...field} className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col sm:flex-row gap-4 items-end bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <FormField
                                control={form.control}
                                name="distance_km"
                                render={({ field }) => (
                                    <FormItem className="flex-1 w-full">
                                        <FormLabel className="text-gray-700">Distance (km)</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="0.0"
                                                    {...field}
                                                    className="bg-white text-gray-900 border-gray-300 pr-10 font-bold"
                                                />
                                                <div className="absolute right-3 top-2.5 text-xs text-gray-400">km</div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button
                                    type="button"
                                    onClick={calculateAutoDistance}
                                    disabled={isCalculating}
                                    className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                >
                                    {isCalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                                    Auto Calc
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={openGoogleMaps}
                                    className="flex-1 sm:flex-none bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    title="Open Google Maps to check route manually"
                                >
                                    <MapPin className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
                            <div className="space-y-4">
                                <div className="flex gap-2 items-end">
                                    <FormField
                                        control={form.control}
                                        name="plastic_box_250g"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="text-gray-700">Plastic Box (250g)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min="0" {...field} className="bg-white text-gray-900 border-gray-300" />
                                                </FormControl>
                                                <FormDescription className="text-gray-500">Unit count</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="w-24 pb-8">
                                        <label className="text-xs text-gray-500 font-medium ml-1">Rate (₹)</label>
                                        <Input
                                            type="number"
                                            value={price250g}
                                            onChange={(e) => setPrice250g(Number(e.target.value))}
                                            className="h-9 bg-white text-gray-900 border-gray-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-2 items-end">
                                    <FormField
                                        control={form.control}
                                        name="cardboard_box_1kg"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="text-gray-700">Cardboard Box (1kg)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min="0" {...field} className="bg-white text-gray-900 border-gray-300" />
                                                </FormControl>
                                                <FormDescription className="text-gray-500">Unit count</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="w-24 pb-8">
                                        <label className="text-xs text-gray-500 font-medium ml-1">Rate (₹)</label>
                                        <Input
                                            type="number"
                                            value={price1kg}
                                            onChange={(e) => setPrice1kg(Number(e.target.value))}
                                            className="h-9 bg-white text-gray-900 border-gray-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                            <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-1">
                                <Calculator className="w-3 h-3" /> Bill Summary
                            </div>
                            <div className="flex justify-between w-full max-w-[240px] text-sm text-gray-700">
                                <span>Total Weight:</span>
                                <span className="font-medium text-gray-900">{totalWeight.toFixed(2)} kg</span>
                            </div>
                            <div className="flex justify-between w-full max-w-[240px] text-xl font-bold text-red-600 border-t border-slate-200 pt-2 mt-1">
                                <span>Total Amount:</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="payment_status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Payment Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white text-gray-900">
                                                <SelectItem value="Pending">Pending (Not Paid)</SelectItem>
                                                <SelectItem value="Paid">Paid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="payment_method"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Payment Method</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                                                    <SelectValue placeholder="Select method" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white text-gray-900">
                                                <SelectItem value="Cash">Cash</SelectItem>
                                                <SelectItem value="UPI">UPI</SelectItem>
                                                <SelectItem value="Bank Transer">Bank Transfer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Additional Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Any specific instructions..." {...field} className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full bg-red-600 hover:bg-red-700 font-bold shadow-md" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving Order...
                                </>
                            ) : (
                                'Place Order'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default OrderEntryForm;
