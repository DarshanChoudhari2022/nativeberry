# 🍓 Native Berry Farms - Admin Dashboard Guide
## Quick Start for Team Members

---

### 🔗 Access Link
**Dashboard URL:** `https://your-domain.com/secret-dashboard`  
*(or `http://localhost:5173/secret-dashboard` for local testing)*

### 🔑 Login Credentials
| Username | Password |
|----------|----------|
| Darshan  | `nativeberry123` |
| Suraj    | `nativeberry123` |
| Sushant  | `nativeberry123` |
| Admin    | `nativeberry123` |

---

## 📋 Feature Guide

### 1️⃣ Creating a New Order (नवीन ऑर्डर)

1. **Login** with your username
2. Click **"New Order"** tab
3. Fill the form:
   - **Customer Name** - ग्राहकाचे नाव
   - **Phone** - फोन नंबर
   - **Address** - पूर्ण पत्ता (with pincode)
   - **Distance** - Click **"Auto Calc"** button (आपोआप km मोजते!)
   - **Quantity** - 250g boxes / 1kg boxes
   - **Rate** - Default ₹100/₹350 (change if needed)
   - **Payment Status** - Pending (COD) or Paid
   - **Delivery Date** - तारीख निवडा
4. Click **"Place Order"** ✅

**Bill Summary** will show automatically!

---

### 2️⃣ Managing Deliveries (डिलिव्हरी व्यवस्थापन)

1. Go to **"Delivery"** tab
2. **Language Toggle:** Click 🇮🇳 button to switch to **Marathi** (ड्रायव्हरसाठी)

#### Pending Orders (बाकी ऑर्डर्स):
- See all orders waiting for driver assignment
- Select driver from dropdown
- Order moves to "Out for Delivery"

#### Out for Delivery (वितरणासाठी):
- **Navigate** - Opens Google Maps with route
- **📞 Phone** - Copy customer number
- **Mark Delivered** - Complete the order

#### Share with Driver:
- Click **"Share Run Sheet"** → Opens WhatsApp with formatted list!+

---

### 3️⃣ Farmer Requirements (शेतकऱ्यांसाठी)

1. Go to **"Farmer Req."** tab
2. See daily berry requirements grouped by date
3. Click **📋 Share** to copy WhatsApp message for farmer

---

### 4️⃣ Master Order List (सर्व ऑर्डर्स)

1. Go to **"Master List"** tab
2. View all orders with status
3. Use **⋮ menu** to:
   - Mark as Delivered
   - Mark as Paid
   - Cancel Order

---

## 📱 Mobile Tips

- Dashboard works on phone!
- Swipe left/right on tables
- Tap tabs to switch sections
- Use Marathi mode for drivers

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Table not found" error | Run SQL schema in Supabase |
| Distance not calculating | Type full address with "Pune" |
| WhatsApp not opening | Allow popups in browser |

---

## 📞 Support
Contact: **Darshan** (Admin)

---

*Last Updated: January 2026*
