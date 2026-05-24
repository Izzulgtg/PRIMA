import Card from "../../components/ui/card"
import Badge from "../../components/ui/badge"
import Button from "../../components/ui/button"

function MaintenancePage() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div>

          <p className="text-prima-teal font-medium">
            PRIMA Maintenance
          </p>

          <h1
            className="
              text-5xl
              font-bold
              text-prima-text
              mt-4
            "
          >
            Periodic Maintenance
          </h1>

          <p
            className="
              text-prima-muted
              mt-4
              text-lg
            "
          >
            System integrity check and routine
            optimization tasks for PRIMA medical core.
          </p>

        </div>

        <Button variant="primary">
          Tambah Slot Baru
        </Button>

      </div>

      {/* MAINTENANCE GRID */}
      <div className="grid grid-cols-3 gap-8">

        {/* DAILY */}
        <Card className="border-t-4 border-[#4D7C57]">

          <div className="flex items-center justify-between">

            <h2
              className="
                text-2xl
                font-bold
                text-[#4D7C57]
              "
            >
              DAILY
            </h2>

            <Badge variant="success">
              3 Tasks
            </Badge>

          </div>

          <div className="space-y-5 mt-8">

            <div className="bg-prima-background rounded-2xl p-5">

              <h3 className="font-semibold text-prima-text">
                Server status check
              </h3>

              <p className="text-sm text-prima-muted mt-2">
                Verify uptime and CPU load.
              </p>

              <Button
                variant="primary"
                className="mt-5 w-full"
              >
                Tandai Selesai
              </Button>

            </div>

            <div className="bg-prima-background rounded-2xl p-5">

              <h3 className="font-semibold text-prima-text">
                Backup verification
              </h3>

              <p className="text-sm text-prima-muted mt-2">
                Confirm overnight snapshots.
              </p>

              <Button
                variant="primary"
                className="mt-5 w-full"
              >
                Tandai Selesai
              </Button>

            </div>

          </div>

        </Card>

        {/* WEEKLY */}
        <Card className="border-t-4 border-[#4B8196]">

          <div className="flex items-center justify-between">

            <h2
              className="
                text-2xl
                font-bold
                text-[#4B8196]
              "
            >
              WEEKLY
            </h2>

            <Badge variant="info">
              2 Tasks
            </Badge>

          </div>

          <div className="space-y-5 mt-8">

            <div className="bg-prima-background rounded-2xl p-5">

              <h3 className="font-semibold text-prima-text">
                Log cleaning
              </h3>

              <p className="text-sm text-prima-muted mt-2">
                Archive logs older than 7 days.
              </p>

              <Button
                variant="outline"
                className="mt-5 w-full"
              >
                Tandai Selesai
              </Button>

            </div>

            <div className="bg-prima-background rounded-2xl p-5">

              <h3 className="font-semibold text-prima-text">
                DB optimization
              </h3>

              <p className="text-sm text-prima-muted mt-2">
                Run VACUUM and reindex.
              </p>

              <Button
                variant="outline"
                className="mt-5 w-full"
              >
                Tandai Selesai
              </Button>

            </div>

          </div>

        </Card>

        {/* MONTHLY */}
        <Card className="border-t-4 border-[#C9A227]">

          <div className="flex items-center justify-between">

            <h2
              className="
                text-2xl
                font-bold
                text-[#C9A227]
              "
            >
              MONTHLY
            </h2>

            <Badge variant="warning">
              3 Tasks
            </Badge>

          </div>

          <div className="space-y-5 mt-8">

            <div className="bg-prima-background rounded-2xl p-5">

              <h3 className="font-semibold text-prima-text">
                Dependency updates
              </h3>

              <p className="text-sm text-prima-muted mt-2">
                Audit and update packages.
              </p>

              <Button
                variant="secondary"
                className="mt-5 w-full"
              >
                Tandai Selesai
              </Button>

            </div>

            <div className="bg-prima-background rounded-2xl p-5">

              <h3 className="font-semibold text-prima-text">
                Storage review
              </h3>

              <p className="text-sm text-prima-muted mt-2">
                Purge obsolete temporary files.
              </p>

              <Button
                variant="secondary"
                className="mt-5 w-full"
              >
                Tandai Selesai
              </Button>

            </div>

          </div>

        </Card>

      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-3 gap-8">

        {/* PROGRESS */}
        <div className="col-span-2">

          <Card>

            <div className="flex items-center justify-between">

              <div>

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-prima-text
                  "
                >
                  Maintenance Progress
                </h2>

                <p className="text-prima-muted mt-2">
                  Real-time completion status.
                </p>

              </div>

              <div className="text-right">

                <h2
                  className="
                    text-5xl
                    font-bold
                    text-prima-green
                  "
                >
                  68%
                </h2>

                <p className="text-prima-muted mt-2">
                  TOTAL HEALTH SCORE
                </p>

              </div>

            </div>

            {/* PROGRESS BARS */}
            <div className="grid grid-cols-3 gap-6 mt-10">

              <div>

                <div className="flex justify-between">

                  <p className="font-medium">
                    Daily Tasks
                  </p>

                  <p>33%</p>

                </div>

                <div
                  className="
                    w-full
                    h-3
                    rounded-full
                    bg-[#E5DED2]
                    mt-3
                  "
                >

                  <div
                    className="
                      h-full
                      w-[33%]
                      rounded-full
                      bg-prima-green
                    "
                  />

                </div>

              </div>

              <div>

                <div className="flex justify-between">

                  <p className="font-medium">
                    Weekly Tasks
                  </p>

                  <p>0%</p>

                </div>

                <div
                  className="
                    w-full
                    h-3
                    rounded-full
                    bg-[#E5DED2]
                    mt-3
                  "
                >

                  <div
                    className="
                      h-full
                      w-[5%]
                      rounded-full
                      bg-[#4B8196]
                    "
                  />

                </div>

              </div>

              <div>

                <div className="flex justify-between">

                  <p className="font-medium">
                    Monthly Tasks
                  </p>

                  <p>0%</p>

                </div>

                <div
                  className="
                    w-full
                    h-3
                    rounded-full
                    bg-[#E5DED2]
                    mt-3
                  "
                >

                  <div
                    className="
                      h-full
                      w-[5%]
                      rounded-full
                      bg-[#C9A227]
                    "
                  />

                </div>

              </div>

            </div>

          </Card>

        </div>

        {/* SECURITY SCORE */}
        <Card className="bg-[#4D7C57] text-white">

          <h2 className="text-2xl font-bold">
            Infrastructure Security Score
          </h2>

          <p className="mt-4 text-white/80">
            Based on latest maintenance logs
            and patch compliance.
          </p>

          <div className="mt-12">

            <h1 className="text-7xl font-bold">
              9.4
            </h1>

            <p className="mt-3 text-white/70">
              /10
            </p>

          </div>

          <div className="space-y-5 mt-12">

            <div className="flex justify-between">

              <p>SSL Status</p>

              <Badge variant="success">
                ACTIVE
              </Badge>

            </div>

            <div className="flex justify-between">

              <p>API Latency</p>

              <Badge variant="info">
                42ms
              </Badge>

            </div>

          </div>

        </Card>

      </div>

    </div>
  )
}

export default MaintenancePage