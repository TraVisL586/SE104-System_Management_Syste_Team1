import { Link } from 'react-router-dom';

function FeatureLandingLayout({ title, subtitle, description, actions = [], highlights = [] }) {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
          Feature workspace
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 text-lg font-medium text-slate-600">{subtitle}</p>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">
          {description}
        </p>

        {actions.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {actions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className={[
                  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition',
                  action.variant === 'secondary'
                    ? 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700',
                ].join(' ')}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      {highlights.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {item.badge}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}

export default FeatureLandingLayout;