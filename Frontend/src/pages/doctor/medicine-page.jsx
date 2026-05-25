import { useState } from "react";

function MedicinePage() {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Analgesik",
      stock: 120,
      supplier: "PT Sehat Farma",
      status: "Aman",
    },
    {
      id: 2,
      name: "Amoxicillin 500mg",
      category: "Antibiotik",
      stock: 35,
      supplier: "Medika Supplier",
      status: "Menipis",
    },
    {
      id: 3,
      name: "Vitamin C",
      category: "Vitamin",
      stock: 80,
      supplier: "Prima Medika",
      status: "Aman",
    },
    {
      id: 4,
      name: "OBH Sirup",
      category: "Obat Batuk",
      stock: 15,
      supplier: "PT Sehat Farma",
      status: "Menipis",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    supplier: "",
  });

  const safeStockCount = medicines.filter(
    (medicine) => medicine.status === "Aman"
  ).length;

  const lowStockCount = medicines.filter(
    (medicine) => medicine.status === "Menipis"
  ).length;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const stockNumber = Number(formData.stock);

    const newMedicine = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      stock: stockNumber,
      supplier: formData.supplier,
      status: stockNumber <= 40 ? "Menipis" : "Aman",
    };

    setMedicines([...medicines, newMedicine]);

    setFormData({
      name: "",
      category: "",
      stock: "",
      supplier: "",
    });

    setShowForm(false);
  }

  return (
    <section className="p-6">
      <div>
        <h1 className="text-2xl font-semibold text-prima-black">
          Manajemen Obat
        </h1>

        <p className="mt-2 text-sm text-prima-gray">
          Pantau stok obat, kategori, supplier, dan status ketersediaan obat.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-prima-gray">Total Obat</p>

          <h2 className="mt-2 text-3xl font-semibold text-prima-black">
            {medicines.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-prima-gray">Stok Aman</p>

          <h2 className="mt-2 text-3xl font-semibold text-prima-black">
            {safeStockCount}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-prima-gray">Stok Menipis</p>

          <h2 className="mt-2 text-3xl font-semibold text-prima-black">
            {lowStockCount}
          </h2>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-prima-black">
              Daftar Obat
            </h2>

            <p className="mt-1 text-sm text-prima-gray">
              Data stok obat yang tersedia di praktik dokter.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-prima-green px-4 py-2 text-sm font-medium text-white"
          >
            {showForm ? "Tutup Form" : "Tambah Obat"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-5 rounded-2xl border border-prima-sand bg-prima-sand p-4"
          >
            <h3 className="font-semibold text-prima-black">
              Form Tambah Obat
            </h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-prima-black">
                  Nama Obat
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                  placeholder="Contoh: Ibuprofen 400mg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-prima-black">
                  Kategori
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                  placeholder="Contoh: Analgesik"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-prima-black">
                  Stok
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="mt-2 w-full rounded-xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                  placeholder="Contoh: 50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-prima-black">
                  Supplier
                </label>

                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                  placeholder="Contoh: Prima Medika"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-prima-green px-5 py-3 text-sm font-medium text-white"
              >
                Simpan Obat
              </button>
            </div>
          </form>
        )}

        <div className="mt-5 overflow-hidden rounded-2xl border border-prima-sand">
          <table className="w-full text-left text-sm">
            <thead className="bg-prima-sand text-prima-black">
              <tr>
                <th className="px-4 py-3 font-medium">Nama Obat</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Stok</th>
                <th className="px-4 py-3 font-medium">Supplier</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-prima-sand">
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="bg-white">
                  <td className="px-4 py-3 font-medium text-prima-black">
                    {medicine.name}
                  </td>

                  <td className="px-4 py-3 text-prima-gray">
                    {medicine.category}
                  </td>

                  <td className="px-4 py-3 text-prima-black">
                    {medicine.stock}
                  </td>

                  <td className="px-4 py-3 text-prima-gray">
                    {medicine.supplier}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        medicine.status === "Aman"
                          ? "bg-prima-sand text-prima-teal"
                          : "bg-prima-terracotta text-white"
                      }`}
                    >
                      {medicine.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default MedicinePage;