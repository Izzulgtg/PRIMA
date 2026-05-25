import { Link } from "react-router-dom";

function PatientQueueCard({ patient }) {
    return (
        <article className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-prima-black">
                {patient.name}
            </h3>
            <p className="mt-1 text-sm text-prima-gray">
                Jadwal: {patient.time}
            </p>
            <p className="mt-3 text-sm text-prima-black">
                {patient.complaint}
            </p>
            <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-prima-sand px-3 py-1 text-xs text-prima-teal">
                    {patient.status}
                </span>
                <Link
                    to={`/doctor/examination/${patient.id}`}
                    className="rounded-xl bg-prima-green px-4 py-2 text-sm font-medium text-white"
                >
                    Mulai Periksa
                </Link>
            </div>
        </article>
    );
}

export default PatientQueueCard;