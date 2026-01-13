import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface VisitorLog {
    id: number;
    ip_address: string;
    city: string;
    region: string;
    country: string;
    user_agent: string;
    isp: string;
    visited_at: string;
}

const HiddenDashboard = () => {
    const [logs, setLogs] = useState<VisitorLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalViews, setTotalViews] = useState(0);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        setLoading(true);
        const { data, error, count } = await supabase
            .from('visitor_logs')
            .select('*', { count: 'exact' })
            .order('visited_at', { ascending: false });

        if (error) {
            console.error('Error fetching logs:', error);
        } else {
            setLogs(data || []);
            setTotalViews(count || 0);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Analytics Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Views</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-red-600">{totalViews}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Visitor Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p>Loading data...</p>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Time</TableHead>
                                            <TableHead>IP Address</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead>ISP</TableHead>
                                            <TableHead className="hidden md:table-cell">Device</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {logs.map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell className="font-medium">
                                                    {format(new Date(log.visited_at), 'PP p')}
                                                </TableCell>
                                                <TableCell>{log.ip_address}</TableCell>
                                                <TableCell>{log.city}, {log.region}, {log.country}</TableCell>
                                                <TableCell>{log.isp}</TableCell>
                                                <TableCell className="hidden md:table-cell max-w-xs truncate" title={log.user_agent}>
                                                    {log.user_agent}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HiddenDashboard;
