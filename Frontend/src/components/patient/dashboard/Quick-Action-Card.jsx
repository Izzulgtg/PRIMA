import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function QuickActionCard({
  title,
  description,
  icon: Icon,
  path,
}) {
  return (
    <Link
      to={path}
      aria-label={title}
      className="
        group
        bg-prima-background
        border border-[#F1ECE4]
        rounded-[24px]
        p-5
        min-h-[170px]
        transition-all
        duration-300
        hover:shadow-md
        hover:-translate-y-1
      "
    >
      <div className="flex items-start justify-between">

        <div>

          {Icon && (
            <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">
              <Icon size={22} />
            </div>
          )}

          <h3 className="mt-4 font-semibold text-prima-text">
            {title}
          </h3>

          <p className="mt-1 text-sm text-prima-secondary">
            {description}
          </p>

        </div>

        <ChevronRight
          size={18}
          className="
            text-prima-secondary
            transition-transform
            group-hover:translate-x-1
          "
        />

      </div>
    </Link>
  );
}

export default QuickActionCard;