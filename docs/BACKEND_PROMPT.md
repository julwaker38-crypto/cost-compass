# CostFlow - Backend Development Guide (Flask)

## 📋 Deskripsi Aplikasi

CostFlow adalah aplikasi manajemen keuangan bisnis UMKM (fokus F&B) yang menghitung **HPP (Harga Pokok Penjualan)** per produk secara detail. Aplikasi ini membantu pemilik usaha memahami biaya produksi, margin keuntungan, dan laporan keuangan.

---

## 🏗️ Arsitektur Sistem

```
Frontend (React + Vite)  ←→  Backend (Flask REST API)  ←→  Database (PostgreSQL)
     Port 5173                    Port 5000                    Port 5432
```

### Tech Stack Backend
- **Framework**: Flask
- **ORM**: Flask-SQLAlchemy  
- **Migration**: Flask-Migrate (Alembic)
- **Auth**: Flask-JWT-Extended (JWT Token)
- **Password**: Bcrypt
- **CORS**: Flask-CORS
- **Export**: openpyxl (Excel), csv (built-in)

### Install Dependencies
```bash
pip install flask flask-sqlalchemy flask-migrate flask-jwt-extended flask-cors flask-bcrypt openpyxl psycopg2-binary
```

---

## 🔐 Autentikasi & Otorisasi

### Alur Kerja:
1. User register → password di-hash dengan bcrypt → simpan ke DB
2. User login → validasi email+password → return JWT access token
3. Setiap request ke protected endpoint → kirim token di header `Authorization: Bearer <token>`
4. Backend decode token → ambil user_id dan role → cek akses

### Roles:
| Role | Akses |
|------|-------|
| `manager` | Semua fitur: CRUD produk, karyawan, bahan baku, laporan, settings, export |
| `cashier` | Dashboard (read-only), lihat produk, transaksi POS, riwayat penjualan, AI chat |

### Endpoints Auth:
```
POST /api/auth/register
  Body: { name, email, password, role }
  Response: { user: {...}, access_token }

POST /api/auth/login
  Body: { email, password }
  Response: { user: { id, name, email, role }, access_token }

GET /api/auth/me
  Header: Authorization: Bearer <token>
  Response: { id, name, email, role }

POST /api/auth/logout
  → Invalidate token (optional: blacklist)
```

---

## 📦 Modul & Endpoint API

### 1. Products (Produk)

Produk memiliki **resep** (ingredients) yang terhubung ke raw_materials. HPP dihitung dari:
- **BBB** (Biaya Bahan Baku) = total cost semua ingredients
- **BTKL** (Biaya Tenaga Kerja Langsung) = labor_cost
- **BOP** (Biaya Overhead Produksi) = overhead_cost
- **HPP** = BBB + BTKL + BOP
- **Margin** = ((selling_price - HPP) / selling_price) × 100

```
GET    /api/products              → List semua produk
GET    /api/products/:id          → Detail produk + ingredients
POST   /api/products              → Tambah produk baru + ingredients
PUT    /api/products/:id          → Edit produk + ingredients
DELETE /api/products/:id          → Hapus produk (soft delete: is_active=false)
```

#### Contoh Body POST/PUT:
```json
{
  "name": "Kopi Susu Gula Aren",
  "category": "Coffee",
  "emoji": "☕",
  "selling_price": 25000,
  "labor_cost": 1000,
  "overhead_cost": 500,
  "stock_initial": 100,
  "stock_current": 85,
  "unit": "Cup",
  "description": "Kopi susu dengan gula aren asli",
  "ingredients": [
    { "material_id": 1, "ingredient_name": "Biji Kopi Arabica", "amount": 10, "unit": "g", "price_per_unit": 150, "total_cost": 1500, "category": "raw" },
    { "material_id": 3, "ingredient_name": "Gula Aren", "amount": 20, "unit": "g", "price_per_unit": 20, "total_cost": 400, "category": "raw" }
  ]
}
```

#### Logika HPP di Backend:
```python
def calculate_hpp(product_data):
    bbb = sum(ing['total_cost'] for ing in product_data['ingredients'])
    btkl = product_data['labor_cost']
    bop = product_data['overhead_cost']
    hpp = bbb + btkl + bop
    margin = ((product_data['selling_price'] - hpp) / product_data['selling_price']) * 100
    return hpp, round(margin, 1)
```

---

### 2. Raw Materials (Bahan Baku & Biaya)

Kategori menentukan apakah masuk HPP atau tidak:
- `bahan_baku` → HPP (BBB)
- `tenaga_kerja` → HPP (BTKL)  
- `overhead` → HPP (BOP)
- `operasional` → Non-HPP
- `administrasi` → Non-HPP

```
GET    /api/materials              → List semua bahan
POST   /api/materials              → Tambah bahan baru
PUT    /api/materials/:id          → Edit bahan
DELETE /api/materials/:id          → Hapus bahan
```

