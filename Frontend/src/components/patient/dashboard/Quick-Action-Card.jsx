function QuickActionCard({ title, description }) {
  return (
    <button className="bg-prima-background rounded-2xl p-5 text-left hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-transparent hover:border-prima-green/20">
      <div className="space-y-2">
        <h3 className="font-semibold text-prima-text text-lg">
          {title}
        </h3>

        <p className="text-prima-secondary text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
}

export default QuickActionCard;