import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const VisitorTracker = () => {
    useEffect(() => {
        const logVisit = async () => {
            // Prevent logging in development if desired, but user wants it now.
            // Check if session storage has 'visited' to avoid duplicate logs per session?
            // User asked for "who all has opened", so unique visits per session is good.

            const sessionKey = 'nativeberry_visit_logged';
            if (sessionStorage.getItem(sessionKey)) return;

            try {
                // Fetch IP and Location data
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                if (data.error) {
                    console.warn('VisitorTracker: Failed to fetch location data', data);
                    return;
                }

                // Insert into Supabase
                const { error } = await supabase
                    .from('visitor_logs')
                    .insert([
                        {
                            ip_address: data.ip,
                            city: data.city,
                            region: data.region,
                            country: data.country_name,
                            user_agent: navigator.userAgent,
                            isp: data.org
                        }
                    ]);

                if (error) {
                    console.error('VisitorTracker: Supabase error', error);
                } else {
                    sessionStorage.setItem(sessionKey, 'true');
                }

            } catch (err) {
                console.error('VisitorTracker: Error logging visit', err);
            }
        };

        logVisit();
    }, []);

    return null; // Invisible component
};

export default VisitorTracker;
