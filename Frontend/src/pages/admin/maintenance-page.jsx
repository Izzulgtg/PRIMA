import Card from "../../components/ui/card"
import Badge from "../../components/ui/badge"
import Table from "../../components/ui/table"
import Button from "../../components/ui/button"

function MaintenancePage() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-prima-text">
        Maintenance System
      </h1>

      <p className="text-prima-muted mt-2">
        Monitoring dan pengelolaan maintenance sistem PRIMA.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-10">

  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-prima-muted text-sm">
          Active Maintenance
        </p>

        <h2 className="text-3xl font-bold text-prima-text mt-2">
          2
        </h2>

      </div>

      <Badge variant="warning">
        Running
      </Badge>

    </div>

  </Card>

  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-prima-muted text-sm">
          Scheduled
        </p>

        <h2 className="text-3xl font-bold text-prima-text mt-2">
          5
        </h2>

      </div>

      <Badge variant="info">
        Upcoming
      </Badge>

    </div>

  </Card>

  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-prima-muted text-sm">
          Completed
        </p>

        <h2 className="text-3xl font-bold text-prima-text mt-2">
          18
        </h2>

      </div>

      <Badge variant="success">
        Done
      </Badge>

    </div>

  </Card>

</div>

<div className="mt-10">

  <Card>

    <div className="flex items-center justify-between">

      <h2 className="text-xl font-semibold text-prima-text">
        Maintenance History
      </h2>

      <Button variant="primary">
        Add Maintenance
      </Button>

    </div>

    <div className="mt-8">

      <Table>

        <thead>

          <tr className="border-b border-prima-sand">

            <th className="text-left py-4 text-prima-muted">
              System
            </th>

            <th className="text-left py-4 text-prima-muted">
              Date
            </th>

            <th className="text-left py-4 text-prima-muted">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-b border-prima-sand">

            <td className="py-5 text-prima-text">
              Database Backup
            </td>

            <td className="py-5 text-prima-text">
              20 Mei 2026
            </td>

            <td className="py-5">

              <Badge variant="success">
                Completed
              </Badge>

            </td>

          </tr>

          <tr className="border-b border-prima-sand">

            <td className="py-5 text-prima-text">
              API Optimization
            </td>

            <td className="py-5 text-prima-text">
              22 Mei 2026
            </td>

            <td className="py-5">

              <Badge variant="warning">
                Running
              </Badge>

            </td>

          </tr>

          <tr>

            <td className="py-5 text-prima-text">
              Security Patch
            </td>

            <td className="py-5 text-prima-text">
              25 Mei 2026
            </td>

            <td className="py-5">

              <Badge variant="info">
                Scheduled
              </Badge>

            </td>

          </tr>

        </tbody>

      </Table>

    </div>

  </Card>

</div>

    </div>

    
  )
}

export default MaintenancePage
