function AppointmentStepper({
  currentStep = 1,
}) {
  const steps = [
    "Pilih Tanggal",
    "Pilih Jam",
    "Konfirmasi",
  ];

  return (
    <div className="flex items-center">

      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const active =
          currentStep >= stepNumber;

        return (
          <div
            key={step}
            className="flex flex-1 items-center"
          >

            <div className="flex items-center gap-3">

              <div
                className={`
                  flex h-10 w-10 items-center justify-center
                  rounded-full font-semibold
                  ${
                    active
                      ? "bg-prima-green text-white"
                      : "bg-prima-sand text-prima-secondary"
                  }
                `}
              >
                {stepNumber}
              </div>

              <span
                className={
                  active
                    ? "font-medium text-prima-text"
                    : "text-prima-secondary"
                }
              >
                {step}
              </span>

            </div>

            {index !== steps.length - 1 && (
              <div
                className={`
                  mx-4 h-[2px] flex-1
                  ${
                    currentStep >
                    stepNumber
                      ? "bg-prima-green"
                      : "bg-[#E5E7EB]"
                  }
                `}
              />
            )}

          </div>
        );
      })}
    </div>
  );
}

export default AppointmentStepper;