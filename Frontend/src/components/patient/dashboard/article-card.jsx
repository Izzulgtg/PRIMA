const ArticleCard = ({
  image,
  category,
  title,
  date,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-prima-card shadow-sm">

      <img
        src={image}
        alt={title}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">

        <span className="rounded-full bg-prima-sand px-3 py-1 text-xs font-medium text-prima-secondary">
          {category}
        </span>

        <h3 className="mt-3 text-base font-semibold text-prima-text">
          {title}
        </h3>

        <p className="mt-2 text-sm text-prima-secondary">
          {date}
        </p>

      </div>
    </div>
  )
}

export default ArticleCard