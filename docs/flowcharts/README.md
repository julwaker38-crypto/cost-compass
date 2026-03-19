# CostFlow - Flowchart Dokumentasi

Kumpulan flowchart yang mendokumentasikan seluruh alur logika aplikasi CostFlow, dipisahkan per role dan per fitur.

## Daftar Flowchart

| No | File | Deskripsi |
|----|------|-----------|
| 00 | `00_full_application_workflow.mmd` | **Workflow keseluruhan aplikasi** - semua fitur dalam satu diagram |
| 01 | `01_overview_system.mmd` | Overview navigasi sistem per role |
| 02 | `02_auth_flow.mmd` | Alur autentikasi (Login, Register, Demo) |
| 03 | `03_manager_produk.mmd` | Manager: CRUD Produk, Resep, HPP, BTKL |
| 04 | `04_manager_karyawan.mmd` | Manager: Manajemen Karyawan |
| 05 | `05_cashier_transaksi.mmd` | Cashier: POS / Transaksi Penjualan |
| 06 | `06_pengeluaran.mmd` | Pengeluaran (berbeda per role) |
| 07 | `07_manager_laporan.mmd` | Manager: Laporan & Export |
| 08 | `08_manager_ai_chat.mmd` | Manager: Chat AI |
| 09 | `09_dashboard.mmd` | Dashboard (berbeda per role) |

## Role Access Matrix

| Fitur | Manager | Cashier |
|-------|---------|---------|
| Dashboard (Full KPI) | ✅ | ❌ |
| Dashboard (Ringkasan) | ❌ | ✅ |
| Produk & Resep | ✅ | ❌ |
| Karyawan | ✅ | ❌ |
| Transaksi POS | ❌ | ✅ |
| Pengeluaran (Semua) | ✅ | ❌ |
| Pengeluaran (Bahan Baku) | ❌ | ✅ |
| Chat AI | ✅ | ❌ |
| Laporan & Export | ✅ | ❌ |
| Pengaturan | ✅ | ❌ |

## Cara Melihat

File `.mmd` menggunakan format [Mermaid](https://mermaid.js.org/). Bisa dilihat di:
- **GitHub** - otomatis render diagram Mermaid
- **VS Code** - install extension "Mermaid Preview"
- **Online** - paste ke [mermaid.live](https://mermaid.live)

## Teknologi

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Flask REST API + SQLAlchemy + JWT
- **Database**: PostgreSQL
- **HPP Formula**: `HPP = BBB (Bahan Baku) + BTKL (Tenaga Kerja Langsung) + BOP (Overhead)`
