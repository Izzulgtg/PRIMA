  import { useState, useEffect } from "react"
  import Card from "../../components/ui/card"
  import Badge from "../../components/ui/badge"
  import Button from "../../components/ui/button"

  function MaintenancePage() {

    const resetMaintenance = () => {

  localStorage.removeItem(
    "maintenanceTasks"
  )

  window.location.reload()
}

const defaultTasks = [
  {
    id: 1,
    title: "Server status check",
    type: "daily",
    completed: false,
  },
  {
    id: 2,
    title: "Backup verification",
    type: "daily",
    completed: false,
  },
  {
    id: 3,
    title: "Log cleaning",
    type: "weekly",
    completed: false,
  },
  {
    id: 4,
    title: "DB optimization",
    type: "weekly",
    completed: false,
  },
  {
    id: 5,
    title: "Dependency updates",
    type: "monthly",
    completed: false,
  },
  {
    id: 6,
    title: "Storage review",
    type: "monthly",
    completed: false,
  },
]

const [tasks, setTasks] = useState([])

useEffect(() => {
  const savedTasks = JSON.parse(
    localStorage.getItem("maintenanceTasks")
  )

  setTasks(savedTasks || defaultTasks)
}, [])

const completeTask = (id) => {

  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          completed: true,
        }
      : task
  )

  setTasks(updatedTasks)

  localStorage.setItem(
    "maintenanceTasks",
    JSON.stringify(updatedTasks)
  )
}

const totalTasks = tasks.length

const completedTasks =
  tasks.filter(task => task.completed).length

const healthScore =
  totalTasks === 0
    ? 0
    : Math.round(
        (completedTasks / totalTasks) * 100
      )

const dailyProgress = Math.round(
  (
    tasks.filter(
      task =>
        task.type === "daily" &&
        task.completed
    ).length / 2
  ) * 100
)

const weeklyProgress = Math.round(
  (
    tasks.filter(
      task =>
        task.type === "weekly" &&
        task.completed
    ).length / 2
  ) * 100
)

const monthlyProgress = Math.round(
  (
    tasks.filter(
      task =>
        task.type === "monthly" &&
        task.completed
    ).length / 2
  ) * 100
)

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

          <Button
            variant="primary"
            onClick={resetMaintenance}
          >
            Reset Maintenance
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
  {tasks.filter(t => t.type === "daily").length} Tasks
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
                onClick={() => completeTask(1)}
              >
                {
                  tasks.find(t => t.id === 1)?.completed
                    ? "✓ Selesai"
                    : "Tandai Selesai"
                }
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
                onClick={() => completeTask(2)}
              >
                {
                  tasks.find(t => t.id === 2)?.completed
                    ? "✓ Selesai"
                    : "Tandai Selesai"
                }
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
                {tasks.filter(t => t.type === "weekly").length} Tasks
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
                onClick={() => completeTask(3)}
              >
                {
                  tasks.find(t => t.id === 3)?.completed
                    ? "✓ Selesai"
                    : "Tandai Selesai"
                }
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
                onClick={() => completeTask(4)}
              >
                {
                  tasks.find(t => t.id === 4)?.completed
                    ? "✓ Selesai"
                    : "Tandai Selesai"
                }
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
                {tasks.filter(t => t.type === "monthly").length} Tasks
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
                onClick={() => completeTask(5)}
              >
                {
                  tasks.find(t => t.id === 5)?.completed
                    ? "✓ Selesai"
                    : "Tandai Selesai"
                }
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
                onClick={() => completeTask(6)}
              >
                {
                  tasks.find(t => t.id === 6)?.completed
                    ? "✓ Selesai"
                    : "Tandai Selesai"
                }
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
                    {healthScore}%
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

                    <p>{dailyProgress}%</p>

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
                      rounded-full
                      bg-prima-green
                    "
                    style={{
                      width: `${dailyProgress}%`
                    }}
                  />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between">

                    <p className="font-medium">
                      Weekly Tasks
                    </p>

                    <p>{weeklyProgress}%</p>

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
                      rounded-full
                      bg-[#4B8196]
                    "
                    style={{
                      width: `${weeklyProgress}%`
                    }}
                  />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between">

                    <p className="font-medium">
                      Monthly Tasks
                    </p>

                    <p>{monthlyProgress}%</p>

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
                      rounded-full
                      bg-[#C9A227]
                    "
                    style={{
                      width: `${monthlyProgress}%`
                    }}
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