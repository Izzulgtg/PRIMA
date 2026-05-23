import Card from "../../components/ui/card"
import Badge from "../../components/ui/badge"
import Table from "../../components/ui/table"
import Button from "../../components/ui/button"

function SupportPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-prima-text">
        System Support
      </h1>

      <p className="text-prima-muted mt-2">
        Monitoring error sistem dan penanganan support PRIMA.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-10">

  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-prima-muted text-sm">
          Open Tickets
        </p>

        <h2 className="text-3xl font-bold text-prima-text mt-2">
          12
        </h2>

      </div>

      <Badge variant="warning">
        Pending
      </Badge>

    </div>

  </Card>

  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-prima-muted text-sm">
          Resolved
        </p>

        <h2 className="text-3xl font-bold text-prima-text mt-2">
          38
        </h2>

      </div>

      <Badge variant="success">
        Solved
      </Badge>

    </div>

  </Card>

  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-prima-muted text-sm">
          Critical Errors
        </p>

        <h2 className="text-3xl font-bold text-prima-text mt-2">
          2
        </h2>

      </div>

      <Badge variant="danger">
        Critical
      </Badge>

    </div>

  </Card>

</div>

<div className="mt-10">

  <Card>

    <div className="flex items-center justify-between">

      <h2 className="text-xl font-semibold text-prima-text">
        Support Tickets
      </h2>

      <Button variant="primary">
        Create Ticket
      </Button>

    </div>

    <div className="mt-8">

      <Table>

        <thead>

          <tr className="border-b border-prima-sand">

            <th className="text-left py-4 text-prima-muted">
              Issue
            </th>

            <th className="text-left py-4 text-prima-muted">
              User
            </th>

            <th className="text-left py-4 text-prima-muted">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-b border-prima-sand">

            <td className="py-5 text-prima-text">
              Login Error
            </td>

            <td className="py-5 text-prima-text">
              Izzul
            </td>

            <td className="py-5">

              <Badge variant="warning">
                Pending
              </Badge>

            </td>

          </tr>

          <tr className="border-b border-prima-sand">

            <td className="py-5 text-prima-text">
              Database Timeout
            </td>

            <td className="py-5 text-prima-text">
              Izzul (2)
            </td>

            <td className="py-5">

              <Badge variant="danger">
                Critical
              </Badge>

            </td>

          </tr>

          <tr>

            <td className="py-5 text-prima-text">
              Reset Password
            </td>

            <td className="py-5 text-prima-text">
              Izzul (3)
            </td>

            <td className="py-5">

              <Badge variant="success">
                Resolved
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


export default SupportPage