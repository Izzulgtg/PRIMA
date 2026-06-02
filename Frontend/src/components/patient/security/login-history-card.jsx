import {
  Monitor,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  MapPin,
} from "lucide-react";

const LoginHistoryCard = ({
  loginHistory = [],
}) => {
  const getDeviceIcon = (
    device
  ) => {
    const lowerDevice =
      device?.toLowerCase() || "";

    const mobileKeywords = [
      "android",
      "iphone",
      "mobile",
    ];

    const isMobile =
      mobileKeywords.some((keyword) =>
        lowerDevice.includes(keyword)
      );

    return isMobile ? (
      <Smartphone size={18} />
    ) : (
      <Monitor size={18} />
    );
  };

  const getStatusStyle = (
    status
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "failed":
        return {
          className:
            "bg-red-100 text-red-700",
          icon: (
            <ShieldX size={16} />
          ),
        };

      case "blocked":
        return {
          className:
            "bg-orange-100 text-orange-700",
          icon: (
            <ShieldAlert size={16} />
          ),
        };

      default:
        return {
          className:
            "bg-green-100 text-green-700",
          icon: (
            <ShieldCheck size={16} />
          ),
        };
    }
  };

  const formatLoginDate = (
    date
  ) => {
    if (!date)
      return "Tanggal tidak tersedia";

    return new Date(
      date
    ).toLocaleString(
      "id-ID",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  return (
    <div
      className="
        rounded-[28px]
        border
        border-[#F1ECE4]
        bg-prima-card
        p-6
        shadow-sm
      "
    >
      {/* HEADER */}
      <div className="mb-6">

        <p className="text-sm text-prima-secondary">
          Security Monitoring
        </p>

        <h2 className="mt-2 text-2xl font-bold text-prima-text">
          Riwayat Login
        </h2>

      </div>

      {/* EMPTY STATE */}
      {loginHistory.length ===
        0 && (
        <div
          className="
            rounded-2xl
            bg-prima-background
            p-6
            text-center
          "
        >
          <p className="text-prima-secondary">
            Belum ada riwayat
            login.
          </p>
        </div>
      )}

      {/* LOGIN DATA */}
      {loginHistory.length >
        0 && (
        <div className="space-y-4">

          {loginHistory.map(
            (item, index) => {
              const status =
                getStatusStyle(
                  item.status
                );

              return (
                <div
                  key={
                    item.id ||
                    `${item.device}-${item.login_at}-${index}`
                  }
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                    rounded-2xl
                    bg-prima-background
                    p-4
                  "
                >
                  {/* LEFT */}
                  <div className="flex gap-4">

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-prima-sand
                        text-prima-green
                      "
                    >
                      {getDeviceIcon(
                        item.device
                      )}
                    </div>

                    <div>

                      <h3 className="font-semibold text-prima-text">
                        {item.device}
                      </h3>

                      <p className="mt-1 text-sm text-prima-secondary">
                        {item.ip_address ||
                          "IP tidak tersedia"}
                      </p>

                      {item.location && (
                        <div className="mt-1 flex items-center gap-1 text-xs text-prima-secondary">

                          <MapPin
                            size={
                              12
                            }
                          />

                          <span>
                            {
                              item.location
                            }
                          </span>

                        </div>
                      )}

                      <p className="mt-1 text-xs text-prima-secondary">
                        {formatLoginDate(
                          item.login_at
                        )}
                      </p>

                    </div>

                  </div>

                  {/* STATUS */}
                  <div
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-full
                      px-3
                      py-1
                      text-sm
                      font-medium
                      ${status.className}
                    `}
                  >
                    {status.icon}

                    {item.status ||
                      "Success"}

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}
    </div>
  );
};

export default LoginHistoryCard;