---

### 3. Employees (Karyawan)

Karyawan dibagi menjadi:
- **is_production_labor = true** → Tenaga kerja produksi (BTKL), biayanya masuk HPP
- **is_production_labor = false** → Non-produksi, biayanya masuk operasional

```
GET    /api/employees              → List semua karyawan
POST   /api/employees              → Tambah karyawan
PUT    /api/employees/:id          → Edit karyawan
DELETE /api/employees/:id          → Hapus karyawan
```

---

### 4. BTKL Allocation (Alokasi Tenaga Kerja ke Produk)

Membagi biaya tenaga kerja produksi ke setiap produk berdasarkan persentase.

**Logika:**
1. Hitung total BTKL harian = SUM(daily_wage) semua karyawan production_labor
2. Distribusikan ke produk berdasarkan percentage (harus total 100%)
3. BTKL per produk per unit = (total_btkl × percentage) / estimasi_produksi_harian

```
GET  /api/btkl                    → Get alokasi saat ini
POST /api/btkl                    → Simpan/update alokasi
  Body: { allocations: [{ product_id, percentage }] }
```

**Backend harus:**
- Validasi total percentage = 100%
- Update labor_cost di tabel products
- Recalculate HPP dan margin setiap produk

---

### 5. Transactions / POS (Point of Sale)

#### Alur POS:
1. Cashier pilih produk → tambah ke cart
2. Tentukan quantity per produk
3. Pilih metode bayar (cash/card/transfer)
4. Submit → buat record di `sales` + `sale_items` + `transactions`
5. Auto-update stock produk (via trigger atau backend logic)

```
POST /api/sales
  Body: {
    payment_method: "cash",
    items: [
      { product_id: 1, quantity: 3 },
      { product_id: 3, quantity: 2 }
    ],
    notes: "optional"
  }
```

**Backend harus:**
1. Generate invoice_number (format: `INV-YYYYMMDD-XXXX`)
2. Ambil data produk (selling_price, hpp) dari DB
3. Hitung subtotal, total_hpp, profit
4. Insert ke `sales` table
5. Insert setiap item ke `sale_items`
6. Insert transaksi income ke `transactions`
7. Update stock_current di `products` (kurangi quantity)
8. Return response dengan detail penjualan

---

### 6. 📊 Sales History / Riwayat Penjualan (HALAMAN BARU)

Halaman ini menampilkan semua riwayat penjualan dengan fitur filter, search, dan export.

```
GET /api/sales/history
  Query params:
    ?page=1
    &per_page=20
    &start_date=2025-01-01
    &end_date=2025-01-31
    &search=INV-2025
    &payment_method=cash
    &cashier_id=1
    &sort_by=sale_date
    &sort_order=desc
  
  Response: {
    data: [
      {
        id: 1,
        invoice_number: "INV-20250115-0001",
        sale_date: "2025-01-15T10:30:00",
        cashier_name: "Demo Cashier",
        payment_method: "cash",
        subtotal: 599000,
        total_hpp: 179700,
        profit: 419300,
        item_count: 3,
        items: [
          { product_name: "Kopi Susu", quantity: 5, unit_price: 25000, total_price: 125000 }
        ]
      }
    ],
    pagination: {
      page: 1,
      per_page: 20,
      total_items: 156,
      total_pages: 8
    },
    summary: {
      total_revenue: 15600000,
      total_hpp: 4680000,
      total_profit: 10920000,
      total_transactions: 156
    }
  }

GET /api/sales/:id
  → Detail satu penjualan + semua items

GET /api/sales/export
  Query params: same as history + format=csv|excel
  Response: File download (CSV atau Excel)
```

#### Logika Export:
```python
# CSV Export
import csv, io

def export_csv(sales_data):
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['No', 'Invoice', 'Tanggal', 'Kasir', 'Metode Bayar', 
                     'Items', 'Subtotal', 'HPP', 'Profit'])
    for i, sale in enumerate(sales_data, 1):
        writer.writerow([i, sale.invoice_number, sale.sale_date, 
                        sale.cashier_name, sale.payment_method,
                        sale.items_summary, sale.subtotal, 
                        sale.total_hpp, sale.profit])
    return output.getvalue()

# Excel Export (openpyxl)
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border

def export_excel(sales_data):
    wb = Workbook()
    ws = wb.active
    ws.title = "Riwayat Penjualan"
    
    # Header styling
    header_fill = PatternFill(start_color="2E7D32", end_color="2E7D32", fill_type="solid")
    header_font = Font(bold=True, color="FFFFFF")
    
    headers = ['No', 'Invoice', 'Tanggal', 'Kasir', 'Metode Bayar',
               'Items', 'Subtotal (Rp)', 'HPP (Rp)', 'Profit (Rp)']
    
    for col, header in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col, value=header)
        cell.fill = header_fill
        cell.font = header_font
    
    # Data rows
    for i, sale in enumerate(sales_data, 2):
        ws.cell(row=i, column=1, value=i-1)
        ws.cell(row=i, column=2, value=sale.invoice_number)
        # ... etc
    
    return wb
```

