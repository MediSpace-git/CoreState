/**
 * Pick the most specific nav href that matches the current path.
 * `/product/field-operations` should activate Field operations, not Product.
 */
export function isActiveNavHref(pathname: string, href: string, allHrefs: readonly string[]): boolean {
  if (!pathname || !href) return false;
  const path = pathname.replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";

  if (target === "/" || target === "/prism") return path === target;

  const matches = (candidate: string) => {
    const normalized = candidate.replace(/\/$/, "") || "/";
    return path === normalized || path.startsWith(`${normalized}/`);
  };

  if (!matches(target)) return false;

  const longerMatch = allHrefs.some((candidate) => {
    const normalized = candidate.replace(/\/$/, "") || "/";
    if (normalized === target) return false;
    if (normalized.length <= target.length) return false;
    return matches(normalized);
  });

  return !longerMatch;
}
