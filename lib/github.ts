export type ContributionDay = {
  date: string;
  /** GitHub's 0–4 intensity bucket */
  level: number;
  count: number;
  /** 0 = Sunday … 6 = Saturday */
  row: number;
  /** week index, oldest first */
  col: number;
};

export type ContributionCalendar = {
  days: ContributionDay[];
  total: number;
  weeks: number;
};

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

/**
 * Reads the public contribution calendar GitHub renders on profile pages.
 * It's not an official API, so any failure (network, markup change) returns
 * null and the section simply doesn't render. Refreshed at most once a day.
 */
export async function getContributions(user: string): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(`https://github.com/users/${encodeURIComponent(user)}/contributions`, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Tooltips carry the exact counts: "3 contributions on April 5th." / "No contributions on …"
    const counts = new Map<string, number>();
    for (const m of html.matchAll(/<tool-tip[^>]*\bfor="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)</g)) {
      const n = m[2].match(/^(\d[\d,]*) contribution/);
      counts.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0);
    }

    const days: ContributionDay[] = [];
    for (const [tag] of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
      const id = attr(tag, "id");
      const date = attr(tag, "data-date");
      const level = Number(attr(tag, "data-level"));
      const pos = id?.match(/-(\d+)-(\d+)$/);
      if (!id || !date || !pos || Number.isNaN(level)) continue;
      days.push({ date, level, count: counts.get(id) ?? 0, row: Number(pos[1]), col: Number(pos[2]) });
    }

    if (days.length === 0) return null;
    return {
      days,
      total: days.reduce((sum, d) => sum + d.count, 0),
      weeks: Math.max(...days.map((d) => d.col)) + 1,
    };
  } catch {
    return null;
  }
}
