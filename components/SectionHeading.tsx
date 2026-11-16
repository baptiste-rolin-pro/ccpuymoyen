import type { ReactNode } from "react";

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  dark?: boolean;
  id?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ index, eyebrow, title, intro, action, dark, id, as: Tag = "h2" }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end" data-reveal>
      <div className="md:col-span-8">
        <p className={`eyebrow ${dark ? "text-white/70" : "text-mute"}`}>
          {index && <span className={dark ? "text-white" : "text-ink"}>{index}</span>}
          {eyebrow}
        </p>
        <Tag id={id} className="display mt-4 text-[clamp(2.6rem,6.5vw,5.25rem)]">
          {title}
        </Tag>
        {intro && <div className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-white/75" : "text-mute"}`}>{intro}</div>}
      </div>
      {action && <div className="md:col-span-4 md:flex md:justify-end">{action}</div>}
    </div>
  );
}
