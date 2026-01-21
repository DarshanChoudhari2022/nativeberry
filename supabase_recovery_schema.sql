
-- Add a column to track who is assigned to collect the payment
ALTER TABLE orders ADD COLUMN IF NOT EXISTS recovery_assigned_to TEXT;

-- Policy update not strictly needed as we are using public/anon access for now, 
-- but ensuring the column is available.