---

### 7. Reports & Dashboard KPI

```
GET /api/dashboard/kpi
  Query: ?period=monthly&date=2025-01
  Response: {
    total_revenue, total_hpp, gross_margin, 
    avg_cost_per_unit, total_transactions, 
    top_product, total_expense_operational, net_profit
  }

GET /api/dashboard/revenue-chart
  Query: ?period=daily&start=2025-01-01&end=2025-01-31
  Response: [{ date, revenue, hpp, profit }]

GET /api/dashboard/cost-composition
  Response: [{ name: "Bahan Baku", value: 78 }, ...]

GET /api/dashboard/top-products
  Query: ?limit=5
  Response: [{ name, total_sold, revenue, profit, margin }]

GET /api/reports/profit-loss
  Query: ?start_date=2025-01-01&end_date=2025-01-31
  Response: {
    revenue: { total, breakdown_by_product },
    hpp: { total, bbb, btkl, bop },
    gross_profit,
    operational_expenses: { total, breakdown },
    net_profit
  }
```

---

### 8. AI Chat (Parsing Transaksi)

```
POST /api/chat
  Body: { message: "jual kopi susu 5 cup" }
  Response: {
    type: "sale",
    parsed: { product: "Kopi Susu Gula Aren", quantity: 5, total: 125000 },
    message: "Penjualan 5x Kopi Susu Gula Aren = Rp125.000 berhasil dicatat",
    transaction_id: 123
  }
```

**Logika parsing:**
- Detect keywords: "jual/penjualan" → income, "beli/bayar" → expense
- Match product/material name (fuzzy match)
- Extract quantity (angka sebelum/sesudah nama produk)
- Auto-create transaction

---

### 9. Settings (Pengaturan Bisnis)

```
GET  /api/settings              → Get business settings
PUT  /api/settings              → Update business settings
  Body: { name, type, address, phone, founding_date, initial_capital, capital_source }
```

---

## 🔒 Middleware & Security

### JWT Middleware:
```python
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps

def manager_required(f):
    @wraps(f)
    @jwt_required()
    def decorated(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user.role != 'manager':
            return jsonify({"error": "Akses ditolak. Hanya manager."}), 403
        return f(*args, **kwargs)
    return decorated
```

### CORS Config:
```python
from flask_cors import CORS
CORS(app, origins=["http://localhost:5173", "https://your-domain.com"])
```

---

## 📁 Struktur Folder Backend (Rekomendasi)

```
costflow-backend/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── config.py            # Configuration (DB URI, JWT secret, etc.)
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── material.py
│   │   ├── employee.py
│   │   ├── sale.py
│   │   └── transaction.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── products.py
│   │   ├── materials.py
│   │   ├── employees.py
│   │   ├── btkl.py
│   │   ├── sales.py         # POS + Sales History + Export
│   │   ├── dashboard.py
│   │   ├── reports.py
│   │   ├── chat.py
│   │   └── settings.py
│   ├── services/
│   │   ├── hpp_calculator.py
│   │   ├── export_service.py
│   │   └── chat_parser.py
│   └── utils/
│       ├── decorators.py     # role decorators
│       └── helpers.py        # formatCurrency, invoice generator
├── migrations/               # Flask-Migrate
├── requirements.txt
├── run.py
└── .env
```

---

## 🔗 Frontend Integration

Frontend akan memanggil API menggunakan file `src/lib/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('costflow_token');

export const api = {
  get: async (path: string) => {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { 
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    if (res.status === 401) {
      localStorage.removeItem('costflow_token');
      window.location.href = '/login';
    }
    return res.json();
  },

  post: async (path: string, data: any) => {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  download: async (path: string, filename: string) => {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};
```

---

## ⚡ Prioritas Development

| # | Modul | Prioritas |
|---|-------|-----------|
| 1 | Auth (register/login/JWT) | 🔴 Tinggi |
| 2 | Products + Ingredients CRUD | 🔴 Tinggi |
| 3 | Raw Materials CRUD | 🔴 Tinggi |
| 4 | POS / Sales Transaction | 🔴 Tinggi |
| 5 | Sales History + Export | 🔴 Tinggi |
| 6 | Employees CRUD | 🟡 Sedang |
| 7 | BTKL Allocation | 🟡 Sedang |
| 8 | Dashboard KPI | 🟡 Sedang |
| 9 | Reports | 🟡 Sedang |
| 10 | AI Chat Parser | 🟢 Rendah |
| 11 | Settings | 🟢 Rendah |
