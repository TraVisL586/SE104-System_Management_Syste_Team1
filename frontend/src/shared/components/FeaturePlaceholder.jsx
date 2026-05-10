function FeaturePlaceholder({ actor, title, description, useCases = [] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
        {actor}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">{title}</h1>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
        {description}
      </p>

      {useCases.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {useCases.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default FeaturePlaceholder;