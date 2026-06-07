function ContactPage() {
  return (
    <div className="bg-prima-background min-h-screen py-16 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-prima-green text-white rounded-[32px] p-10">

          <h1 className="text-5xl font-bold">
            Kontak Kami
          </h1>

          <p className="mt-4 text-lg opacity-90">
            Hubungi tim PRIMA apabila Anda membutuhkan
            bantuan atau memiliki pertanyaan.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-[28px] p-8 border border-prima-sand shadow-sm">
            <h3 className="text-xl font-bold">
              Email
            </h3>

            <p className="mt-3 text-prima-muted">
              info@prima.id
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-8 border border-prima-sand shadow-sm">
            <h3 className="text-xl font-bold">
              WhatsApp
            </h3>

            <p className="mt-3 text-prima-muted">
              +62 857-4909-0024 <br />
              +62 813-5260-2516 <br />
              +62 852-9044-8066 <br />
              +62 831-4134-2087 <br />
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-8 border border-prima-sand shadow-sm">
            <h3 className="text-xl font-bold">
              Alamat
            </h3>

            <p className="mt-3 text-prima-muted">
              Kediri, Jawa Timur,
              Indonesia
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ContactPage;